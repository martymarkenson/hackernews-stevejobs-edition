'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Comment as CommentType } from '@/services/hackerNewsApi';
import { formatRelativeTime } from '@/utils/helpers';

interface CommentProps {
  comment: CommentType;
  loadReplies: (kidIds: number[]) => Promise<CommentType[]>;
}

export default function Comment({ comment, loadReplies }: CommentProps) {
  const [replies, setReplies] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  if (!comment || comment.dead || comment.deleted) {
    return null;
  }

  const { by, time, text, kids } = comment;
  const hasReplies = kids && kids.length > 0;
  const relativeTime = formatRelativeTime(time);

  const handleToggleReplies = async () => {
    if (hasReplies && !repliesLoaded) {
      setLoading(true);
      try {
        const loadedReplies = await loadReplies(kids);
        setReplies(loadedReplies);
        setRepliesLoaded(true);
      } catch (error) {
        console.error('Error loading replies:', error);
      } finally {
        setLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <button 
          onClick={handleToggleReplies} 
          className="comment-toggle"
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
          aria-label={expanded ? "Collapse comment" : "Expand comment"}
        >
          {expanded ? '[-]' : '[+]'}
        </button>
        <Link href={`/user/${by}`} className="comment-author">{by}</Link>
        <span className="comment-time">{relativeTime}</span>
      </div>
      
      {expanded && (
        <>
          <div 
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: text || '' }}
          />
          
          {hasReplies && repliesLoaded && (
            <div className="comment-replies">
              {replies.map((reply) => (
                <Comment 
                  key={reply.id} 
                  comment={reply} 
                  loadReplies={loadReplies}
                />
              ))}
            </div>
          )}
          
          {loading && (
            <div className="comment-loading">Loading replies...</div>
          )}
          
          {hasReplies && !repliesLoaded && !loading && (
            <button 
              onClick={handleToggleReplies}
              className="comment-load-replies"
            >
              {kids.length} {kids.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
        </>
      )}
    </div>
  );
} 