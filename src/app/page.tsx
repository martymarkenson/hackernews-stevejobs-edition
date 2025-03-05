import { Metadata } from 'next';
import { getTopStories, getItems, Story } from '@/services/hackerNewsApi';
import StoryItem from '@/components/StoryItem';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Top Stories | Hacker News',
  description: 'Top stories from Hacker News',
};

// Revalidate the page every 5 minutes
export const revalidate = 300;

export default async function Home() {
  try {
    const storyIds = await getTopStories();
    const stories = await getItems<Story>(storyIds.slice(0, 30));

    return (
      <main>
        <div className="posts">
          {stories.map((story, index) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </div>
        <Pagination currentPage={2} totalPages={5} />
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch top stories:', error);
    return (
      <main>
        <p>Failed to load stories. Please try again later.</p>
      </main>
    );
  }
}
