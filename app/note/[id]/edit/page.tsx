'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditNote({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes.find((n: any) => n.id === parseInt(params.id));
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleSave = () => {
    if (!title || !content) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = notes.map((note: any) => {
      if (note.id === parseInt(params.id)) {
        return {
          ...note,
          title,
          content,
          updatedAt: new Date().toISOString(),
        };
      }
      return note;
    });

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast({
      title: 'Success',
      description: 'Note updated successfully',
    });
    router.push(`/note/${params.id}`);
    router.refresh();
  };

  return (
    <main className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/note/${params.id}`}>
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
        
        <div className="space-y-4">
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold"
          />
          <Textarea
            placeholder="Write your note in markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] font-mono"
          />
        </div>
      </div>
    </main>
  );
}