'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white py-24 px-4 overflow-hidden">
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
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Gems Haven</h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Driving sustainable business growth, wealth creation, and shared prosperity for all members.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-6">Our Story</h2>
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
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-white/90 mb-6">
                  To empower our members with a clear and progressive growth mindset by fostering 
                  discipline, creativity, and innovation in all their endeavors.
                </p>
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-white/90">
                  To be a world-class multipurpose cooperative society, driving sustainable business 
                  growth, wealth creation, and shared prosperity for all members.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mb-4">
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group"
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth story</p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondary/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-secondary rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12 text-right'}`}>
                    <div className="card inline-block text-left max-w-md">
                      <span className="text-3xl font-bold gradient-text">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-primary mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                <p className="text-secondary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-12 text-center text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Become a Member Today</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join our community of forward-thinking individuals and start your journey towards financial freedom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn-secondary text-lg px-8">
                  Get Started
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300 text-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">© {new Date().getFullYear()} Gems Haven Multipurpose Cooperative Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}