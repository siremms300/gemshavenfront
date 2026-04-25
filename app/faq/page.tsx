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

// Define proper types
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

  const categories = [
    { id: 'general', name: 'General', icon: FaQuestionCircle },
    { id: 'membership', name: 'Membership', icon: FaUserPlus },
    { id: 'savings', name: 'Savings', icon: FaPiggyBank },
    { id: 'loans', name: 'Loans', icon: FaHandHoldingUsd },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'technical', name: 'Technical', icon: FaMobileAlt }
  ];

  const faqs: FAQCategories = {
    general: [
      {
        question: 'What is Gems Haven Cooperative Society?',
        answer: 'Gems Haven is a multipurpose cooperative society that provides savings, loans, and investment opportunities to its members. We are committed to driving sustainable business growth and wealth creation for all our members.'
      },
      {
        question: 'How is Gems Haven different from a bank?',
        answer: 'Unlike banks, Gems Haven is owned and operated by its members. Profits are shared among members through dividends and lower interest rates on loans.'
      },
      {
        question: 'Is Gems Haven registered?',
        answer: 'Yes, Gems Haven is a registered cooperative society under the Nigerian Cooperative Societies Act.'
      },
      {
        question: 'How do I contact support?',
        answer: 'You can reach us via phone at 08029204837, email at Gemshaven@consultant.com, or visit our office at Victoria Island, Lagos.'
      }
    ],
    membership: [
      {
        question: 'How do I become a member?',
        answer: 'Click the "Get Started" or "Register" button on our website, complete the registration form, and make the minimum initial deposit of ₦5,000.'
      },
      {
        question: 'What are the requirements?',
        answer: 'You must be at least 18 years old, have a valid government-issued ID, and provide proof of address.'
      },
      {
        question: 'Is there a membership fee?',
        answer: 'There is a one-time registration fee of ₦1,000 and a minimum initial savings deposit of ₦5,000.'
      }
    ],
    savings: [
      {
        question: 'What savings plans do you offer?',
        answer: 'We offer Regular Savings, Fixed Deposit, Target Savings, and Cooperative Shares with varying interest rates.'
      },
      {
        question: 'What are the interest rates?',
        answer: 'Regular Savings: 5% p.a., Fixed Deposit: 8% p.a., Target Savings: 6% p.a., Shares: up to 10% p.a. in dividends.'
      },
      {
        question: 'Can I withdraw anytime?',
        answer: 'Regular Savings allow anytime withdrawal. Fixed Deposits have a lock period with early withdrawal penalties.'
      }
    ],
    loans: [
      {
        question: 'What loan types are available?',
        answer: 'We offer Personal, Business, Emergency, Education, and Asset Financing loans with competitive rates.'
      },
      {
        question: 'How much can I borrow?',
        answer: 'You can borrow up to 3 times your total savings balance, subject to loan type limits.'
      },
      {
        question: 'How long does approval take?',
        answer: 'Loan applications are reviewed within 24-48 hours, with disbursement within 24 hours of approval.'
      }
    ],
    security: [
      {
        question: 'Is my money safe?',
        answer: 'Yes, all member savings are held in insured accounts with reputable banks using bank-grade security.'
      },
      {
        question: 'Is my data protected?',
        answer: 'We use industry-standard encryption and never share your data with third parties without consent.'
      }
    ],
    technical: [
      {
        question: 'How do I access my account?',
        answer: 'Visit our website and click "Sign In", or download our mobile app for iOS and Android.'
      },
      {
        question: 'What if I can\'t log in?',
        answer: 'Use the "Forgot Password" option or contact technical support for assistance.'
      }
    ]
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
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

  // Fixed: Properly check if all categories have no results
  const allCategoriesEmpty = Object.keys(faqs).every((categoryId) => {
    return filterFAQs(categoryId).length === 0;
  });

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
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sticky top-24">
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
                        <span className="flex items-center text-sm">
                          <Icon className="mr-3" />
                          {category.name}
                        </span>
                        <span className={`text-xs ${
                          openCategory === category.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold text-primary text-sm mb-2">Still need help?</h4>
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-primary text-white text-sm py-2 rounded-lg hover:bg-primary-light transition"
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
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
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
                          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                          <button
                            onClick={() => toggleQuestion(questionId)}
                            className="w-full flex items-center justify-between text-left p-4"
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
                                <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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
              
              {/* No Results Message - Fixed condition */}
              {searchTerm && allCategoriesEmpty && (
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
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Gems Haven Multipurpose Cooperative Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}