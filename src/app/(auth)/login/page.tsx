import React from 'react';

export default function LoginPage() {
  return (
  <div className="flex items-center justify-center w-full h-screen bg-stone-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-stone-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-900">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-stone-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}