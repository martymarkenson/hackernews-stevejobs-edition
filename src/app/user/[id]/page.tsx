import { Metadata } from 'next';
import Link from 'next/link';
import { getUser } from '@/services/hackerNewsApi';
import { formatRelativeTime, formatDate } from '@/utils/helpers';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  try {
    const { id } = await params;
    const user = await getUser(id);
    return {
      title: `${user.id} | Hacker News`,
      description: `User profile for ${user.id} on Hacker News`
    };
  } catch {
    return {
      title: 'User | Hacker News',
      description: 'User profile on Hacker News'
    };
  }
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getUser(id);

    const { created, karma, about, submitted } = user;
    const createdDate = formatDate(created);
    const createdRelative = formatRelativeTime(created);

    return (
      <div className="user-profile">
        <h1 className="user-name">{id}</h1>
        
        <div className="user-stats">
          <div className="stat">
            <span className="stat-label">Joined:</span>
            <span className="stat-value" title={createdDate}>{createdRelative}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Karma:</span>
            <span className="stat-value">{karma}</span>
          </div>
          {submitted && (
            <div className="stat">
              <span className="stat-label">Posts:</span>
              <span className="stat-value">{submitted.length}</span>
            </div>
          )}
        </div>

        {about && (
          <div className="user-about">
            <h2>About</h2>
            <div 
              className="user-about-content"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          </div>
        )}

        <div className="user-actions">
          <Link href={`/submitted/${id}`} className="user-action-link">
            View Submissions
          </Link>
          <Link href={`/threads/${id}`} className="user-action-link">
            View Comments
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          Failed to load user data. Please try again later.
        </p>
        <Link href="/" className="text-hn-orange hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }
} 