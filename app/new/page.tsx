'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { toast } = useToast();

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
    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    toast({
      title: 'Success',
      description: 'Note saved successfully',
    });
    
    router.push('/');
    router.refresh();
  };

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
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Note
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