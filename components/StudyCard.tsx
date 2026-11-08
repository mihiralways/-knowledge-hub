'use client';

import { BookOpen, ExternalLink } from 'lucide-react';

interface StudyCardProps {
  material: {
    id: string;
    title: string;
    type: string;
    subject: string;
    url?: string;
    notes: string;
  };
}

export default function StudyCard({ material }: StudyCardProps) {
  const typeColors = {
    'Textbook': 'bg-blue-500',
    'Research Paper': 'bg-purple-500',
    'Video Course': 'bg-red-500',
    'Article': 'bg-green-500',
    'Documentation': 'bg-yellow-500',
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="text-green-400" size={20} />
          <h3 className="font-semibold text-white line-clamp-1">{material.title}</h3>
        </div>
        {material.url && (
          <a
            href={material.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs text-white ${typeColors[material.type as keyof typeof typeColors] || 'bg-gray-500'}`}>
          {material.type}
        </span>
        <span className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
          {material.subject}
        </span>
      </div>

      {material.notes && (
        <p className="text-gray-400 text-sm line-clamp-2">{material.notes}</p>
      )}
    </div>
  );
}
