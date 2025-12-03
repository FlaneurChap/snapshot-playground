'use client';

import { MetricCategory } from '@/types/patient';
import MetricCard from './MetricCard';

interface CategoryCardProps {
  category: MetricCategory;
  onCitationClick: (citationId: string) => void;
}

export default function CategoryCard({ category, onCitationClick }: CategoryCardProps) {
  const statusBadgeStyles = {
    red: 'bg-red-100 text-red-800 border-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    green: 'bg-green-100 text-green-800 border-green-300'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusBadgeStyles[category.status]}`}>
            {category.status === 'red' && 'ACTION REQUIRED'}
            {category.status === 'yellow' && 'MONITOR'}
            {category.status === 'green' && 'OPTIMIZED'}
          </span>
        </div>
        {category.summary && (
          <p className="mt-2 text-sm text-gray-600">{category.summary}</p>
        )}
      </div>

      <div className="p-4 space-y-4">
        {category.metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            metric={metric}
            onCitationClick={onCitationClick}
          />
        ))}
      </div>
    </div>
  );
}
