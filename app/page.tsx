'use client';

// import { Input } from '@/components/ui/input';
import { HomePage } from './home-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <HomePage />
      </main>
    </QueryClientProvider>
  );
}
