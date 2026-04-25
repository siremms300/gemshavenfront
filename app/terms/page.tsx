'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using the Gems Haven Cooperative Society platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
    },
    {
      title: '2. Membership Eligibility',
      content: 'To become a member of Gems Haven Cooperative Society, you must be at least 18 years of age, possess a valid government-issued identification, and be capable of entering into a legally binding agreement. By registering, you represent and warrant that you meet all eligibility requirements.'
    },
    {
      title: '3. Account Registration',
      content: 'You must provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.'
    },
    {
      title: '4. Savings and Deposits',
      content: 'All savings deposits are subject to the terms of the specific savings plan selected. Interest rates are determined by the cooperative and may be adjusted with notice to members. Minimum balance requirements apply to certain account types. Withdrawals may be subject to processing times and restrictions based on the savings plan type.'
    },
    {
      title: '5. Loans and Credit',
      content: 'Loan eligibility is determined based on your savings history, membership duration, and other factors as determined by the cooperative. All loans are subject to approval and require a formal application process. Interest rates and repayment terms are specified in the loan agreement. Late payments may incur penalties and affect future loan eligibility.'
    },
    {
      title: '6. Fees and Charges',
      content: 'Membership fees, transaction fees, and other charges are disclosed at the time of account opening and may be updated with notice. By maintaining an account with us, you agree to pay all applicable fees as outlined in our fee schedule.'
    },
    {
      title: '7. Privacy and Data Protection',
      content: 'We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.'
    },
    {
      title: '8. Prohibited Activities',
      content: 'You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, overburden, or impair the platform. Prohibited activities include fraud, money laundering, unauthorized access, and any activity that violates applicable laws or regulations.'
    },
    {
      title: '9. Intellectual Property',
      content: 'All content, trademarks, logos, and intellectual property on the Gems Haven platform are owned by or licensed to Gems Haven Cooperative Society. You may not reproduce, distribute, or create derivative works without our express written permission.'
    },
    {
      title: '10. Limitation of Liability',
      content: 'Gems Haven Cooperative Society shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform. Our total liability shall not exceed the amount of fees paid by you in the preceding twelve months.'
    },
    {
      title: '11. Termination',
      content: 'We reserve the right to suspend or terminate your account at our discretion, with or without notice, for any violation of these terms or for any other reason deemed appropriate by the cooperative. Upon termination, your right to use the platform will immediately cease.'
    },
    {
      title: '12. Modifications to Terms',
      content: 'We may modify these terms at any time by posting the revised terms on our platform. Your continued use of the platform after such modifications constitutes your acceptance of the new terms. It is your responsibility to review these terms periodically.'
    },
    {
      title: '13. Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts of Nigeria.'
    },
    {
      title: '14. Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at Gemshaven@consultant.com or call 08029204837.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-white/90">
              Last Updated: January 1, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Welcome to Gems Haven Multipurpose Cooperative Society. These Terms of Service govern your use of our platform and services. Please read them carefully before using our services.
              </p>
              
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-bold text-primary mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
              
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-700">
                  By using Gems Haven Cooperative Society's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-8">
            <Link href="/register" className="btn-primary">
              Accept and Continue
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">© {new Date().getFullYear()} Gems Haven Multipurpose Cooperative Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}