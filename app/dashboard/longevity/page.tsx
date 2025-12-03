'use client';

import CategoryCard from '@/components/CategoryCard';
import patientData from '@/data/mockPatient.json';
import type { PatientData } from '@/types/patient';

const typedPatientData = patientData as PatientData;

export default function LongevityPage() {
  const { longevity } = typedPatientData;

  const handleCitationClick = (citationId: string) => {
    const event = new CustomEvent('citation-click', { detail: citationId });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Longevity & Healthspan</h1>
            <p className="mt-2 text-gray-600">
              Cardiorespiratory fitness, biological age markers, and longevity biomarkers
            </p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-300 text-center">
            <div className="text-2xl font-bold">OPTIMIZED</div>
            <div className="text-xs font-semibold">OVERALL STATUS</div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900">Clinical Summary</h3>
        <p className="mt-2 text-green-800">
          Excellent markers of longevity. VO2 Max of 42 mL/kg/min is in the top 10% for age.
          Epigenetic age testing shows GrimAge of 52 years (3 years younger than chronological age).
          Maintain current exercise regimen and continue lifestyle optimization.
        </p>
      </div>

      <div className="space-y-6">
        <CategoryCard
          category={longevity.fitness}
          onCitationClick={handleCitationClick}
        />

        <CategoryCard
          category={longevity.biologicalAge}
          onCitationClick={handleCitationClick}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900">Maintain Fitness</h4>
            <ul className="mt-2 space-y-1 text-sm text-purple-800">
              <li>• Continue VO2 Max testing annually</li>
              <li>• Zone 2 training 3-4x/week</li>
              <li>• High-intensity intervals 1-2x/week</li>
            </ul>
          </div>

          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-900">Longevity Biomarkers</h4>
            <ul className="mt-2 space-y-1 text-sm text-indigo-800">
              <li>• Repeat epigenetic age testing annually</li>
              <li>• Track resting heart rate variability</li>
              <li>• Monitor grip strength</li>
            </ul>
          </div>

          <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
            <h4 className="font-semibold text-teal-900">Lifestyle</h4>
            <ul className="mt-2 space-y-1 text-sm text-teal-800">
              <li>• Optimize sleep (7-9 hours)</li>
              <li>• Stress management practices</li>
              <li>• Social engagement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
