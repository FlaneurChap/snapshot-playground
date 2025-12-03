'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface HealthPlanItem {
  id: string;
  label: string;
  link?: string;
  completed: boolean;
  category: 'lifestyle' | 'treatment' | 'monitoring';
}

interface HealthPlanChecklistProps {
  title: string;
  items: HealthPlanItem[];
}

export default function HealthPlanChecklist({ title, items }: HealthPlanChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(
    new Set(items.filter(item => item.completed).map(item => item.id))
  );

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const categoryColors = {
    lifestyle: 'text-blue-600',
    treatment: 'text-purple-600',
    monitoring: 'text-teal-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
        {title}
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={checkedItems.has(item.id)}
              onChange={() => toggleItem(item.id)}
              className="mt-0.5 w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <div className="flex-1">
              <span className={`text-sm ${checkedItems.has(item.id) ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {item.label}
              </span>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-teal-600 hover:text-teal-700 text-xs inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  see details
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <span className={`text-xs font-medium ${categoryColors[item.category]}`}>
              {item.category}
            </span>
          </label>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">
            {checkedItems.size} / {items.length}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 transition-all duration-300"
            style={{ width: `${(checkedItems.size / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
