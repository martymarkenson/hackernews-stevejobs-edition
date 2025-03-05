import { Metadata } from 'next';
import { getNewStories, getItems, Story } from '@/services/hackerNewsApi';
import StoryItem from '@/components/StoryItem';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'New Stories | Hacker News',
  description: 'Latest stories from Hacker News',
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function NewStoriesPage() {
  try {
    const storyIds = await getNewStories();
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
    console.error('Error fetching new stories:', error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          Error loading stories. Please try again later.
        </p>
      </div>
    );
  }
} 