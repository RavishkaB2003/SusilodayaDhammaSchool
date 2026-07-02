"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4 font-sans selection:bg-[#F0E6D6]">
      <div className="absolute inset-0 bg-[radial-gradient(#F0E6D6_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white border border-[#E6DDD0] rounded-none shadow-none overflow-hidden relative p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-none bg-[#FFF8F0] border border-[#E6DDD0] mb-3">
            <svg className="w-8 h-8 text-[#6B1D3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-normal font-serif text-[#6B1D3A] tracking-tight italic">Susilodaya</h2>
          <p className="text-[10px] text-[#E8A317] font-bold tracking-widest mt-1.5 uppercase">Portal Login</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="username">
              Username or Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="e.g. S-2026-0042 or teacher.name"
              className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] rounded-none text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B1D3A] uppercase tracking-wider mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E6DDD0] rounded-none text-[#1C1C1E] placeholder-[#837561] focus:outline-none focus:border-[#6B1D3A] transition-all duration-200"
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-none flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{state.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-[#6B1D3A] hover:text-white text-white text-[11px] font-bold tracking-widest uppercase rounded-none transition-all duration-200 flex items-center justify-center space-x-2 border border-[#6B1D3A] disabled:opacity-50 disabled:cursor-not-allowed btn-wipe btn-wipe-maroon"
          >
            {isPending ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </span>
            ) : (
              <span>Enter Portal</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
