import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculateLoanRepayment(
  amount: number,
  tenure: number,
  interestRate: number
) {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalRepayment = monthlyPayment * tenure;
  const totalInterest = totalRepayment - amount;
  
  return {
    monthlyPayment,
    totalRepayment,
    totalInterest,
  };
}

export function calculateSavingsGrowth(
  monthlyAmount: number,
  months: number,
  annualRate: number
) {
  const monthlyRate = annualRate / 100 / 12;
  const futureValue =
    monthlyAmount *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const totalInvested = monthlyAmount * months;
  const interestEarned = futureValue - totalInvested;
  
  return {
    total: futureValue,
    invested: totalInvested,
    interest: interestEarned,
  };
}