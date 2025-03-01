export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const username = searchParams.username || 'Anonymous';
  const score = searchParams.score;
  
  if (!score) {
    return {}; // Use default metadata from layout
  }

  const title = `${username}'s Globetrotter Challenge`;
  const description = `${username} has challenged you to beat their score of ${score}! Can you become the ultimate Globetrotter?`;

  const ogImageUrl = new URL('/api/og', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
  
  ogImageUrl.searchParams.set('username', username.toString());
  const [correct, total] = score.toString().split('/');
  ogImageUrl.searchParams.set('correct', correct);
  ogImageUrl.searchParams.set('total', total);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: ogImageUrl.toString(),
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl.toString()],
    }
  };
}

import { GlobetrotterGame } from './game';
export default function Page() {
  return <GlobetrotterGame />;
} 