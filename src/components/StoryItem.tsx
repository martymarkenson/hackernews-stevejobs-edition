'use client';

import Link from 'next/link';
import { Story } from '@/services/hackerNewsApi';
import { getHostname, formatRelativeTime } from '@/utils/helpers';

interface StoryItemProps {
  story: Story;
  rank?: number;
}

export default function StoryItem({ story, rank }: StoryItemProps) {
  const { id, title, url, score, by, time, descendants } = story;
  const hostname = getHostname(url);
  
  // Ensure time is a number and convert if it's a string
  const timeValue = typeof time === 'number' ? time : parseInt(time as unknown as string, 10);
  const relativeTime = formatRelativeTime(timeValue);
  
  // Debug info
  console.log('Story time:', time, 'Type:', typeof time);
  console.log('Formatted time:', relativeTime);
  
  return (
    <div className="post">
      {rank && <div className="rank">{rank}.</div>}
      <div className="upvote">
        <div className="upvote-arrow"></div>
        <div className="upvote-count">{score}</div>
      </div>
      <div className="post-content">
        <div className="post-title">
          <Link 
            href={url || `/item/${id}`}
            target={url ? "_blank" : undefined}
            rel={url ? "noopener noreferrer" : undefined}
          >
            {title}
          </Link>
          {hostname && (
            <span className="post-url">
              ({hostname})
            </span>
          )}
        </div>
        <div className="post-meta">
          <span>by <Link href={`/user/${by}`}>{by}</Link></span>
          <span>{relativeTime}</span>
          <Link href={`/item/${id}`}>{descendants} comments</Link>
        </div>
      </div>
    </div>
  );
} 