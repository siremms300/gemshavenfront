'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaStar, 
  FaCheckCircle, 
  FaPhone, 
  FaEnvelope,
  FaMapMarkerAlt, 
  FaPiggyBank, 
  FaHandHoldingUsd, 
  FaChartLine,
  FaUsers, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaShieldAlt
} from 'react-icons/fa';
import PublicHeader from '@/components/layout/PublicHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Logo from '@/components/shared/Logo';
import { calculateSavingsGrowth } from '@/lib/utils';

export default function HomePage() {
  const [calculatorAmount, setCalculatorAmount] = useState(50000);
  const [calculatorMonths, setCalculatorMonths] = useState(12);
  const [scrolled, setScrolled] = useState(false);
  const interestRate = 8;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const returns = calculateSavingsGrowth(calculatorAmount, calculatorMonths, interestRate);

  const features = [
    {
      icon: FaPiggyBank,
      title: "Smart Savings",
      description: "Competitive interest rates up to 12% p.a. on various savings plans tailored to your goals.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: FaHandHoldingUsd,
      title: "Flexible Loans",
      description: "Access loans up to 3x your savings with favorable repayment terms and low interest rates.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaChartLine,
      title: "Wealth Creation",
      description: "Strategic investment opportunities and financial education programs for long-term growth.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaUsers,
      title: "Community Support",
      description: "Network with like-minded entrepreneurs and business professionals in our community.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { value: "5,000+", label: "Active Members" },
    { value: "₦2.5B+", label: "Total Savings" },
    { value: "₦1.8B+", label: "Loans Disbursed" },
    { value: "98%", label: "Satisfaction Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "Gems Haven transformed my business. The loan I received helped me expand my inventory and double my revenue.",
      rating: 5
    },
    {
      name: "Michael Okonkwo",
      role: "Entrepreneur",
      content: "The savings discipline I learned here has been invaluable. I've saved over ₦5 million in just 2 years!",
      rating: 5
    },
    {
      name: "Grace Adeyemi",
      role: "Fashion Designer",
      content: "Beyond savings, the mentorship and networking opportunities have opened doors I never imagined.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 lg:w-96 h-80 lg:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 lg:w-96 h-80 lg:h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full mb-6">
                <FaStar className="text-secondary mr-2" />
                <span className="text-sm font-semibold text-primary">Trusted by 5,000+ members</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Grow Your Wealth
                </span>
                <br />
                <span className="text-primary">Together With Us</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join a community of forward-thinking individuals committed to financial independence 
                through smart savings, accessible loans, and strategic investments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register">
                  <Button variant="primary" size="lg" icon={<FaArrowRight />} iconPosition="right">
                    Start Saving Today
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-lg"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-primary">500+</span> new members this month
                </p>
              </div>
            </motion.div>
            
            {/* Right Content - Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-md w-full"
            >
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/30 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">Savings Calculator</h3>
                    <p className="text-white/70 text-sm">See how much you can save</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2 font-medium">Monthly Contribution</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 font-medium">₦</span>
                        <input 
                          type="number" 
                          value={calculatorAmount}
                          onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                          className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-secondary focus:bg-white/20 transition"
                          min="1000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-2 font-medium">Savings Period</label>
                      <select 
                        value={calculatorMonths}
                        onChange={(e) => setCalculatorMonths(Number(e.target.value))}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/20 transition"
                      >
                        {[6, 12, 18, 24, 36].map(m => (
                          <option key={m} value={m} className="text-gray-800">{m} Months</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mt-4 border border-white/20">
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-white/70">Total Invested:</span>
                        <span className="font-semibold">₦{returns.invested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-white/70">Interest Earned:</span>
                        <span className="font-semibold text-secondary-light">₦{returns.interest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base pt-2 border-t border-white/20">
                        <span className="font-medium">Total Savings:</span>
                        <span className="font-bold text-secondary-light">₦{returns.total.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Link href="/register" className="block">
                      <Button variant="secondary" fullWidth size="lg" type="button">
                        Start Saving Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Choose Gems Haven?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive financial solutions designed to help you achieve your goals
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="group text-center sm:text-left h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform mx-auto sm:mx-0`}>
                    <feature.icon className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              What Our Members Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied members on their journey to financial freedom
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-secondary text-sm" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-sm leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-8 sm:p-12 text-center text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-base sm:text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Join Gems Haven today and start your journey towards sustainable wealth creation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button variant="secondary" size="lg">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-white/80">
                <span className="flex items-center">
                  <FaCheckCircle className="text-accent mr-2" />
                  No hidden fees
                </span>
                <span className="flex items-center">
                  <FaShieldAlt className="text-accent mr-2" />
                  Secure & insured
                </span>
                <span className="flex items-center">
                  <FaCheckCircle className="text-accent mr-2" />
                  24/7 support
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-12 lg:pt-16 pb-6 lg:pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <Logo variant="light" size="md" className="mb-4" />
              <p className="text-white/70 text-sm mb-4 italic">
                for business growth and wealth creation...
              </p>
              <div className="flex space-x-3">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Social media link"
                  >
                    <Icon className="text-white text-sm" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Quick Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {['About Us', 'Our Services', 'Membership', 'FAQs'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="hover:text-accent transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Legal</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                {['Terms of Service', 'Privacy Policy', 'Security'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="hover:text-accent transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Contact Us</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start">
                  <FaPhone className="mr-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>08029204837</span>
                </li>
                <li className="flex items-start">
                  <FaEnvelope className="mr-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>Gemshaven@consultant.com</span>
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>Victoria Island, Lagos, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/50 text-xs sm:text-sm">
              © {new Date().getFullYear()} Gems Haven Multipurpose Cooperative Society. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}