import type { LoanResult, MortgageResult, InvestmentResult, SavingsResult } from '../types/calculator';

export function calculateLoan(
  principal: number,
  annualRate: number,
  years: number
): LoanResult {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    const monthlyPayment = principal / numberOfPayments;
    return {
      monthlyPayment,
      totalAmount: principal,
      totalInterest: 0
    };
  }
  
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalAmount = monthlyPayment * numberOfPayments;
  const totalInterest = totalAmount - principal;
  
  return {
    monthlyPayment,
    totalAmount,
    totalInterest
  };
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  years: number,
  annualTaxes: number = 0,
  annualInsurance: number = 0
): MortgageResult {
  const loanResult = calculateLoan(principal, annualRate, years);
  const monthlyTaxes = annualTaxes / 12;
  const monthlyInsurance = annualInsurance / 12;
  
  return {
    monthlyPayment: loanResult.monthlyPayment + monthlyTaxes + monthlyInsurance,
    monthlyPrincipalInterest: loanResult.monthlyPayment,
    monthlyTaxes,
    monthlyInsurance,
    totalAmount: loanResult.totalAmount + (annualTaxes * years) + (annualInsurance * years),
    totalInterest: loanResult.totalInterest
  };
}

export function calculateInvestment(
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): InvestmentResult {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfMonths = years * 12;
  
  const futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, numberOfMonths);
  
  let futureValueContributions = 0;
  if (monthlyRate > 0) {
    futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);
  } else {
    futureValueContributions = monthlyContribution * numberOfMonths;
  }
  
  const finalAmount = futureValueInitial + futureValueContributions;
  const totalContributions = initialAmount + (monthlyContribution * numberOfMonths);
  const totalInterest = finalAmount - totalContributions;
  
  return {
    finalAmount,
    totalContributions,
    totalInterest
  };
}

export function calculateSavings(
  targetAmount: number,
  initialAmount: number,
  annualRate: number,
  years?: number
): SavingsResult {
  const monthlyRate = annualRate / 100 / 12;
  
  if (years) {
    const numberOfMonths = years * 12;
    const futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, numberOfMonths);
    const remainingAmount = targetAmount - futureValueInitial;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = remainingAmount / 
        ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);
    } else {
      monthlyPayment = remainingAmount / numberOfMonths;
    }
    
    return {
      monthlyPayment: Math.max(0, monthlyPayment),
      totalAmount: targetAmount,
      timeToGoal: years
    };
  }
  
  return {
    monthlyPayment: 0,
    totalAmount: targetAmount,
    timeToGoal: 0
  };
}