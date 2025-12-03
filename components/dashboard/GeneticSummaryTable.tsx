interface GeneticVariant {
  condition: string;
  variant: string;
  interpretation: string;
  gene: string;
  citationId: string;
}

interface GeneticSummaryTableProps {
  title: string;
  variants: GeneticVariant[];
  onCitationClick: (id: string) => void;
}

export default function GeneticSummaryTable({
  title,
  variants,
  onCitationClick
}: GeneticSummaryTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
        {title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Condition</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Variant</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Interpretation</th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">Gene</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-gray-900">
                  {variant.condition}
                  <button
                    onClick={() => onCitationClick(variant.citationId)}
                    className="text-xs align-super ml-1 text-teal-600 hover:underline"
                  >
                    [{variant.citationId}]
                  </button>
                </td>
                <td className="py-3 px-2 text-gray-700 font-mono text-xs">{variant.variant}</td>
                <td className="py-3 px-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    variant.interpretation.includes('pathogenic') || variant.interpretation.includes('Likely')
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {variant.interpretation}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-700 font-semibold">{variant.gene}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
