'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUser, User } from '@/services/hackerNewsApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatRelativeTime, formatDate } from '@/utils/helpers';

export default function UserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await getUser(params.id);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return (
      <div className="py-10 text-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          {error || 'User not found'}
        </p>
        <Link href="/" className="text-hn-orange hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const { id, created, karma, about, submitted } = user;
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
} 