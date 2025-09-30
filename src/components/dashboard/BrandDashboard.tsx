import React, { useState } from 'react';
import {
  Building,
  Search,
  Briefcase,
  FileText,
  CreditCard,
  TrendingUp,
  LogOut,
  Plus,
  CheckCircle,
  Clock,
  Filter,
  Mail,
  Star,
  DollarSign
} from 'lucide-react';

interface BrandDashboardProps {
  onLogout: () => void;
}

export function BrandDashboard({ onLogout }: BrandDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'campaigns' | 'contracts' | 'payments' | 'analytics'>('overview');
  const [searchFilters, setSearchFilters] = useState({
    niche: '',
    minFollowers: '',
    maxFollowers: '',
    region: '',
    language: '',
  });

  const brandProfile = {
    companyName: 'Brand Company',
    logo: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Leading brand in lifestyle products',
    industry: 'Fashion & Lifestyle',
    kycStatus: 'verified',
    subscriptionStatus: 'active',
    subscriptionPlan: 'annual',
    subscriptionEndDate: '2026-09-30',
  };

  const discoveredInfluencers = [
    {
      id: 1,
      name: 'Fashion Influencer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: 50000,
      engagementRate: 4.5,
      niches: ['Fashion', 'Lifestyle'],
      region: 'Mumbai',
      language: 'English, Hindi',
    },
    {
      id: 2,
      name: 'Tech Reviewer',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: 75000,
      engagementRate: 5.2,
      niches: ['Technology', 'Gaming'],
      region: 'Bangalore',
      language: 'English',
    },
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Summer Collection Launch',
      status: 'active',
      budget: 500000,
      applicants: 15,
      shortlisted: 3,
      startDate: '2025-10-01',
      endDate: '2025-10-31',
    },
    {
      id: 2,
      title: 'Product Review Campaign',
      status: 'paused',
      budget: 200000,
      applicants: 8,
      shortlisted: 1,
      startDate: '2025-09-15',
      endDate: '2025-09-30',
    },
  ];

  const contracts = [
    {
      id: 1,
      influencer: 'Fashion Influencer',
      type: 'deal',
      status: 'in_progress',
      amount: 50000,
      deliverables: '3 Instagram posts + 2 Stories',
      deadline: '2025-10-15',
    },
    {
      id: 2,
      influencer: 'Tech Reviewer',
      type: 'information_request',
      status: 'accepted',
      contactInfo: { email: 'influencer@example.com', phone: '+91 98765 43210' },
    },
    {
      id: 3,
      influencer: 'Lifestyle Creator',
      type: 'deal',
      status: 'completed',
      amount: 35000,
      rating: 5,
      deliverables: 'YouTube video review',
    },
  ];

  const payments = {
    escrowBalance: 150000,
    totalSpent: 500000,
    pendingPayouts: 85000,
    transactions: [
      { id: 1, type: 'escrow_deposit', amount: 50000, influencer: 'Fashion Influencer', date: '2025-09-25', status: 'completed' },
      { id: 2, type: 'platform_fee', amount: 1250, date: '2025-09-25', status: 'completed' },
      { id: 3, type: 'subscription', amount: 99000, date: '2025-09-01', status: 'completed' },
    ],
  };

  const analytics = {
    totalCampaigns: 12,
    activeCampaigns: 1,
    completedCampaigns: 8,
    totalReach: 2500000,
    avgEngagement: 4.8,
    roi: 3.5,
    topInfluencers: [
      { name: 'Lifestyle Creator', campaigns: 3, avgRating: 5.0 },
      { name: 'Fashion Influencer', campaigns: 2, avgRating: 4.8 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Brand Dashboard</h1>
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
              { id: 'overview', label: 'Overview', icon: Building },
              { id: 'discovery', label: 'Discovery', icon: Search },
              { id: 'campaigns', label: 'Campaigns', icon: Briefcase },
              { id: 'contracts', label: 'Contracts', icon: FileText },
              { id: 'payments', label: 'Payments', icon: CreditCard },
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
            {/* Brand Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-6">
                <img
                  src={brandProfile.logo}
                  alt="Brand Logo"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{brandProfile.companyName}</h2>
                    {brandProfile.kycStatus === 'verified' && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{brandProfile.description}</p>
                  <p className="text-sm text-gray-600">Industry: {brandProfile.industry}</p>
                </div>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Subscription Status</h3>
                  <p className="text-blue-100">
                    {brandProfile.subscriptionPlan.charAt(0).toUpperCase() + brandProfile.subscriptionPlan.slice(1)} Plan
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">Renews on</div>
                  <div className="text-lg font-semibold">{brandProfile.subscriptionEndDate}</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Active Campaigns</div>
                <div className="text-3xl font-bold text-gray-900">{analytics.activeCampaigns}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Reach</div>
                <div className="text-3xl font-bold text-gray-900">{(analytics.totalReach / 1000000).toFixed(1)}M</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Avg. Engagement</div>
                <div className="text-3xl font-bold text-gray-900">{analytics.avgEngagement}%</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Escrow Balance</div>
                <div className="text-3xl font-bold text-gray-900">₹{(payments.escrowBalance / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Discover Influencers</h2>
            </div>

            {/* Search Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Search Filters</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Niche"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.niche}
                  onChange={(e) => setSearchFilters({ ...searchFilters, niche: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Min Followers"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.minFollowers}
                  onChange={(e) => setSearchFilters({ ...searchFilters, minFollowers: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Max Followers"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.maxFollowers}
                  onChange={(e) => setSearchFilters({ ...searchFilters, maxFollowers: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Region"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.region}
                  onChange={(e) => setSearchFilters({ ...searchFilters, region: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Language"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.language}
                  onChange={(e) => setSearchFilters({ ...searchFilters, language: e.target.value })}
                />
              </div>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>

            {/* Influencer Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {discoveredInfluencers.map((influencer) => (
                <div key={influencer.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={influencer.image}
                      alt={influencer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
                      <div className="text-sm text-gray-600">
                        {influencer.followers.toLocaleString()} followers
                      </div>
                      <div className="text-sm text-gray-600">
                        {influencer.engagementRate}% engagement
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {influencer.niches.map((niche) => (
                      <span key={niche} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {niche}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <div>📍 {influencer.region}</div>
                    <div>🗣️ {influencer.language}</div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      Request Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                Create Campaign
              </button>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                      <p className="text-sm text-gray-600">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Budget</div>
                      <div className="text-lg font-semibold text-gray-900">₹{campaign.budget.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Applicants</div>
                      <div className="text-lg font-semibold text-gray-900">{campaign.applicants}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Shortlisted</div>
                      <div className="text-lg font-semibold text-gray-900">{campaign.shortlisted}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Applications
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Edit Campaign
                    </button>
                  </div>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{contract.influencer}</h3>
                      <p className="text-sm text-gray-600 capitalize">{contract.type.replace('_', ' ')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      contract.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      contract.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contract.status.replace('_', ' ')}
                    </span>
                  </div>
                  {contract.type === 'deal' && (
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-semibold text-gray-900">₹{contract.amount?.toLocaleString()}</span>
                      </div>
                      {contract.deliverables && (
                        <div className="flex justify-between">
                          <span>Deliverables:</span>
                          <span className="text-gray-900">{contract.deliverables}</span>
                        </div>
                      )}
                      {contract.deadline && (
                        <div className="flex justify-between">
                          <span>Deadline:</span>
                          <span className="text-gray-900">{contract.deadline}</span>
                        </div>
                      )}
                      {contract.rating && (
                        <div className="flex justify-between items-center mt-3 pt-3 border-t">
                          <span>Your Rating:</span>
                          <span className="text-yellow-500 text-lg">{'★'.repeat(contract.rating)}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {contract.type === 'information_request' && contract.contactInfo && (
                    <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <span>{contract.contactInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">📞</span>
                        <span>{contract.contactInfo.phone}</span>
                      </div>
                    </div>
                  )}
                  {contract.status === 'completed' && !contract.rating && (
                    <button className="mt-4 w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                      Rate Influencer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Payments & Billing</h2>

            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Escrow Balance</div>
                <div className="text-3xl font-bold text-blue-600">₹{payments.escrowBalance.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Held for active contracts</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Pending Payouts</div>
                <div className="text-3xl font-bold text-yellow-600">₹{payments.pendingPayouts.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Awaiting completion</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Spent</div>
                <div className="text-3xl font-bold text-gray-900">₹{payments.totalSpent.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">All time</div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
              <div className="space-y-3">
                {payments.transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 capitalize">{tx.type.replace('_', ' ')}</div>
                      <div className="text-sm text-gray-600">
                        {tx.influencer || 'System'} • {tx.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₹{tx.amount.toLocaleString()}</div>
                      <div className="text-sm text-green-600">{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>

            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Campaigns</div>
                <div className="text-3xl font-bold text-gray-900">{analytics.totalCampaigns}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Completed</div>
                <div className="text-3xl font-bold text-green-600">{analytics.completedCampaigns}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Total Reach</div>
                <div className="text-3xl font-bold text-blue-600">{(analytics.totalReach / 1000000).toFixed(1)}M</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-sm text-gray-600 mb-1">Average ROI</div>
                <div className="text-3xl font-bold text-green-600">{analytics.roi}x</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Average Engagement Rate</div>
                  <div className="text-2xl font-bold text-gray-900">{analytics.avgEngagement}%</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(analytics.avgEngagement / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Return on Investment</div>
                  <div className="text-2xl font-bold text-gray-900">{analytics.roi}x</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${(analytics.roi / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Influencers */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Influencers</h3>
              <div className="space-y-3">
                {analytics.topInfluencers.map((influencer, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{influencer.name}</div>
                      <div className="text-sm text-gray-600">{influencer.campaigns} campaigns completed</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">{influencer.avgRating.toFixed(1)}</span>
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