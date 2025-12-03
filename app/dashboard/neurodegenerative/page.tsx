'use client';

import CategoryCard from '@/components/CategoryCard';
import patientData from '@/data/mockPatient.json';
import type { PatientData } from '@/types/patient';
import PanelTabs from '@/components/dashboard/PanelTabs';

const typedPatientData = patientData as PatientData;

export default function NeurodegenerativePage() {
  const { neurodegenerative } = typedPatientData;

  const handleCitationClick = (citationId: string) => {
    const event = new CustomEvent('citation-click', { detail: citationId });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <PanelTabs />
      <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Neurodegenerative Risk Assessment</h1>
            <p className="mt-2 text-gray-600">
              APOE genotype and cognitive assessment
            </p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-300 text-center">
            <div className="text-2xl font-bold">MONITOR</div>
            <div className="text-xs font-semibold">OVERALL STATUS</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-900">Clinical Summary</h3>
        <p className="mt-2 text-yellow-800">
          Patient is APOE ε3/ε4 heterozygous carrier with ~3x increased risk for Alzheimer's disease compared to ε3/ε3 genotype.
          Current cognitive function is normal (MoCA 28/30). Recommend lifestyle optimization and periodic monitoring.
        </p>
      </div>

      <div className="space-y-6">
        <CategoryCard
          category={neurodegenerative.genetics}
          onCitationClick={handleCitationClick}
        />

        <CategoryCard
          category={neurodegenerative.cognitiveScores}
          onCitationClick={handleCitationClick}
        />
      </div>
      </div>
    </div>
  );
}
