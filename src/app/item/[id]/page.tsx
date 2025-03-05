import { Metadata } from 'next';
import Link from 'next/link';
import { getItem, getItems, Story, Comment as CommentType } from '@/services/hackerNewsApi';
import { formatRelativeTime, getHostname } from '@/utils/helpers';
import Comment from '@/components/Comment';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  try {
    const { id } = await params;
    const storyId = parseInt(id);
    const story = await getItem<Story>(storyId);
    return {
      title: `${story.title} | Hacker News`,
      description: `${story.title} - Discussion on Hacker News`
    };
  } catch {
    return {
      title: 'Story | Hacker News',
      description: 'Story discussion on Hacker News'
    };
  }
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const storyId = parseInt(id);
    const story = await getItem<Story>(storyId);
    
    let comments: CommentType[] = [];
    if (story.kids && story.kids.length > 0) {
      comments = await getItems<CommentType>(story.kids);
      comments = comments.filter(comment => comment !== null);
    }

    const { title, url, by, score, time, descendants, text } = story;
    const hostname = getHostname(url);
    const relativeTime = formatRelativeTime(time);

    return (
      <div>
        <div className="post">
          <div className="upvote">
            <div className="upvote-arrow"></div>
            <div className="upvote-count">{score}</div>
          </div>
          <div className="post-content">
            <div className="post-title">
              <Link 
                href={url || `#`}
                target={url ? "_blank" : undefined}
                rel={url ? "noopener noreferrer" : undefined}
              >
                {title}
              </Link>
              {hostname && (
                <span className="text-xs text-apple-meta ml-2">
                  ({hostname})
                </span>
              )}
            </div>
            <div className="post-meta">
              <span>by <Link href={`/user/${by}`}>{by}</Link></span>
              <span>{relativeTime}</span>
              <span>{descendants} comments</span>
            </div>

            {text && (
              <div 
                className="mt-4 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          </div>
        </div>

        <div className="mt-6 mb-4">
          <h2 className="text-xl font-semibold">Comments</h2>
        </div>
        
        {comments.length === 0 ? (
          <p className="text-apple-meta">No comments yet.</p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <Comment 
                key={comment.id} 
                comment={comment} 
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch story:', error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          Failed to load the story. Please try again later.
        </p>
        <Link href="/" className="text-hn-orange hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }
} 