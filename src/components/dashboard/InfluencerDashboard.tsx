import React, { useState } from 'react';
import {
  User,
  Briefcase,
  FileText,
  DollarSign,
  TrendingUp,
  LogOut,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Instagram,
  Youtube,
  Twitter,
  Plus
} from 'lucide-react';

interface InfluencerDashboardProps {
  onLogout: () => void;
}

export function InfluencerDashboard({ onLogout }: InfluencerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'opportunities' | 'contracts' | 'earnings' | 'analytics'>('overview');

  const profileData = {
    name: 'Creator Name',
    bio: 'Content creator passionate about lifestyle and technology',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    completionPercentage: 75,
    totalFollowers: 0,
    avgEngagement: 0,
    kycStatus: 'verified',
  };

  const socialAccounts = [
    { platform: 'Instagram', username: '@username', followers: 0, icon: Instagram, connected: true },
    { platform: 'YouTube', username: 'Channel Name', followers: 0, icon: Youtube, connected: false },
    { platform: 'Twitter', username: '@handle', followers: 0, icon: Twitter, connected: false },
  ];

  const portfolioItems = [
    { id: 1, title: 'Sample Post 1', type: 'image', url: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400', tags: ['lifestyle', 'fashion'] },
    { id: 2, title: 'Sample Video', type: 'video', url: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=400', tags: ['tech', 'review'] },
  ];

  const opportunities = [
    { id: 1, title: 'Fashion Brand Campaign', brand: 'StyleCo', budget: 50000, type: 'money', status: 'active', minFollowers: 10000 },
    { id: 2, title: 'Tech Product Review', brand: 'TechBrand', budget: 0, type: 'barter', status: 'active', minFollowers: 5000 },
  ];

  const contracts = [
    { id: 1, type: 'information_request', brand: 'BeautyBrand', status: 'pending', createdAt: '2025-09-28' },
    { id: 2, type: 'deal', brand: 'FitnessCo', status: 'in_progress', amount: 25000, deliverables: 'Instagram posts', timeline: '2 weeks' },
    { id: 3, type: 'deal', brand: 'FoodApp', status: 'completed', amount: 15000, deliverables: 'Reel + Story', rating: 5 },
  ];

  const earnings = {
    total: 0,
    pending: 0,
    escrow: 0,
    released: 0,
    transactions: [
      { id: 1, brand: 'FoodApp', amount: 15000, status: 'released', date: '2025-09-20' },
    ],
  };

  const analyticsData = {
    followersGrowth: [
      { date: '2025-09-01', count: 0 },
      { date: '2025-09-08', count: 0 },
      { date: '2025-09-15', count: 0 },
      { date: '2025-09-22', count: 0 },
      { date: '2025-09-29', count: 0 },
    ],
    engagementRate: 0,
    completedCampaigns: 1,
    avgRating: 5.0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Influencer Dashboard</h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
              { id: 'opportunities', label: 'Opportunities', icon: FileText },
              { id: 'contracts', label: 'Contracts', icon: FileText },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Profile Overview Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-6">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                    {profileData.kycStatus === 'verified' && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        KYC Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{profileData.bio}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">Profile Completion:</span>
                    <div className="flex-1 max-w-xs h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${profileData.completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{profileData.completionPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Followers</div>
                <div className="text-3xl font-bold text-gray-900">{profileData.totalFollowers.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Across all platforms</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Avg. Engagement Rate</div>
                <div className="text-3xl font-bold text-gray-900">{profileData.avgEngagement}%</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Earnings</div>
                <div className="text-3xl font-bold text-gray-900">₹{earnings.total.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">All time</div>
              </div>
            </div>

            {/* Social Accounts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Social Accounts</h3>
              <div className="space-y-3">
                {socialAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <div key={account.platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">{account.platform}</div>
                          <div className="text-sm text-gray-600">{account.username}</div>
                        </div>
                      </div>
                      {account.connected ? (
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{account.followers.toLocaleString()} followers</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Connected</span>
                        </div>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Connect
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Portfolio</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                Add Sample Work
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Campaigns</h2>
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <div key={opp.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{opp.title}</h3>
                      <p className="text-gray-600">by {opp.brand}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      opp.type === 'money' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {opp.type === 'money' ? `₹${opp.budget.toLocaleString()}` : 'Barter'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span>Min. Followers: {opp.minFollowers.toLocaleString()}</span>
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Contracts & Deals</h2>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contract.brand}</h3>
                        {contract.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                        {contract.status === 'in_progress' && <Clock className="w-5 h-5 text-blue-600" />}
                        {contract.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                      <p className="text-sm text-gray-600 capitalize">{contract.type.replace('_', ' ')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      contract.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {contract.status.replace('_', ' ')}
                    </span>
                  </div>
                  {contract.amount && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Amount: ₹{contract.amount.toLocaleString()}</div>
                      {contract.deliverables && <div>Deliverables: {contract.deliverables}</div>}
                      {contract.timeline && <div>Timeline: {contract.timeline}</div>}
                      {contract.rating && (
                        <div className="flex items-center gap-2 mt-2">
                          <span>Rating:</span>
                          <span className="text-yellow-500">{'★'.repeat(contract.rating)}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {contract.type === 'information_request' && contract.status === 'pending' && (
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Accept & Share Info
                      </button>
                      <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Earnings</div>
                <div className="text-2xl font-bold text-gray-900">₹{earnings.total.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Pending</div>
                <div className="text-2xl font-bold text-yellow-600">₹{earnings.pending.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">In Escrow</div>
                <div className="text-2xl font-bold text-blue-600">₹{earnings.escrow.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Released</div>
                <div className="text-2xl font-bold text-green-600">₹{earnings.released.toLocaleString()}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
              <div className="space-y-3">
                {earnings.transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{tx.brand}</div>
                      <div className="text-sm text-gray-600">{tx.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₹{tx.amount.toLocaleString()}</div>
                      <div className={`text-sm ${
                        tx.status === 'released' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Engagement Rate</div>
                <div className="text-3xl font-bold text-gray-900">{analyticsData.engagementRate}%</div>
                <div className="text-xs text-gray-500 mt-1">Average</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Completed Campaigns</div>
                <div className="text-3xl font-bold text-gray-900">{analyticsData.completedCampaigns}</div>
                <div className="text-xs text-gray-500 mt-1">Total</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Average Rating</div>
                <div className="text-3xl font-bold text-gray-900">{analyticsData.avgRating.toFixed(1)}</div>
                <div className="text-xs text-yellow-500 mt-1">{'★'.repeat(Math.round(analyticsData.avgRating))}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Followers Growth</h3>
              <div className="h-64 flex items-end justify-between gap-4">
                {analyticsData.followersGrowth.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-200 rounded-t" style={{ height: `${Math.max(data.count / 100, 5)}px` }} />
                    <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                      {data.date.slice(5)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}