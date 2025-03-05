'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getItem, getItems, Story, Comment as CommentType } from '@/services/hackerNewsApi';
import { formatRelativeTime, getHostname } from '@/utils/helpers';
import Comment from '@/components/Comment';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ItemPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storyId = parseInt(params.id);
        const storyData = await getItem<Story>(storyId);
        setStory(storyData);
        
        if (storyData.kids && storyData.kids.length > 0) {
          const commentsData = await getItems<CommentType>(storyData.kids);
          setComments(commentsData.filter(comment => comment !== null));
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to load the story. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const loadReplies = async (kidIds: number[]): Promise<CommentType[]> => {
    try {
      const replies = await getItems<CommentType>(kidIds);
      return replies.filter(reply => reply !== null);
    } catch (error) {
      console.error('Error loading replies:', error);
      return [];
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          {error || 'Story not found'}
        </p>
        <Link href="/" className="text-hn-orange hover:underline">
          Back to Home
        </Link>
      </div>
    );
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
              loadReplies={loadReplies}
            />
          ))}
        </div>
      )}
    </div>
  );
} 