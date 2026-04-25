'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaChevronDown,
  FaSearch,
  FaQuestionCircle,
  FaUserPlus,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaShieldAlt,
  FaMobileAlt
} from 'react-icons/fa';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('general');
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'general', name: 'General', icon: FaQuestionCircle },
    { id: 'membership', name: 'Membership', icon: FaUserPlus },
    { id: 'savings', name: 'Savings', icon: FaPiggyBank },
    { id: 'loans', name: 'Loans', icon: FaHandHoldingUsd },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'technical', name: 'Technical', icon: FaMobileAlt }
  ];

  const faqs = {
    general: [
      {
        question: 'What is Gems Haven Cooperative Society?',
        answer: 'Gems Haven is a multipurpose cooperative society that provides savings, loans, and investment opportunities to its members. We are committed to driving sustainable business growth and wealth creation for all our members.'
      },
      {
        question: 'How is Gems Haven different from a bank?',
        answer: 'Unlike banks, Gems Haven is owned and operated by its members. Profits are shared among members through dividends and lower interest rates on loans. We focus on mutual benefit rather than maximizing shareholder returns.'
      },
      {
        question: 'Is Gems Haven registered and regulated?',
        answer: 'Yes, Gems Haven is a registered cooperative society under the Nigerian Cooperative Societies Act and operates in compliance with all relevant regulations.'
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team via phone at 08029204837, email at Gemshaven@consultant.com, or visit our office at 123 Cooperative Avenue, Victoria Island, Lagos.'
      }
    ],
    membership: [
      {
        question: 'How do I become a member?',
        answer: 'To become a member, simply click the "Get Started" or "Register" button on our website, complete the registration form with your personal details, and make the minimum initial deposit of ₦5,000.'
      },
      {
        question: 'What are the requirements for membership?',
        answer: 'You must be at least 18 years old, have a valid government-issued ID, provide proof of address, and make the minimum initial deposit. You\'ll also need a valid email address and phone number.'
      },
      {
        question: 'Is there a membership fee?',
        answer: 'There is a one-time registration fee of ₦1,000 and a minimum initial savings deposit of ₦5,000 which goes into your savings account.'
      },
      {
        question: 'Can I have a joint account?',
        answer: 'Yes, we offer joint membership options for spouses or business partners. Please contact our membership team for more information.'
      },
      {
        question: 'How do I update my membership information?',
        answer: 'You can update your personal information through your member dashboard under the Profile section, or visit any of our offices with valid identification.'
      }
    ],
    savings: [
      {
        question: 'What savings plans do you offer?',
        answer: 'We offer Regular Savings (flexible deposits and withdrawals), Fixed Deposit (higher interest rates for locked funds), Target Savings (goal-oriented saving), and Cooperative Shares (ownership stake with dividend earnings).'
      },
      {
        question: 'What are the interest rates on savings?',
        answer: 'Interest rates vary by plan: Regular Savings - 5% p.a., Fixed Deposit - 8% p.a., Target Savings - 6% p.a., and Shares - up to 10% p.a. in dividends.'
      },
      {
        question: 'How is interest calculated?',
        answer: 'Interest is calculated daily on your minimum monthly balance and credited to your account at the end of each month for regular savings, or at maturity for fixed deposits.'
      },
      {
        question: 'Can I withdraw my savings anytime?',
        answer: 'For Regular Savings, yes - you can withdraw anytime. Fixed Deposits have a lock period and early withdrawal may incur a penalty. Target Savings have restrictions to help you meet your goals.'
      },
      {
        question: 'What is the minimum balance required?',
        answer: 'The minimum balance varies by plan: Regular Savings - ₦1,000, Fixed Deposit - ₦50,000, Target Savings - ₦5,000, Shares - ₦10,000 per share.'
      }
    ],
    loans: [
      {
        question: 'What types of loans do you offer?',
        answer: 'We offer Personal Loans, Business Loans, Emergency Loans, Education Loans, and Asset Financing. Each loan type has different terms and interest rates.'
      },
      {
        question: 'How much can I borrow?',
        answer: 'Your loan eligibility is up to 3 times your total savings balance. The maximum amount also depends on the loan type and your repayment capacity.'
      },
      {
        question: 'What are the interest rates on loans?',
        answer: 'Interest rates range from 8% for Emergency Loans to 18% for Asset Financing. Personal Loans are at 12%, Business Loans at 15%, and Education Loans at 10% per annum.'
      },
      {
        question: 'How long does loan approval take?',
        answer: 'Loan applications are reviewed within 24-48 hours. Once approved, funds are typically disbursed within 24 hours to your registered bank account.'
      },
      {
        question: 'What happens if I miss a loan payment?',
        answer: 'Late payments incur a penalty fee of ₦500 per missed payment. Consistent defaults may affect your credit rating with the cooperative and reduce future loan eligibility.'
      },
      {
        question: 'Can I repay my loan early?',
        answer: 'Yes, you can make early repayments without any penalty. Early repayment may reduce the total interest you pay.'
      }
    ],
    security: [
      {
        question: 'How secure is my money?',
        answer: 'All member savings are held in insured accounts with reputable banks. We use bank-grade security protocols for all transactions and regularly audit our financial systems.'
      },
      {
        question: 'Is my personal information safe?',
        answer: 'We use industry-standard encryption to protect your personal data. We never share your information with third parties without your consent, except as required by law.'
      },
      {
        question: 'What should I do if I suspect fraud?',
        answer: 'Contact our support team immediately at 08029204837 or email security@gemshaven.com. We will investigate and take appropriate action to protect your account.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. You\'ll receive an email with instructions to reset your password. For security, the link expires in 1 hour.'
      }
    ],
    technical: [
      {
        question: 'How do I access my account online?',
        answer: 'Visit our website and click "Sign In". Enter your registered email and password to access your member dashboard. You can also download our mobile app for convenient access.'
      },
      {
        question: 'Is there a mobile app?',
        answer: 'Yes, our mobile app is available for both iOS and Android devices. Download it from the App Store or Google Play Store.'
      },
      {
        question: 'What should I do if I can\'t log in?',
        answer: 'First, ensure you\'re using the correct email and password. If you still can\'t log in, use the "Forgot Password" option. If problems persist, contact our technical support team.'
      },
      {
        question: 'Which browsers are supported?',
        answer: 'Our platform works best with the latest versions of Chrome, Firefox, Safari, and Edge. Please ensure your browser is up to date for the best experience.'
      }
    ]
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filterFAQs = (category: string) => {
    if (!searchTerm) return faqs[category as keyof typeof faqs];
    
    return faqs[category as keyof typeof faqs].filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Find answers to common questions about Gems Haven Cooperative Society
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-4 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="font-bold text-primary mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const count = filterFAQs(category.id).length;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => setOpenCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                          openCategory === category.id
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="flex items-center">
                          <Icon className="mr-3" />
                          {category.name}
                        </span>
                        <span className={`text-sm ${
                          openCategory === category.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Still Need Help */}
                <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Still need help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Can't find what you're looking for? Contact our support team.
                  </p>
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-sm py-2"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-bold gradient-text mb-6">
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
                          className="card overflow-hidden"
                        >
                          <button
                            onClick={() => toggleQuestion(questionId)}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <h3 className="font-semibold text-primary pr-4">{faq.question}</h3>
                            <FaChevronDown className={`text-secondary transition-transform flex-shrink-0 ${
                              isQuestionOpen ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          <AnimatePresence>
                            {isQuestionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 mt-4 border-t border-gray-100 text-gray-600 leading-relaxed">
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
              
              {searchTerm && Object.values(faqs).every(cat => filterFAQs(cat).length === 0) && (
                <div className="text-center py-12">
                  <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                  <p className="text-gray-500 mb-6">
                    Try searching with different keywords or browse our categories.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-secondary hover:text-primary font-medium"
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
          <p className="text-white/60">© {new Date().getFullYear()} Gems Haven Multipurpose Cooperative Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}