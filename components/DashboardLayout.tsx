'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Heart,
  Brain,
  Droplet,
  TrendingUp,
  Pill,
  Bot,
  FileText,
  Menu,
  X
} from 'lucide-react';
import ReferenceManager from './ReferenceManager';
import AIAssistant from './AIAssistant';
import { Citation } from '@/types/patient';

interface DashboardLayoutProps {
  children: ReactNode;
  citations: Record<string, Citation>;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Activity },
  { name: 'Cardiovascular', href: '/dashboard/cardiovascular', icon: Heart },
  { name: 'Neurodegenerative', href: '/dashboard/neurodegenerative', icon: Brain },
  { name: 'Metabolic', href: '/dashboard/metabolic', icon: Droplet },
  { name: 'Longevity', href: '/dashboard/longevity', icon: TrendingUp },
  { name: 'Pharmacogenomic', href: '/dashboard/pharmacogenomic', icon: Pill },
];

export default function DashboardLayout({ children, citations }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [showReferences, setShowReferences] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTab = navigation.find(item => item.href === pathname)?.name || 'Dashboard';

  const handleCitationClick = (citationId: string) => {
    setSelectedCitation(citations[citationId] || null);
    setShowReferences(true);
    setShowAI(false);
  };

  // Listen for citation clicks from child components
  useEffect(() => {
    const handleCitationEvent = (event: CustomEvent) => {
      handleCitationClick(event.detail);
    };
    window.addEventListener('citation-click' as any, handleCitationEvent);
    return () => {
      window.removeEventListener('citation-click' as any, handleCitationEvent);
    };
  }, [citations]);

  const handleAIClick = () => {
    setShowAI(true);
    setShowReferences(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-blue-700 rounded transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold">GenSec Health</h1>
                <p className="text-sm text-blue-200">5-Second Snapshot Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAIClick}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">AI Assistant</span>
              </button>
              <button
                onClick={() => {
                  setShowReferences(!showReferences);
                  setShowAI(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">References</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          mt-[72px] lg:mt-0
        `}>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* FDA Compliance Notice */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="font-semibold">FDA Compliance:</strong> All values displayed are extracted from external clinical reports. No calculations or risk scores are performed by this system.
            </p>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden mt-[72px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          {children}
        </main>
      </div>

      {/* Fly-out Panels */}
      <ReferenceManager
        citation={selectedCitation}
        isOpen={showReferences}
        onClose={() => setShowReferences(false)}
      />

      <AIAssistant
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        currentTab={currentTab}
      />

      {/* Export context for child components */}
      <div style={{ display: 'none' }} data-citation-handler="true" />
    </div>
  );
}
