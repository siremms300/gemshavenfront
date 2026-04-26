'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect personal information that you provide to us when registering for an account, including your name, email address, phone number, date of birth, address, and identification documents. We also collect financial information related to your savings, loans, and transactions.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use your information to provide and improve our services, process transactions, verify your identity, communicate with you about your account, comply with legal obligations, and protect against fraud and unauthorized access.'
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell or rent your personal information to third parties. We may share your information with service providers who assist in our operations, regulatory authorities as required by law, and with your consent or at your direction.'
    },
    {
      title: '4. Data Security',
      content: 'We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.'
    },
    {
      title: '5. Cookies and Tracking',
      content: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie settings through your browser preferences.'
    },
    {
      title: '6. Data Retention',
      content: 'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When your account is closed, we may retain certain information as required by law or for legitimate business purposes.'
    },
    {
      title: '7. Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact our Data Protection Officer.'
    },
    {
      title: '8. Third-Party Links',
      content: 'Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.'
    },
    {
      title: '9. Children\'s Privacy',
      content: 'Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us to have it removed.'
    },
    {
      title: '10. International Data Transfers',
      content: 'Your information may be transferred to and processed in countries other than your own. We take appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy.'
    },
    {
      title: '11. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform or sending you an email. Your continued use of our services after such modifications constitutes acceptance of the updated policy.'
    },
    {
      title: '12. Contact Us',
      content: 'If you have questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@gemshaven.com or call 08029204837.'
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
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
                At Two Hands Multipurpose Cooperative Society, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our platform and services.
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
                  By using our services, you consent to the collection and use of your information as described in this Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">© {new Date().getFullYear()} Two Hands Multipurpose Cooperative Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}