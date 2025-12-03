'use client';

import { createContext, useContext, useState } from 'react';
import CategoryCard from '@/components/CategoryCard';
import patientData from '@/data/mockPatient.json';
import type { PatientData } from '@/types/patient';

const typedPatientData = patientData as PatientData;

// Create a context for citation clicks
const CitationContext = createContext<((citationId: string) => void) | null>(null);

export default function CardiovascularPage() {
  const { cardiovascular, citations } = typedPatientData;
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  const handleCitationClick = (citationId: string) => {
    setSelectedCitationId(citationId);
    // Trigger the parent layout's citation handler
    const event = new CustomEvent('citation-click', { detail: citationId });
    window.dispatchEvent(event);
  };

  return (
    <CitationContext.Provider value={handleCitationClick}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cardiovascular Assessment</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive lipid panel, cardiac imaging, inflammation markers, and genetic risk factors
              </p>
            </div>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg border border-red-300 text-center">
              <div className="text-2xl font-bold">HIGH RISK</div>
              <div className="text-xs font-semibold">OVERALL STATUS</div>
            </div>
          </div>
        </div>

        {/* Critical Summary */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              !
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Clinical Summary</h3>
              <p className="mt-2 text-red-800">
                This patient presents with <strong>likely familial hypercholesterolemia (FH)</strong> based on:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-red-800 list-disc list-inside">
                <li>Likely pathogenic LDLR variant (c.1646G&gt;A)</li>
                <li>Persistently elevated LDL-C (140 mg/dL)</li>
                <li>Elevated Lp(a) (85 nmol/L) - independent risk factor</li>
                <li>Moderate coronary calcification (CAC 120)</li>
                <li>Family history of early myocardial infarction</li>
              </ul>
              <p className="mt-3 text-red-900 font-semibold">
                → Recommend cardiology referral for aggressive lipid management and consideration of PCSK9 inhibitor therapy
              </p>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="space-y-6">
          <CategoryCard
            category={cardiovascular.lipids}
            onCitationClick={handleCitationClick}
          />

          <CategoryCard
            category={cardiovascular.imaging}
            onCitationClick={handleCitationClick}
          />

          <CategoryCard
            category={cardiovascular.inflammation}
            onCitationClick={handleCitationClick}
          />

          <CategoryCard
            category={cardiovascular.genetics}
            onCitationClick={handleCitationClick}
          />
        </div>

        {/* Treatment Considerations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Considerations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900">Pharmacologic Options</h4>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>• High-intensity statin (Rosuvastatin 40mg or Atorvastatin 80mg)</li>
                <li>• Ezetimibe 10mg (if LDL target not met)</li>
                <li>• PCSK9 inhibitor (Evolocumab or Alirocumab) for FH</li>
                <li>• Consider bempedoic acid as adjunct</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900">Lifestyle Interventions</h4>
              <ul className="mt-2 space-y-1 text-sm text-green-800">
                <li>• Mediterranean or Portfolio diet</li>
                <li>• Target LDL-C &lt;70 mg/dL (high risk) or &lt;55 mg/dL (very high risk)</li>
                <li>• Continue current exercise regimen (VO2 Max excellent)</li>
                <li>• Consider plant sterols/stanols supplementation</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900">Monitoring Plan</h4>
              <ul className="mt-2 space-y-1 text-sm text-purple-800">
                <li>• Lipid panel every 3 months until at goal</li>
                <li>• Liver function tests after statin initiation</li>
                <li>• Follow-up CAC scan in 3-5 years</li>
                <li>• Annual carotid ultrasound</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900">Family Screening</h4>
              <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                <li>• Cascade screening for first-degree relatives</li>
                <li>• Genetic testing for children (consider after age 10)</li>
                <li>• Document family pedigree with CVD events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CitationContext.Provider>
  );
}
