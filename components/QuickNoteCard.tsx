'use client';

import { Clock } from 'lucide-react';

interface QuickNoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  };
}

export default function QuickNoteCard({ note }: QuickNoteCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <h3 className="font-semibold text-white mb-2 line-clamp-1">{note.title}</h3>
      <p className="text-gray-400 text-sm mb-3 line-clamp-3">{note.content}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Clock size={14} />
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
