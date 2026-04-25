'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Logo from '@/components/shared/Logo';
import Alert from '@/components/ui/Alert';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(11, 'Phone number must be at least 11 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9+]+$/, 'Phone number can only contain numbers and +'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    return value.replace(/[^\d+]/g, '');
  };

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError('');
    
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser({
        ...registerData,
        phone: formatPhoneNumber(registerData.phone)
      });
      
      toast.success('Registration successful! Redirecting...');
      router.push('/dashboard');
    } catch (error: any) {
      const errorData = error.response?.data;
      
      if (errorData?.errors) {
        errorData.errors.forEach((err: any) => {
          setError(err.path as keyof RegisterFormData, {
            type: 'manual',
            message: err.msg
          });
        });
      }
      setServerError(errorData?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Access to savings plans with competitive rates',
    'Flexible loan facilities up to 3x savings',
    'Investment and wealth creation opportunities',
    'Community support and networking',
    'Financial education and resources',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 lg:p-10">
              <div className="mb-8">
                <Link href="/" className="inline-flex mb-6">
                  <Logo variant="default" size="md" />
                </Link>
                <h2 className="text-2xl lg:text-3xl font-bold gradient-text mb-2">Create Your Account</h2>
                <p className="text-gray-600">Join Gems Haven and start your journey to financial freedom</p>
              </div>

              {serverError && (
                <Alert variant="error" className="mb-6">
                  {serverError}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.firstName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                        }`}
                        placeholder="John"
                        disabled={loading}
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.lastName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                        }`}
                        placeholder="Doe"
                        disabled={loading}
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      {...register('email')}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                      }`}
                      placeholder="john@example.com"
                      disabled={loading}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      {...register('phone')}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                      }`}
                      placeholder="08012345678"
                      disabled={loading}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  <p className="text-gray-500 text-xs mt-1">Format: 08012345678</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                      }`}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-secondary focus:ring-secondary/20'
                      }`}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={loading}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:text-secondary font-medium">Terms</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-primary hover:text-secondary font-medium">Privacy Policy</Link>
                  </span>
                </div>

                <Button type="submit" variant="primary" fullWidth loading={loading}>
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-semibold hover:text-secondary">Sign In</Link>
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="hidden lg:block bg-gradient-to-br from-primary to-primary-light p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Member Benefits</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <FaCheckCircle className="text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <h4 className="font-semibold text-lg mb-2">Why Choose Us?</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Join over 5,000 members who trust Gems Haven for their savings, 
                  loans, and investment needs. We offer competitive rates and a 
                  supportive community.
                </p>
              </div>

              <div className="mt-6 text-center text-white/60 text-sm">
                <p>For enquiries:</p>
                <p className="font-medium text-white">08029204837</p>
                <p>Gemshaven@consultant.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}