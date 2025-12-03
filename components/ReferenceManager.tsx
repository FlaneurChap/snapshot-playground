'use client';

import { Citation } from '@/types/patient';
import { X, FileText, Calendar, Tag } from 'lucide-react';

interface ReferenceManagerProps {
  citation: Citation | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeStyles = {
  lab: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🧪' },
  imaging: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🔬' },
  genetic: { bg: 'bg-pink-100', text: 'text-pink-800', icon: '🧬' },
  wearable: { bg: 'bg-green-100', text: 'text-green-800', icon: '⌚' }
};

export default function ReferenceManager({ citation, isOpen, onClose }: ReferenceManagerProps) {
  if (!isOpen || !citation) return null;

  const typeStyle = typeStyles[citation.type];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Reference Details</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-blue-700 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-sm text-blue-200">
            Citation [{citation.id}]
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Source */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Source Document
            </div>
            <div className="text-base font-semibold text-gray-900">
              {citation.source}
            </div>
          </div>

          {/* Date */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Date
            </div>
            <div className="text-base text-gray-900">
              {new Date(citation.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Type */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4" />
              Type
            </div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${typeStyle.bg} ${typeStyle.text}`}>
              <span>{typeStyle.icon}</span>
              <span className="capitalize">{citation.type}</span>
            </span>
          </div>

          {/* Snippet */}
          {citation.snippet && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Relevant Extract
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 leading-relaxed">
                {citation.snippet}
              </div>
            </div>
          )}

          {/* PDF Link (if available) */}
          {citation.pdfUrl && (
            <div>
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                View Full PDF Report
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            All data extracted from external reports. No calculations performed.
          </p>
        </div>
      </div>
    </>
  );
}
