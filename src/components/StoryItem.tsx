'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Story } from '@/services/hackerNewsApi';
import { getHostname, formatRelativeTime } from '@/utils/helpers';

interface StoryItemProps {
  story: Story;
  rank?: number;
}

export default function StoryItem({ story, rank }: StoryItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { id, title, url, score, by, time, descendants } = story;
  const hostname = url ? getHostname(url) : null;
  const timeAgo = formatDistanceToNow(new Date(time * 1000), { addSuffix: true });

  return (
    <div className="post">
      <div className="upvote">
        <button 
          className="upvote-arrow"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-label="Upvote"
          role="button"
          tabIndex={0}
        >
          {/* Removed the arrow character */}
        </button>
        <div className="upvote-count">{score}</div>
      </div>
      <div className="post-content">
        <h2 className="post-title">
          {url ? (
            <Link 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Link>
          ) : (
            <Link href={`/item/${id}`}>{title}</Link>
          )}
          {hostname && (
            <span className="post-url"> ({hostname})</span>
          )}
        </h2>
        <div className="post-meta">
          <span>by </span>
          <Link href={`/user/${by}`}>{by}</Link>
          <span> </span>
          <Link href={`/item/${id}`}>{timeAgo}</Link>
          {descendants !== undefined && (
            <>
              <span> | </span>
              <Link href={`/item/${id}`}>
                {descendants} {descendants === 1 ? 'comment' : 'comments'}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 