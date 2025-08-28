import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import { calculateMortgage } from '../../utils/calculations';
import type { MortgageResult } from '../../types/calculator';

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('30');
  const [taxes, setTaxes] = useState('3000');
  const [insurance, setInsurance] = useState('1200');
  const [result, setResult] = useState<MortgageResult | null>(null);

  useEffect(() => {
    const homePriceNum = parseFloat(homePrice) || 0;
    const downPaymentNum = parseFloat(downPayment) || 0;
    const rateNum = parseFloat(rate) || 0;
    const yearsNum = parseFloat(years) || 0;
    const taxesNum = parseFloat(taxes) || 0;
    const insuranceNum = parseFloat(insurance) || 0;

    const principal = homePriceNum - downPaymentNum;

    if (principal > 0 && yearsNum > 0) {
      const calculated = calculateMortgage(principal, rateNum, yearsNum, taxesNum, insuranceNum);
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [homePrice, downPayment, rate, years, taxes, insurance]);

  const resultData = result ? [
    { label: 'Total Monthly Payment', value: result.monthlyPayment, highlight: true },
    { label: 'Principal & Interest', value: result.monthlyPrincipalInterest },
    { label: 'Property Taxes', value: result.monthlyTaxes },
    { label: 'Insurance', value: result.monthlyInsurance },
    { label: 'Total Amount', value: result.totalAmount },
    { label: 'Total Interest', value: result.totalInterest }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mortgage Calculator</h2>
        
        {/* Input Section - Top */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Mortgage Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <InputField
              label="Home Price"
              value={homePrice}
              onChange={setHomePrice}
              prefix="$"
              placeholder="300000"
            />
            
            <InputField
              label="Down Payment"
              value={downPayment}
              onChange={setDownPayment}
              prefix="$"
              placeholder="60000"
            />
            
            <InputField
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              suffix="%"
              placeholder="6.5"
            />
            
            <InputField
              label="Loan Term"
              value={years}
              onChange={setYears}
              suffix="years"
              placeholder="30"
            />
            
            <InputField
              label="Annual Property Taxes"
              value={taxes}
              onChange={setTaxes}
              prefix="$"
              placeholder="3000"
            />
            
            <InputField
              label="Annual Insurance"
              value={insurance}
              onChange={setInsurance}
              prefix="$"
              placeholder="1200"
            />
          </div>
        </div>
        
        {/* Results Section - Bottom */}
        <div>
          {result && (
            <ResultCard
              title="Mortgage Summary"
              results={resultData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;