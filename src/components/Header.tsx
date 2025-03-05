'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  const isActive = (path: string) => {
    return pathname === path ? 'font-semibold' : '';
  };

  return (
    <header>
      <nav>
        <div className="left-section">
          <Link href="/" className="logo-link">
            <div 
              className="logo"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              style={{ opacity: isLogoHovered ? 0.9 : 1 }}
            >
              <div className="logo-icon">Y</div>
              <span>Hacker News</span>
            </div>
          </Link>
          <div className="nav-links">
            <Link 
              href="/" 
              className={isActive('/')}
            >
              Top
            </Link>
            <Link 
              href="/new" 
              className={isActive('/new')}
            >
              New
            </Link>
            <Link 
              href="/ask" 
              className={isActive('/ask')}
            >
              Ask
            </Link>
            <Link 
              href="/show" 
              className={isActive('/show')}
            >
              Show
            </Link>
            <Link 
              href="/jobs" 
              className={isActive('/jobs')}
            >
              Jobs
            </Link>
            <Link 
              href="https://www.ycombinator.com/apply/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply to YC
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 