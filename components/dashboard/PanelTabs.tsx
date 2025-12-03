'use client';

import { usePathname, useRouter } from 'next/navigation';

interface Tab {
  id: string;
  label: string;
  path: string;
  status?: 'high-risk' | 'watch' | 'optimized';
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', path: '/dashboard' },
  { id: 'cardiovascular', label: 'Cardiovascular', path: '/dashboard/cardiovascular-v2', status: 'high-risk' },
  { id: 'cognitive', label: 'Cognitive', path: '/dashboard/neurodegenerative', status: 'watch' },
  { id: 'metabolic', label: 'Metabolic', path: '/dashboard/metabolic', status: 'watch' },
  { id: 'pharmacogenomic', label: 'Pharmacogenomic', path: '/dashboard/pharmacogenomic', status: 'high-risk' },
  { id: 'longevity', label: 'Longevity', path: '/dashboard/longevity', status: 'optimized' }
];

export default function PanelTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const statusColors = {
    'high-risk': 'bg-red-500',
    'watch': 'bg-amber-400',
    'optimized': 'bg-green-500'
  };

  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-1 px-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path !== '/dashboard' && pathname?.startsWith(tab.path));
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className={`
                relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${isActive
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.status && (
                  <span className={`w-2 h-2 rounded-full ${statusColors[tab.status]}`} />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
