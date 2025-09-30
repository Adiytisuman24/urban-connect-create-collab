import React from 'react';
import { Users, Briefcase, TrendingUp, Shield, Star, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: (type: 'influencer' | 'brand') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Connect. Create. <span className="text-yellow-400">Collaborate.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto">
              The ultimate platform bridging influencers and brands. Secure contracts, 
              transparent payments, and data-driven collaborations.
            </p>
          </div>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center mb-6">
                <Users className="w-12 h-12 text-pink-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">For Creators</h3>
                  <p className="text-gray-300">Monetize your influence</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-200">
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                  Secure contracts & payments
                </li>
                <li className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-400 mr-3" />
                  Analytics & growth tracking
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-400 mr-3" />
                  Verified brand partnerships
                </li>
              </ul>
              <button
                onClick={() => onGetStarted('influencer')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                Join as Creator
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center mb-6">
                <Briefcase className="w-12 h-12 text-blue-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">For Brands</h3>
                  <p className="text-gray-300">Find perfect influencers</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-gray-200">
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-purple-400 mr-3" />
                  Advanced influencer discovery
                </li>
                <li className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Campaign performance tracking
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-400 mr-3" />
                  Escrow-protected payments
                </li>
              </ul>
              <button
                onClick={() => onGetStarted('brand')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                Join as Brand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-300">Built for modern creator economy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Verified</h3>
              <p className="text-gray-300">Complete KYC verification and escrow-protected payments ensure safe transactions for everyone.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Data-Driven</h3>
              <p className="text-gray-300">Comprehensive analytics and reporting to track performance and optimize campaigns.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quality Focused</h3>
              <p className="text-gray-300">Rating system and dispute resolution ensure high-quality collaborations and satisfied users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};