'use client';

import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import QuickNoteCard from '@/components/QuickNoteCard';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    const saved = localStorage.getItem('quickNotes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('quickNotes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
    };

    saveNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quick Notes</h1>
          <p className="text-gray-400">Capture your ideas instantly</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'New Note'}
        </button>
      </div>

      {/* Add Note Form */}
      {isAdding && (
        <div className="bg-gray-800 border border-blue-500 rounded-xl p-6 mb-6 shadow-lg shadow-blue-500/10">
          <input
            type="text"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <textarea
            placeholder="Write your note here..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            rows={6}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddNote}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save size={20} />
            Save Note
          </button>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <QuickNoteCard key={note.id} note={note} />
        ))}
      </div>

      {notes.length === 0 && !isAdding && (
        <div className="bg-gray-800 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-white mb-2">No notes yet</h3>
          <p className="text-gray-400 mb-6">Start capturing your ideas and thoughts</p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Create Your First Note
          </button>
        </div>
      )}
    </div>
  );
}
