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
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Logo from '@/components/shared/Logo';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data);
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card padding="lg">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex justify-center mb-6">
              <Logo variant="default" size="lg" />
            </Link>
            <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <FaEnvelope className="inline mr-2 text-gray-400" />
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'
                }`}
                placeholder="john@example.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <FaLock className="inline mr-2 text-gray-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`w-full px-4 py-3 border-2 rounded-xl pr-12 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:text-secondary transition">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary font-semibold hover:text-secondary">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Secure Login</span>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              For enquiries: 08029204837 | Gemshaven@consultant.com
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}