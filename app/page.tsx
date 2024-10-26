import NotesList from '@/components/NotesList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Markdown Notes
        </h1>
        <Link href="/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </Link>
      </div>
      <NotesList />
    </main>
  );
}