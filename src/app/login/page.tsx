'use client'

import { login } from './actions';
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-stone-300/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-[#000000]/20 p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-stone-950 dark:text-white/80">Login</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-stone-700 dark:text-[#AEB9E1] font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-white/70 dark:bg-[#0B1739] border border-stone-300/50 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 text-stone-950 dark:text-white/80"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-stone-700 dark:text-[#AEB9E1] font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-white/70 dark:bg-[#0B1739] border border-stone-300/50 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 pr-10 text-stone-950 dark:text-white/80"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500 dark:text-[#AEB9E1] hover:text-violet-500"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            formAction={login}
            className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition-all duration-200 font-medium"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-stone-500 dark:text-[#AEB9E1] text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-violet-500 hover:text-violet-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}