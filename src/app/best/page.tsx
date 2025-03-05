import { Metadata } from 'next';
import { getBestStories, getItems, Story } from '@/services/hackerNewsApi';
import StoryItem from '@/components/StoryItem';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Best Stories | Hacker News Clone',
  description: 'Best stories from Hacker News',
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function BestStoriesPage() {
  try {
    const storyIds = await getBestStories();
    const stories = await getItems<Story>(storyIds, 30);
    
    return (
      <div className="posts">
        <div className="space-y-0">
          {stories.map((story, index) => (
            <StoryItem key={story.id} story={story} rank={index + 1} />
          ))}
        </div>
        
        <Pagination currentPage={1} totalPages={5} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching best stories:', error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          Error loading stories. Please try again later.
        </p>
      </div>
    );
  }
} 