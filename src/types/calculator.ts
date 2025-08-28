export interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  monthlyPrincipalInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  totalAmount: number;
  totalInterest: number;
}

export interface InvestmentResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
}

export interface SavingsResult {
  monthlyPayment: number;
  totalAmount: number;
  timeToGoal: number;
}