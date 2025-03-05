import { Metadata } from 'next';
import { getJobStories, getItems, Story } from '@/services/hackerNewsApi';
import StoryItem from '@/components/StoryItem';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Jobs | Hacker News',
  description: 'Job listings from Hacker News',
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function JobsPage() {
  try {
    const storyIds = await getJobStories();
    const stories = await getItems<Story>(storyIds, 30);
    
    return (
      <div className="posts">
        {stories.map((story, index) => (
          <StoryItem key={story.id} story={story} rank={index + 1} />
        ))}
        
        <Pagination currentPage={1} totalPages={5} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching job stories:', error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          Error loading jobs. Please try again later.
        </p>
      </div>
    );
  }
} 