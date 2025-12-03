'use client';

import CategoryCard from '@/components/CategoryCard';
import patientData from '@/data/mockPatient.json';

export default function MetabolicPage() {
  const { metabolic } = patientData;

  const handleCitationClick = (citationId: string) => {
    const event = new CustomEvent('citation-click', { detail: citationId });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Metabolic Health</h1>
            <p className="mt-2 text-gray-600">
              Glucose metabolism, insulin sensitivity, and continuous glucose monitoring
            </p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-300 text-center">
            <div className="text-2xl font-bold">WATCH</div>
            <div className="text-xs font-semibold">OVERALL STATUS</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-900">Clinical Summary</h3>
        <p className="mt-2 text-yellow-800">
          Patient is in pre-diabetic range (HbA1c 5.8%) with early insulin resistance (HOMA-IR 3.1).
          CGM data shows average glucose of 108 mg/dL. Recommend lifestyle intervention with nutrition
          counseling and continued exercise program before pharmacologic therapy.
        </p>
      </div>

      <div className="space-y-6">
        <CategoryCard
          category={metabolic.glucose}
          onCitationClick={handleCitationClick}
        />

        <CategoryCard
          category={metabolic.insulin}
          onCitationClick={handleCitationClick}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Intervention Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900">Nutrition</h4>
            <ul className="mt-2 space-y-1 text-sm text-green-800">
              <li>• Low glycemic index diet</li>
              <li>• Reduce refined carbohydrates</li>
              <li>• Increase fiber intake to 35g/day</li>
              <li>• Consider time-restricted eating (16:8)</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900">Exercise</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-800">
              <li>• Continue current aerobic program</li>
              <li>• Add resistance training 2-3x/week</li>
              <li>• Post-meal walks to blunt glucose spikes</li>
              <li>• Target 150+ min/week moderate intensity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
