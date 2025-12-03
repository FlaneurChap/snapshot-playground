'use client';

import CategoryCard from '@/components/CategoryCard';
import patientData from '@/data/mockPatient.json';
import type { PatientData } from '@/types/patient';

const typedPatientData = patientData as PatientData;

export default function PharmacogenomicPage() {
  const { pharmacogenomic } = typedPatientData;

  const handleCitationClick = (citationId: string) => {
    const event = new CustomEvent('citation-click', { detail: citationId });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pharmacogenomics</h1>
            <p className="mt-2 text-gray-600">
              Drug-gene interactions and medication optimization
            </p>
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg border border-red-300 text-center">
            <div className="text-2xl font-bold">CRITICAL</div>
            <div className="text-xs font-semibold">ACTION REQUIRED</div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            !
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-900">CRITICAL: CYP2C19 Poor Metabolizer</h3>
            <p className="mt-2 text-red-800">
              Patient is homozygous for CYP2C19*2 allele (*2/*2), resulting in <strong>poor metabolizer status</strong>.
            </p>
            <div className="mt-3 p-3 bg-white rounded border border-red-300">
              <p className="text-sm font-semibold text-red-900 mb-2">Clinical Implications:</p>
              <ul className="space-y-1 text-sm text-red-800 list-disc list-inside">
                <li><strong>Clopidogrel (Plavix) is CONTRAINDICATED</strong> - will not be converted to active form</li>
                <li>If antiplatelet therapy needed, use prasugrel or ticagrelor instead</li>
                <li>Reduced effectiveness of certain PPIs (esomeprazole, omeprazole)</li>
                <li>Altered metabolism of some antidepressants (citalopram, escitalopram)</li>
              </ul>
            </div>
            <p className="mt-3 text-red-900 font-semibold">
              → Update EHR with drug allergy alert for clopidogrel and add pharmacogenomic note
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <CategoryCard
          category={pharmacogenomic.drugGeneInteractions}
          onCitationClick={handleCitationClick}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-300">
            <h4 className="font-semibold text-red-900 flex items-center gap-2">
              <span className="text-xl">⛔</span>
              AVOID
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-red-800">
              <li>• <strong>Clopidogrel</strong> - Will not be metabolized to active form</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <h4 className="font-semibold text-yellow-900 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              USE WITH CAUTION / ADJUST DOSE
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-yellow-800">
              <li>• <strong>Omeprazole/Esomeprazole</strong> - Consider alternative PPI or higher dose</li>
              <li>• <strong>Citalopram/Escitalopram</strong> - Start at lower dose, monitor closely</li>
              <li>• <strong>Diazepam</strong> - May have prolonged effect, reduce dose</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-300">
            <h4 className="font-semibold text-green-900 flex items-center gap-2">
              <span className="text-xl">✅</span>
              PREFERRED ALTERNATIVES
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-green-800">
              <li>• <strong>Antiplatelet:</strong> Prasugrel or Ticagrelor (no CYP2C19 interaction)</li>
              <li>• <strong>PPI:</strong> Pantoprazole or Rabeprazole (minimal CYP2C19 dependence)</li>
              <li>• <strong>Statin:</strong> Standard dosing appropriate (SLCO1B1 normal)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
