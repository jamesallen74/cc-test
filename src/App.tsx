import { useState } from 'react';
import LoanCalculator from './components/calculators/LoanCalculator';
import MortgageCalculator from './components/calculators/MortgageCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';

type CalculatorType = 'loan' | 'mortgage' | 'investment';

function App() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('loan');

  const calculators = [
    { id: 'loan' as const, name: 'Loan Calculator', icon: '💰' },
    { id: 'mortgage' as const, name: 'Mortgage Calculator', icon: '🏠' },
    { id: 'investment' as const, name: 'Investment Calculator', icon: '📈' }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'loan':
        return <LoanCalculator />;
      case 'mortgage':
        return <MortgageCalculator />;
      case 'investment':
        return <InvestmentCalculator />;
      default:
        return <LoanCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar Navigation */}
      <div className="w-80 bg-white shadow-lg p-6 flex flex-col">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Financial Calculator Suite
          </h1>
          <p className="text-gray-600 text-sm">
            Calculate loans, mortgages, and investment returns
          </p>
        </header>

        <nav className="flex-1">
          <div className="space-y-3">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center text-left ${
                  activeCalculator === calc.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-50'
                }`}
              >
                <span className="mr-3 text-lg">{calc.icon}</span>
                {calc.name}
              </button>
            ))}
          </div>
        </nav>

        <footer className="mt-8 text-gray-500 text-xs">
          <p>&copy; 2024 Financial Calculator Suite</p>
          <p>Built with React & TypeScript</p>
        </footer>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <main>
          {renderCalculator()}
        </main>
      </div>
    </div>
  );
}

export default App;
