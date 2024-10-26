'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotesList() {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes.sort((a: any, b: any) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
  }, []);

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No notes yet</h2>
        <p className="text-muted-foreground">
          Create your first note to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link href={`/note/${note.id}`} key={note.id}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="line-clamp-2">{note.title}</CardTitle>
              <CardDescription>
                Last updated: {new Date(note.updatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}