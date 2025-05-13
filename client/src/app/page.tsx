'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
        <div className="sign-in-card w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Memory Lane - Back to Your School Day</h2>
            <Image 
              src="/LastingMemory.jpg" 
              alt="Brain with colorful neurons" 
              width={120} 
              height={120} 
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">Your Memory, amplified</h1>
            <p className="text-sm text-gray-600">Privacy-first AI that helps you trust to register</p>
          </div>
          
          <button className="google-button mb-4">
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
          
          <div className="divider mb-4">
            <span className="bg-white px-2 text-sm text-gray-500">OR</span>
          </div>
          
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Enter your personal or work email"
              className="w-full p-4 border border-gray-300 rounded text-lg" // h-14 (56px) with custom padding
            />
          </div>
     
          <button className="primary-button mb-4">
            Sign Up or Sign In with email
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to AIbyML.com's <a href="#" className="text-gray-700 hover:underline">Terms</a> and <a href="#" className="text-gray-700 hover:underline">Privacy Policy</a>, and work with our <a href="#" className="text-gray-700 hover:underline">Commitment to Humanity</a>.
          </p>
          
          <div className="mt-8 text-center">
            <Link href="/about" className="learn-more-button inline-flex items-center">
              Learn more
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Changed from hidden to always display */}
      <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">How It Works</h2>
          <p className="text-lg text-center mb-16">Create your digital memory video in a few simple steps with AI technologies.</p>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">1. Write Your Story</h3>
              <p className="text-lg">Start by writing down your school memories, focusing on the moments that meant the most to you.</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">2. Upload Photos</h3>
              <p className="text-lg">Upload your school photos to bring your stories to life with visual memories.</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">3. Create a Storyboard</h3>
              <p className="text-lg">Design a storyboard that combines your written memories with your uploaded photos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}