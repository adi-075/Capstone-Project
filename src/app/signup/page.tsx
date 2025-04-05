"use client";
import { signup } from '../login/actions';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Suspense } from 'react';
import Link from 'next/link';

function SignupForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    console.log('Form submitted with data:', {
      email: formData.get('email'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      major: formData.get('major'),
      year: formData.get('year')
    });
    
    try {
      await signup(formData);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-[#081028]">
      <div className="max-w-md w-full bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-stone-300/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-[#000000]/20 p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-stone-950 dark:text-white/80">Sign Up</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
            {error === 'Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789'
              ? 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
              : error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
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
                minLength={6}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
                title="Password must contain at least one uppercase letter, one lowercase letter, and one number"
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
            <p className="mt-1 text-sm text-stone-500 dark:text-[#AEB9E1]">
              Password must contain:
              <ul className="list-disc list-inside">
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>Minimum 6 characters</li>
              </ul>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-stone-700 dark:text-[#AEB9E1] font-medium">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="w-full bg-white/70 dark:bg-[#0B1739] border border-stone-300/50 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 text-stone-950 dark:text-white/80"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-stone-700 dark:text-[#AEB9E1] font-medium">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="w-full bg-white/70 dark:bg-[#0B1739] border border-stone-300/50 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 text-stone-950 dark:text-white/80"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="major" className="block text-stone-700 dark:text-[#AEB9E1] font-medium">
              Major
            </label>
            <input
              id="major"
              name="major"
              type="text"
              required
              className="w-full bg-white/70 dark:bg-[#0B1739] border border-stone-300/50 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 text-stone-950 dark:text-white/80"
              placeholder="Computer Science"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-stone-700 dark:text-[#AEB9E1] font-medium">
              Year
            </label>
            <select
              id="year"
              name="year"
              required
              className="w-full bg-white/70 dark:bg-[#0B1739] border border-stone-300/50 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 text-stone-950 dark:text-white/80"
            >
              <option value="">Select your year</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition-all duration-200 font-medium"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-stone-500 dark:text-[#AEB9E1] text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-500 hover:text-violet-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
} 