import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import { calculateLoan } from '../../utils/calculations';
import type { LoanResult } from '../../types/calculator';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('5');
  const [result, setResult] = useState<LoanResult | null>(null);

  useEffect(() => {
    const principalNum = parseFloat(principal) || 0;
    const rateNum = parseFloat(rate) || 0;
    const yearsNum = parseFloat(years) || 0;

    if (principalNum > 0 && yearsNum > 0) {
      const calculated = calculateLoan(principalNum, rateNum, yearsNum);
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [principal, rate, years]);

  const resultData = result ? [
    { label: 'Monthly Payment', value: result.monthlyPayment, highlight: true },
    { label: 'Total Amount', value: result.totalAmount },
    { label: 'Total Interest', value: result.totalInterest }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan Calculator</h2>
        
        {/* Input Section - Top */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Loan Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <InputField
              label="Loan Amount"
              value={principal}
              onChange={setPrincipal}
              prefix="$"
              placeholder="10000"
            />
            
            <InputField
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              suffix="%"
              placeholder="5"
            />
            
            <InputField
              label="Loan Term"
              value={years}
              onChange={setYears}
              suffix="years"
              placeholder="5"
            />
          </div>
        </div>
        
        {/* Results Section - Bottom */}
        <div>
          {result && (
            <ResultCard
              title="Loan Summary"
              results={resultData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;