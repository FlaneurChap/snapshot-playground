'use client';

import RiskScoreCard from '@/components/dashboard/RiskScoreCard';
import GeneticSummaryTable from '@/components/dashboard/GeneticSummaryTable';
import HealthPlanChecklist from '@/components/dashboard/HealthPlanChecklist';
import PanelTabs from '@/components/dashboard/PanelTabs';

export default function CardiovascularV2Page() {
  const handleCitationClick = (citationId: string) => {
    const event = new CustomEvent('citation-click', { detail: citationId });
    window.dispatchEvent(event);
  };

  const geneticVariants = [
    {
      condition: 'Familial hypercholesterolemia',
      variant: 'het/het/het',
      interpretation: 'Likely pathogenic',
      gene: 'APOB',
      citationId: '5'
    },
    {
      condition: 'Familial hypercholesterolemia',
      variant: 'wt/wt/het',
      interpretation: 'VUS-Likely pathogenic',
      gene: 'LDLR',
      citationId: '5'
    },
    {
      condition: 'Hepatic Steatosis (fatty liver)',
      variant: 'wt/wt/het',
      interpretation: 'VUS',
      gene: 'LIPC',
      citationId: '5'
    },
    {
      condition: 'Lipoprotein (a), elevated',
      variant: 'wt/wt/het',
      interpretation: 'Strong risk factor',
      gene: 'LPA',
      citationId: '5'
    }
  ];

  const polygenicRisks = [
    { condition: 'Coronary/hyperlipidemia', percentage: 93, risk: 'High risk', citationId: '5' },
    { condition: 'Hypercholesterolemia', percentage: 98, risk: 'High risk', citationId: '5' },
    { condition: 'Hypertriglyceridemia', percentage: 98, risk: 'High risk', citationId: '5' },
    { condition: 'Low HDL Levels', percentage: 0, risk: 'Not Identified', citationId: '5' },
    { condition: 'High lipoprotein (a) levels', percentage: 50, risk: 'High risk', citationId: '5' },
    { condition: 'Endothelial derived nitric impairment', percentage: 99, risk: 'High risk', citationId: '5' }
  ];

  const healthPlanItems = [
    {
      id: 'smoking-cessation',
      label: 'Smoking cessation',
      link: 'https://smokefree.gov',
      completed: true,
      category: 'lifestyle' as const
    },
    {
      id: 'physical-activity',
      label: 'Regular physical activity',
      link: 'https://health.gov/moveyourway',
      completed: true,
      category: 'lifestyle' as const
    },
    {
      id: 'reduce-carbs',
      label: 'Reduce refined carbs',
      link: 'https://example.com',
      completed: false,
      category: 'lifestyle' as const
    },
    {
      id: 'hydration',
      label: 'Stay hydrated',
      link: 'https://example.com',
      completed: false,
      category: 'lifestyle' as const
    },
    {
      id: 'smoking-cessation-2',
      label: 'Smoking cessation',
      link: 'https://smokefree.gov',
      completed: false,
      category: 'lifestyle' as const
    },
    {
      id: 'healthy-diet',
      label: 'Healthy diet',
      link: 'https://dietaryguidelines.gov',
      completed: true,
      category: 'lifestyle' as const
    },
    {
      id: 'weight-management',
      label: 'Weight management',
      link: 'https://niddk.nih.gov',
      completed: true,
      category: 'lifestyle' as const
    },
    {
      id: 'limit-alcohol',
      label: 'Limit alcohol intake',
      link: 'https://rethinkingdrinking.niaaa.nih.gov',
      completed: false,
      category: 'lifestyle' as const
    },
    {
      id: 'sleep',
      label: 'Get enough sleep',
      link: 'https://sleep foundation.org',
      completed: false,
      category: 'lifestyle' as const
    },
    {
      id: 'resilience',
      label: 'Improve resilience',
      link: 'https://apa.org/helpcenter',
      completed: true,
      category: 'lifestyle' as const
    },
    {
      id: 'ezetimibe',
      label: 'Ezetimibe',
      link: 'https://example.com',
      completed: false,
      category: 'treatment' as const
    },
    {
      id: 'statin',
      label: 'Statin',
      link: 'https://example.com',
      completed: true,
      category: 'treatment' as const
    },
    {
      id: 'bileacid',
      label: 'Bile acid sequestrant',
      link: 'https://example.com',
      completed: false,
      category: 'treatment' as const
    },
    {
      id: 'niacin',
      label: 'Niacin (nicotinic acid)',
      link: 'https://example.com',
      completed: false,
      category: 'treatment' as const
    },
    {
      id: 'glp1',
      label: 'GLP-1 receptor agonist',
      link: 'https://example.com',
      completed: false,
      category: 'treatment' as const
    },
    {
      id: 'followup-8',
      label: 'Followup after 8 weeks',
      link: 'https://example.com',
      completed: true,
      category: 'monitoring' as const
    },
    {
      id: 'followup-12',
      label: 'Initial followup 6-12 weeks',
      link: 'https://example.com',
      completed: false,
      category: 'monitoring' as const
    }
  ];

  return (
    <div>
      {/* Horizontal Tabs */}
      <PanelTabs />

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* Panel Header */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Cardiovascular Panel</h1>
              <p className="text-sm text-gray-600 mt-1">Completed 2024-09-15</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">High Risk</span>
              <span className="w-3 h-3 bg-red-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Risk Score Cards - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RiskScoreCard
            title="HIGH GENETIC RISK STOP (8.68%)"
            subtitle="LIFETIME ASCVD RISK"
            percentage={50}
            riskLevel="high"
            citationId="5"
            onCitationClick={handleCitationClick}
          />
          <RiskScoreCard
            title="HIGH CLINICAL RISK"
            subtitle="10 YEAR ASCVD RISK"
            percentage={22.5}
            riskLevel="high"
            citationId="1"
            onCitationClick={handleCitationClick}
          />
        </div>

        {/* Genetic Summary */}
        <GeneticSummaryTable
          title="Pathogenic and Likely Pathogenic Variants"
          variants={geneticVariants}
          onCitationClick={handleCitationClick}
        />

        {/* Polygenic Disease Risk */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            Polygenic Disease Risk
          </h3>
          <div className="space-y-2">
            {polygenicRisks.map((risk, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-900">
                  {risk.condition}
                  <button
                    onClick={() => handleCitationClick(risk.citationId)}
                    className="text-xs align-super ml-1 text-teal-600 hover:underline"
                  >
                    [{risk.citationId}]
                  </button>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">{risk.percentage}%</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    risk.risk === 'High risk' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {risk.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Booster - AI Assistant Inline */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
              💡
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Knowledge Booster • 6.2</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                These are significant genetic variations when added after examining and testing lifestyle and cardiovascular health...
              </p>
              <p className="text-sm text-white/90 leading-relaxed mt-2">
                High precision/low threshold genetic variants...
              </p>
            </div>
          </div>
        </div>

        {/* Health Plan */}
        <HealthPlanChecklist
          title="Health Plan"
          items={healthPlanItems}
        />
      </div>
    </div>
  );
}
