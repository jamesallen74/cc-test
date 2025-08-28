import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import { calculateInvestment } from '../../utils/calculations';
import type { InvestmentResult } from '../../types/calculator';

const InvestmentCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('20');
  const [result, setResult] = useState<InvestmentResult | null>(null);

  useEffect(() => {
    const initialNum = parseFloat(initialAmount) || 0;
    const monthlyNum = parseFloat(monthlyContribution) || 0;
    const rateNum = parseFloat(rate) || 0;
    const yearsNum = parseFloat(years) || 0;

    if (yearsNum > 0) {
      const calculated = calculateInvestment(initialNum, monthlyNum, rateNum, yearsNum);
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [initialAmount, monthlyContribution, rate, years]);

  const resultData = result ? [
    { label: 'Final Amount', value: result.finalAmount, highlight: true },
    { label: 'Total Contributions', value: result.totalContributions },
    { label: 'Investment Growth', value: result.totalInterest }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Investment Calculator</h2>
        
        {/* Input Section - Top */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Investment Details</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InputField
              label="Initial Investment"
              value={initialAmount}
              onChange={setInitialAmount}
              prefix="$"
              placeholder="5000"
            />
            
            <InputField
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              prefix="$"
              placeholder="200"
            />
            
            <InputField
              label="Annual Return Rate"
              value={rate}
              onChange={setRate}
              suffix="%"
              placeholder="7"
            />
            
            <InputField
              label="Investment Period"
              value={years}
              onChange={setYears}
              suffix="years"
              placeholder="20"
            />
          </div>
        </div>
        
        {/* Results Section - Bottom */}
        <div>
          {result && (
            <ResultCard
              title="Investment Summary"
              results={resultData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;