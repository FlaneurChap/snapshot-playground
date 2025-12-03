'use client';

import { Metric, MetricStatus } from '@/types/patient';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  metric: Metric;
  onCitationClick: (citationId: string) => void;
}

const statusStyles: Record<MetricStatus, { border: string; bg: string; text: string }> = {
  red: {
    border: 'border-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700'
  },
  yellow: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700'
  },
  green: {
    border: 'border-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700'
  }
};

export default function MetricCard({ metric, onCitationClick }: MetricCardProps) {
  const styles = statusStyles[metric.status];

  return (
    <div className={`border-l-4 ${styles.border} bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{metric.name}</h3>
            {metric.status === 'red' && (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {metric.value}
            </span>
            {metric.unit && (
              <span className="text-sm text-gray-600">{metric.unit}</span>
            )}
            <button
              onClick={() => onCitationClick(metric.citationId)}
              className="ml-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              [{metric.citationId}]
            </button>
          </div>

          {metric.delta && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              {metric.delta.direction === 'up' && (
                <>
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-red-600">
                    +{metric.delta.value} ({metric.delta.percentage}%)
                  </span>
                </>
              )}
              {metric.delta.direction === 'down' && (
                <>
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">
                    -{metric.delta.value} ({metric.delta.percentage}%)
                  </span>
                </>
              )}
              {metric.delta.direction === 'stable' && (
                <>
                  <Minus className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Stable</span>
                </>
              )}
              <span className="text-gray-500 ml-1">vs. last visit</span>
            </div>
          )}

          {metric.referenceRange && (
            <div className="mt-2 text-xs text-gray-600">
              Reference: {metric.referenceRange}
            </div>
          )}

          {metric.notes && (
            <div className={`mt-2 text-sm ${styles.text} ${styles.bg} p-2 rounded`}>
              {metric.notes}
            </div>
          )}
        </div>

        {metric.trend && metric.trend.length > 0 && (
          <div className="ml-4 w-32 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metric.trend}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={metric.status === 'red' ? '#ef4444' : metric.status === 'yellow' ? '#f59e0b' : '#10b981'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
