'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function NotePage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const foundNote = notes.find((n: any) => n.id === parseInt(params.id));
    if (foundNote) {
      setNote(foundNote);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleDelete = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = notes.filter((n: any) => n.id !== parseInt(params.id));
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast({
      title: 'Success',
      description: 'Note deleted successfully',
    });
    router.push('/');
    router.refresh();
  };

  if (!note) return null;

  return (
    <main className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="space-x-2">
            <Link href={`/note/${params.id}/edit`}>
              <Button variant="outline">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
          <div className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date(note.updatedAt).toLocaleDateString()}
          </div>
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}