import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }[size];

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClass} animate-spin rounded-full border-2 border-hn-orange border-t-transparent`}></div>
    </div>
  );
} 