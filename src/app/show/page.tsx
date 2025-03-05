import { Metadata } from 'next';
import { getShowStories, getItems, Story } from '@/services/hackerNewsApi';
import StoryItem from '@/components/StoryItem';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Show HN | Hacker News',
  description: 'Show HN stories from Hacker News',
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function ShowStoriesPage() {
  try {
    const storyIds = await getShowStories();
    const stories = await getItems<Story>(storyIds.slice(0, 30));

    return (
      <main>
        <div className="posts">
          {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </div>
        <Pagination currentPage={1} totalPages={5} />
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch show stories:', error);
    return (
      <main>
        <p>Failed to load stories. Please try again later.</p>
      </main>
    );
  }
} 