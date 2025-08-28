import React from 'react';

interface ResultCardProps {
  title: string;
  results: Array<{
    label: string;
    value: string | number;
    highlight?: boolean;
  }>;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, results }) => {
  const formatCurrency = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{result.label}:</span>
            <span 
              className={`font-semibold ${
                result.highlight 
                  ? 'text-blue-600 text-lg' 
                  : 'text-gray-800'
              }`}
            >
              {typeof result.value === 'number' 
                ? formatCurrency(result.value)
                : result.value
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;