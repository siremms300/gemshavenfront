'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import {
  FaChevronDown,
  FaSearch,
  FaQuestionCircle,
  FaUserPlus,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaShieldAlt,
  FaMobileAlt,
  FaChevronUp,
  FaFilter,
} from 'react-icons/fa';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategories {
  [key: string]: FAQ[];
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState<string>('general');
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});
  const [categoriesOpen, setCategoriesOpen] = useState(false); // For mobile category toggle
  const contentRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'general', name: 'General', icon: FaQuestionCircle },
    { id: 'membership', name: 'Membership', icon: FaUserPlus },
    { id: 'savings', name: 'Savings', icon: FaPiggyBank },
    { id: 'loans', name: 'Loans', icon: FaHandHoldingUsd },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'technical', name: 'Technical', icon: FaMobileAlt },
  ];

  const faqs: FAQCategories = {
    general: [
      {
        question: 'What is Two Hands Cooperative Society?',
        answer: 'Two Hands is a multipurpose cooperative society that provides savings, loans, and investment opportunities to its members. We are committed to driving sustainable business growth and wealth creation for all our members.',
      },
      {
        question: 'How is Two Hands different from a bank?',
        answer: 'Unlike banks, Two Hands is owned and operated by its members. Profits are shared among members through dividends and lower interest rates on loans. We focus on mutual benefit rather than maximizing shareholder returns.',
      },
      {
        question: 'Is Two Hands registered and regulated?',
        answer: 'Yes, Two Hands is a registered cooperative society under the Nigerian Cooperative Societies Act and operates in compliance with all relevant regulations.',
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team via phone at 08029204837, email at Gemshaven@consultant.com, or visit our office at 123 Cooperative Avenue, Victoria Island, Lagos.',
      },
    ],
    membership: [
      {
        question: 'How do I become a member?',
        answer: 'To become a member, simply click the "Get Started" or "Register" button on our website, complete the registration form with your personal details, and make the minimum initial deposit of ₦5,000.',
      },
      {
        question: 'What are the requirements for membership?',
        answer: 'You must be at least 18 years old, have a valid government-issued ID, provide proof of address, and make the minimum initial deposit. You\'ll also need a valid email address and phone number.',
      },
      {
        question: 'Is there a membership fee?',
        answer: 'There is a one-time registration fee of ₦1,000 and a minimum initial savings deposit of ₦5,000 which goes into your savings account.',
      },
      {
        question: 'Can I have a joint account?',
        answer: 'Yes, we offer joint membership options for spouses or business partners. Please contact our membership team for more information.',
      },
    ],
    savings: [
      {
        question: 'What savings plans do you offer?',
        answer: 'We offer Regular Savings (flexible deposits and withdrawals), Fixed Deposit (higher interest rates for locked funds), Target Savings (goal-oriented saving), and Cooperative Shares (ownership stake with dividend earnings).',
      },
      {
        question: 'What are the interest rates on savings?',
        answer: 'Interest rates vary by plan: Regular Savings - 5% p.a., Fixed Deposit - 8% p.a., Target Savings - 6% p.a., and Shares - up to 10% p.a. in dividends.',
      },
      {
        question: 'How is interest calculated?',
        answer: 'Interest is calculated daily on your minimum monthly balance and credited to your account at the end of each month for regular savings, or at maturity for fixed deposits.',
      },
      {
        question: 'Can I withdraw my savings anytime?',
        answer: 'For Regular Savings, yes - you can withdraw anytime. Fixed Deposits have a lock period and early withdrawal may incur a penalty. Target Savings have restrictions to help you meet your goals.',
      },
    ],
    loans: [
      {
        question: 'What types of loans do you offer?',
        answer: 'We offer Personal Loans (12% p.a.), Business Loans (15% p.a.), Emergency Loans (8% p.a.), Education Loans (10% p.a.), and Asset Financing (18% p.a.).',
      },
      {
        question: 'How much can I borrow?',
        answer: 'Your loan eligibility is up to 3 times your total savings balance. The maximum amount also depends on the loan type and your repayment capacity.',
      },
      {
        question: 'How long does loan approval take?',
        answer: 'Loan applications are reviewed within 24-48 hours. Once approved, funds are typically disbursed within 24 hours to your registered bank account.',
      },
      {
        question: 'Can I repay my loan early?',
        answer: 'Yes, you can make early repayments without any penalty. Early repayment may reduce the total interest you pay.',
      },
    ],
    security: [
      {
        question: 'How secure is my money?',
        answer: 'All member savings are held in insured accounts with reputable banks. We use bank-grade security protocols for all transactions and regularly audit our financial systems.',
      },
      {
        question: 'Is my personal information safe?',
        answer: 'We use industry-standard encryption to protect your personal data. We never share your information with third parties without your consent, except as required by law.',
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. You\'ll receive an email with instructions to reset your password. For security, the link expires in 1 hour.',
      },
    ],
    technical: [
      {
        question: 'How do I access my account online?',
        answer: 'Visit our website and click "Sign In". Enter your registered email and password to access your member dashboard.',
      },
      {
        question: 'Is there a mobile app?',
        answer: 'Our mobile app is coming soon for both iOS and Android devices. Stay tuned for updates!',
      },
      {
        question: 'What should I do if I can\'t log in?',
        answer: 'First, ensure you\'re using the correct email and password. If you still can\'t log in, use the "Forgot Password" option. If problems persist, contact our support team.',
      },
    ],
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = (categoryId: string) => {
    setOpenCategory(categoryId);
    setCategoriesOpen(false); // Close mobile category menu after selection
    
    // Smooth scroll to content on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const filterFAQs = (categoryId: string): FAQ[] => {
    const categoryFaqs = faqs[categoryId] || [];
    if (!searchTerm) return categoryFaqs;
    const term = searchTerm.toLowerCase();
    return categoryFaqs.filter(
      faq =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term)
    );
  };

  const allCategoriesEmpty = Object.keys(faqs).every((categoryId) => {
    return filterFAQs(categoryId).length === 0;
  });

  const currentCategoryName = categories.find(c => c.id === openCategory)?.name || 'General';

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white pt-24 lg:pt-28 pb-14 lg:pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
            <p className="text-lg text-white/90 max-w-xl mx-auto mb-6">
              Find answers to common questions about Two Hands Cooperative Society
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4" ref={contentRef}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Categories - Desktop: always visible, Mobile: collapsible */}
            
            {/* Mobile Category Toggle Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="w-full flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <FaFilter size={14} className="text-primary" />
                  <span className="font-semibold text-primary text-sm">
                    {currentCategoryName}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: categoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown size={14} className="text-gray-500" />
                </motion.div>
              </button>
            </div>

            {/* Categories Panel */}
            <div className="lg:col-span-1">
              {/* Desktop: always visible */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
                  <h3 className="font-bold text-primary text-sm mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      const count = filterFAQs(category.id).length;
                      const isActive = openCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition text-sm ${
                            isActive
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="flex items-center">
                            <Icon className="mr-2" size={14} />
                            {category.name}
                          </span>
                          <span className={`text-xs ${
                            isActive ? 'text-white/80' : 'text-gray-400'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 p-3 bg-secondary/10 rounded-lg">
                    <h4 className="font-semibold text-primary text-xs mb-2">Still need help?</h4>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-primary text-white text-xs py-2 rounded-lg hover:bg-primary-light transition"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile: Collapsible */}
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="lg:hidden overflow-hidden mb-4"
                  >
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                      <div className="space-y-1">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          const count = filterFAQs(category.id).length;
                          const isActive = openCategory === category.id;
                          return (
                            <button
                              key={category.id}
                              onClick={() => handleCategoryClick(category.id)}
                              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition text-sm ${
                                isActive
                                  ? 'bg-primary text-white'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              <span className="flex items-center">
                                <Icon className="mr-2" size={14} />
                                {category.name}
                              </span>
                              <span className={`text-xs ${
                                isActive ? 'text-white/80' : 'text-gray-400'
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                        <h4 className="font-semibold text-primary text-xs mb-2">Still need help?</h4>
                        <Link
                          href="/contact"
                          className="block w-full text-center bg-primary text-white text-xs py-2 rounded-lg hover:bg-primary-light transition"
                        >
                          Contact Support
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              {categories.map((category) => {
                const categoryFaqs = filterFAQs(category.id);
                const isOpen = openCategory === category.id;

                if (!isOpen || categoryFaqs.length === 0) return null;

                return (
                  <motion.div
                    key={category.id}
                    id={`category-${category.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {/* Hide title on mobile since it shows in the toggle button */}
                    <h2 className="hidden lg:block text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                      {category.name} Questions
                    </h2>

                    {categoryFaqs.map((faq, index) => {
                      const questionId = `${category.id}-${index}`;
                      const isQuestionOpen = openQuestions[questionId];

                      return (
                        <motion.div
                          key={questionId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleQuestion(questionId)}
                            className="w-full flex items-center justify-between text-left p-4 hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="font-semibold text-primary text-sm pr-4">{faq.question}</h3>
                            <motion.div
                              animate={{ rotate: isQuestionOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaChevronDown className="text-secondary flex-shrink-0 text-xs" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isQuestionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                );
              })}

              {/* No Results */}
              {searchTerm && allCategoriesEmpty && (
                <div className="text-center py-14">
                  <FaQuestionCircle className="text-5xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
                  <p className="text-gray-500 text-sm mb-5">
                    Try searching with different keywords or browse our categories.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-secondary hover:text-primary font-medium text-sm"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} Two Hands Multipurpose Cooperative Society. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}