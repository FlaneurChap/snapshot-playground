'use client';

import { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';
import type { Citation } from '@/types/patient';

interface MobileDashboardLayoutProps {
  children: React.ReactNode;
  citations: Record<string, Citation>;
}

export default function MobileDashboardLayout({ children, citations }: MobileDashboardLayoutProps) {
  const [showReferences, setShowReferences] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);

  // Listen for citation clicks from child components
  useEffect(() => {
    const handleCitationEvent = (event: CustomEvent) => {
      setSelectedCitation(event.detail);
      setShowReferences(true);
    };
    window.addEventListener('citation-click' as any, handleCitationEvent);
    return () => {
      window.removeEventListener('citation-click' as any, handleCitationEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900 text-white z-40 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">GenSec Health</h1>
            <p className="text-xs text-gray-300">Executive Patient • MRN: GS-2024-0147</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowReferences(!showReferences)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowAI(!showAI)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children}
      </main>

      {/* Right Flyout - References */}
      {showReferences && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowReferences(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">References</h2>
              <button
                onClick={() => setShowReferences(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {Object.values(citations).map((citation) => (
                <div
                  key={citation.id}
                  className={`p-4 border rounded-lg ${
                    selectedCitation === citation.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-mono bg-gray-900 text-white px-2 py-0.5 rounded">
                      [{citation.id}]
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{citation.source}</h3>
                      <p className="text-sm text-gray-600 mt-1">{citation.date}</p>
                      {citation.snippet && (
                        <p className="text-sm text-gray-700 mt-2">{citation.snippet}</p>
                      )}
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {citation.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Right Flyout - AI Assistant */}
      {showAI && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowAI(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-xl font-bold">AI Assistant</h2>
              </div>
              <button
                onClick={() => setShowAI(false)}
                className="p-2 hover:bg-white/20 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-900">
                  Ask me about test results, treatment options, or clinical guidelines.
                </p>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  Explain LDLR gene variant implications
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  What additional tests should be ordered?
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  Recommend statin therapy options
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* FDA Compliance Notice */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 px-4 py-2 text-center text-xs text-gray-600">
        Display only • No calculated scores • All values from source reports
      </div>
    </div>
  );
}
