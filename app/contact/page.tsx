'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PublicHeader from '@/components/layout/PublicHeader';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form data:', data);
      setSubmitted(true);
      reset();
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      lines: ['08029204837', '+234 802 920 4837'],
      color: 'bg-blue-500',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      lines: ['Gemshaven@consultant.com', 'support@gemshaven.com'],
      color: 'bg-green-500',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      lines: ['123 Cooperative Avenue', 'Victoria Island, Lagos', 'Nigeria'],
      color: 'bg-red-500',
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      lines: ['Monday - Friday: 9am - 5pm', 'Saturday: 10am - 2pm', 'Sunday: Closed'],
      color: 'bg-purple-500',
    },
  ];

  const faqs = [
    {
      question: 'How do I become a member?',
      answer: 'Simply click the "Get Started" button and complete the registration form. You\'ll need to provide some basic information and verify your email address.',
    },
    {
      question: 'What are the membership requirements?',
      answer: 'You must be at least 18 years old, have a valid ID, and be able to make the minimum initial deposit of ₦5,000.',
    },
    {
      question: 'How long does loan approval take?',
      answer: 'Loan applications are typically reviewed within 24-48 hours. Once approved, funds are disbursed within 24 hours.',
    },
    {
      question: 'Is my money safe?',
      answer: 'Yes! All member savings are insured and we follow strict financial regulations. We use bank-grade security for all transactions.',
    },
  ];

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
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Get in Touch</h1>
            <p className="text-lg text-white/90 max-w-xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 -mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <div className={`w-10 h-10 ${info.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                  <info.icon className="text-lg" />
                </div>
                <h3 className="font-bold text-primary text-sm mb-2">{info.title}</h3>
                {info.lines.map((line, i) => (
                  <p key={i} className="text-gray-600 text-xs">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-primary mb-5">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-sm mb-5">Thank you for contacting us. We'll get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-primary text-white rounded-full text-sm hover:bg-primary-light transition">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                          errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                          errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition"
                      placeholder="08012345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                    <select
                      {...register('subject')}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                        errors.subject ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="membership">Membership</option>
                      <option value="savings">Savings</option>
                      <option value="loans">Loans</option>
                      <option value="support">Technical Support</option>
                      <option value="complaint">Complaint</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition resize-none ${
                        errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-light transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaPaperPlane size={14} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Map */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-48 sm:h-56">
                <iframe
                  title="Two Hands Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.727284374528!2d3.421983!3d6.428059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53c4e3b4b5b%3A0x8c9f8b5e8b5e8b5e!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-primary text-sm mb-3">Follow Us</h3>
                <div className="flex space-x-2">
                  {[
                    { icon: FaFacebookF, color: 'bg-blue-600 hover:bg-blue-700' },
                    { icon: FaTwitter, color: 'bg-sky-500 hover:bg-sky-600' },
                    { icon: FaInstagram, color: 'bg-pink-600 hover:bg-pink-700' },
                    { icon: FaLinkedinIn, color: 'bg-blue-700 hover:bg-blue-800' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      className={`w-9 h-9 ${social.color} text-white rounded-lg flex items-center justify-center transition`}
                    >
                      <social.icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-primary text-sm mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-800">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-800">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-400">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm">Find quick answers to common questions</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-5 border border-gray-200"
              >
                <h3 className="font-semibold text-primary text-sm mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/faq" className="text-secondary hover:text-primary font-medium text-sm">
              View all FAQs →
            </Link>
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