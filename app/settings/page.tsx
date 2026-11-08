'use client';

import { Download, Upload, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const handleExportData = () => {
    const data = {
      quickNotes: JSON.parse(localStorage.getItem('quickNotes') || '[]'),
      projects: JSON.parse(localStorage.getItem('projects') || '[]'),
      studyMaterials: JSON.parse(localStorage.getItem('studyMaterials') || '[]'),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowledge-hub-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.quickNotes) localStorage.setItem('quickNotes', JSON.stringify(data.quickNotes));
        if (data.projects) localStorage.setItem('projects', JSON.stringify(data.projects));
        if (data.studyMaterials) localStorage.setItem('studyMaterials', JSON.stringify(data.studyMaterials));

        alert('Data imported successfully! Refresh the page to see changes.');
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('quickNotes');
      localStorage.removeItem('projects');
      localStorage.removeItem('studyMaterials');
      alert('All data cleared. Refresh the page.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your data and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Data Management */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Data Management</h2>

          <div className="space-y-4">
            {/* Export */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Export Data</h3>
                <p className="text-sm text-gray-400">Download all your data as a JSON file</p>
              </div>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download size={18} />
                Export
              </button>
            </div>

            {/* Import */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Import Data</h3>
                <p className="text-sm text-gray-400">Restore data from a backup file</p>
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer">
                <Upload size={18} />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {/* Clear Data */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div>
                <h3 className="text-white font-medium">Clear All Data</h3>
                <p className="text-sm text-gray-400">Permanently delete all your data</p>
              </div>
              <button
                onClick={handleClearData}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Trash2 size={18} />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Firebase Integration Notice */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">🔥 Firebase Integration</h2>
          <p className="text-gray-300 mb-3">
            Currently using browser localStorage for data storage. Follow the setup guide in the README to connect Firebase for:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>Cloud synchronization across devices</li>
            <li>User authentication</li>
            <li>Real-time data updates</li>
            <li>Secure data storage</li>
          </ul>
        </div>

        {/* App Info */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">App Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Version:</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Framework:</span>
              <span className="text-white">Next.js 15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated:</span>
              <span className="text-white">November 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
