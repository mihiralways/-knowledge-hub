'use client';

import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import StudyCard from '@/components/StudyCard';

interface StudyMaterial {
  id: string;
  title: string;
  type: string;
  subject: string;
  url?: string;
  notes: string;
}

export default function StudyPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'Textbook',
    subject: '',
    url: '',
    notes: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('studyMaterials');
    if (saved) setMaterials(JSON.parse(saved));
  }, []);

  const saveMaterials = (updatedMaterials: StudyMaterial[]) => {
    localStorage.setItem('studyMaterials', JSON.stringify(updatedMaterials));
    setMaterials(updatedMaterials);
  };

  const handleAddMaterial = () => {
    if (!newMaterial.title.trim() || !newMaterial.subject.trim()) return;

    const material: StudyMaterial = {
      id: Date.now().toString(),
      ...newMaterial,
    };

    saveMaterials([material, ...materials]);
    setNewMaterial({
      title: '',
      type: 'Textbook',
      subject: '',
      url: '',
      notes: '',
    });
    setIsAdding(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Study Materials</h1>
          <p className="text-gray-400">Organize your learning resources</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'Add Material'}
        </button>
      </div>

      {/* Add Material Form */}
      {isAdding && (
        <div className="bg-gray-800 border border-green-500 rounded-xl p-6 mb-6 shadow-lg shadow-green-500/10">
          <input
            type="text"
            placeholder="Material title..."
            value={newMaterial.title}
            onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Type</label>
              <select
                value={newMaterial.type}
                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Textbook</option>
                <option>Research Paper</option>
                <option>Video Course</option>
                <option>Article</option>
                <option>Documentation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Subject</label>
              <input
                type="text"
                placeholder="e.g., Computer Science"
                value={newMaterial.subject}
                onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <input
            type="url"
            placeholder="URL (optional)..."
            value={newMaterial.url}
            onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Notes (optional)..."
            value={newMaterial.notes}
            onChange={(e) => setNewMaterial({ ...newMaterial, notes: e.target.value })}
            rows={4}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleAddMaterial}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Save size={20} />
            Save Material
          </button>
        </div>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => (
          <StudyCard key={material.id} material={material} />
        ))}
      </div>

      {materials.length === 0 && !isAdding && (
        <div className="bg-gray-800 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-white mb-2">No study materials yet</h3>
          <p className="text-gray-400 mb-6">Start organizing your learning resources</p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Add Your First Material
          </button>
        </div>
      )}
    </div>
  );
}
