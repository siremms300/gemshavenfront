export interface User {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'member' | 'admin' | 'super-admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  totalSavings: number;
  totalShares: number;
  loanEligibility: number;
  profilePicture?: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface Savings {
  id: string;
  savingsType: 'regular' | 'fixed' | 'target' | 'shares';
  amount: number;
  balance: number;
  interestRate: number;
  accruedInterest: number;
  startDate: string;
  maturityDate?: string;
  status: 'active' | 'matured' | 'withdrawn' | 'paused';
  transactions: Transaction[];
}

export interface Transaction {
  type: 'deposit' | 'withdrawal' | 'interest' | 'penalty';
  amount: number;
  date: string;
  reference?: string;
  description: string;
  balance: number;
  status?: 'pending' | 'completed' | 'rejected';
}

export interface Loan {
  id: string;
  loanType: 'personal' | 'business' | 'emergency' | 'education' | 'asset';
  amount: number;
  purpose: string;
  interestRate: number;
  tenure: number;
  monthlyPayment: number;
  totalRepayment: number;
  amountPaid: number;
  outstandingBalance: number;
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'disbursed' | 'active' | 'completed';
  applicationDate: string;
  repaymentSchedule: RepaymentSchedule[];
}

export interface RepaymentSchedule {
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidAmount?: number;
  paidDate?: string;
}

export interface SavingsPlan {
  id: string;
  name: string;
  type: string;
  description: string;
  minimumDeposit: number;
  interestRate: number;
  duration: number;
  features: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}