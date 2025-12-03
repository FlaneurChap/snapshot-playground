interface RiskScoreCardProps {
  title: string;
  subtitle: string;
  percentage: number;
  riskLevel: 'high' | 'moderate' | 'low';
  citationId: string;
  onCitationClick: (id: string) => void;
}

export default function RiskScoreCard({
  title,
  subtitle,
  percentage,
  riskLevel,
  citationId,
  onCitationClick
}: RiskScoreCardProps) {
  const riskColors = {
    high: 'bg-red-50 border-red-500 text-red-900',
    moderate: 'bg-amber-50 border-amber-400 text-amber-900',
    low: 'bg-green-50 border-green-500 text-green-900'
  };

  const riskDots = {
    high: '🔴🔴🔴🔴🔴',
    moderate: '🟡🟡🟡',
    low: '🟢'
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${riskColors[riskLevel]}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
          <p className="text-xs mt-0.5 opacity-75">{subtitle}</p>
        </div>
        <span className="text-xs">{riskDots[riskLevel]}</span>
      </div>

      <div className="text-center py-4">
        <div className="text-5xl font-bold">
          {percentage}%
          <button
            onClick={() => onCitationClick(citationId)}
            className="text-sm align-super ml-1 hover:underline cursor-pointer"
          >
            [{citationId}]
          </button>
        </div>
      </div>

      {/* Risk Scale Visual */}
      <div className="mt-3 relative">
        <div className="h-2 bg-gradient-to-r from-green-400 via-amber-400 to-red-500 rounded-full" />
        <div
          className="absolute top-0 w-3 h-3 bg-gray-900 rounded-full border-2 border-white transform -translate-y-0.5"
          style={{ left: `${percentage}%`, marginLeft: '-6px' }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1 opacity-75">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
