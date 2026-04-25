'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import {
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { value: '5,000+', label: 'Active Members', icon: FaUsers },
    { value: '₦2.5B+', label: 'Total Savings', icon: FaChartLine },
    { value: '₦1.8B+', label: 'Loans Disbursed', icon: FaHandHoldingHeart },
    { value: '98%', label: 'Member Satisfaction', icon: FaStar }
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We operate with transparency and honesty in all our dealings with members and partners.',
      icon: FaShieldAlt,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Community',
      description: 'We believe in the power of collective growth and mutual support among our members.',
      icon: FaUsers,
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Innovation',
      description: 'We continuously improve our services to meet the evolving needs of our members.',
      icon: FaChartLine,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in service delivery and member satisfaction.',
      icon: FaStar,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Emmanuel Okonkwo',
      role: 'Chairman',
      bio: 'Over 25 years experience in banking and cooperative management.',
      image: 'EO'
    },
    {
      name: 'Mrs. Folake Adeyemi',
      role: 'Managing Director',
      bio: 'Former investment banker with expertise in wealth management.',
      image: 'FA'
    },
    {
      name: 'Mr. Ibrahim Musa',
      role: 'Head of Operations',
      bio: '15+ years in cooperative society administration and member services.',
      image: 'IM'
    },
    {
      name: 'Ms. Chioma Eze',
      role: 'Head of Finance',
      bio: 'Chartered Accountant with extensive experience in financial planning.',
      image: 'CE'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'Gems Haven Cooperative Society was established with 50 founding members.' },
    { year: '2017', title: '1,000 Members', description: 'Reached our first major milestone of 1,000 active members.' },
    { year: '2019', title: 'Digital Platform', description: 'Launched our digital platform for seamless member transactions.' },
    { year: '2021', title: '₦1B Savings', description: 'Surpassed ₦1 billion in total member savings.' },
    { year: '2023', title: 'Loan Products', description: 'Expanded loan offerings to include business and education loans.' },
    { year: '2024', title: '5,000+ Members', description: 'Celebrated 5,000 active members and continued growth.' }
  ];

  return (
    <div className="min-h-screen">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white pt-24 lg:pt-28 pb-16 lg:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Gems Haven</h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Driving sustainable business growth, wealth creation, and shared prosperity for all members.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Gems Haven Multipurpose Cooperative Society was founded in 2015 by a group of visionary 
                  entrepreneurs who recognized the need for a financial institution that truly serves 
                  the interests of its members.
                </p>
                <p>
                  What started as a small cooperative with 50 members has grown into a thriving community 
                  of over 5,000 individuals and businesses, all united by the common goal of achieving 
                  financial independence and sustainable wealth creation.
                </p>
                <p>
                  Today, Gems Haven stands as a testament to the power of collective effort and mutual 
                  support. We've disbursed over ₦1.8 billion in loans, helping members start businesses, 
                  expand operations, and achieve their dreams.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p className="text-white/90 mb-6 text-sm leading-relaxed">
                  To empower our members with a clear and progressive growth mindset by fostering 
                  discipline, creativity, and innovation in all their endeavors.
                </p>
                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  To be a world-class multipurpose cooperative society, driving sustainable business 
                  growth, wealth creation, and shared prosperity for all members.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mb-3">
                  <stat.icon className="text-xl" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition group"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 lg:py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones in our growth story</p>
          </motion.div>
          
          <div className="relative pl-8 border-l-2 border-secondary/30 space-y-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[33px] top-1 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow"></div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{milestone.year}</span>
                  <h3 className="text-lg font-bold text-primary mt-1">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                <p className="text-secondary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-xs">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-10 sm:p-12 text-center text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Become a Member Today</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Join our community of forward-thinking individuals and start your journey towards financial freedom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-light transition">
                  Get Started
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transition">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Gems Haven Multipurpose Cooperative Society. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}