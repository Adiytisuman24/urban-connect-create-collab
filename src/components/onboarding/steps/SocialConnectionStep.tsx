import React, { useState } from 'react';
import { Instagram, Youtube, Twitter, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface SocialConnectionStepProps {
  onNext: (data: any) => void;
}

export const SocialConnectionStep: React.FC<SocialConnectionStepProps> = ({ onNext }) => {
  const [socialAccounts, setSocialAccounts] = useState({
    instagram: { username: '', connected: false, stats: { followers: 0, engagement: 0 } },
    youtube: { username: '', connected: false, stats: { subscribers: 0, views: 0 } },
    twitter: { username: '', connected: false, stats: { followers: 0, engagement: 0 } }
  });

  const [manualEntry, setManualEntry] = useState({
    totalFollowers: 0,
    avgEngagement: 0,
    avgReach: 0
  });

  const [useManualEntry, setUseManualEntry] = useState(false);

  const handleConnectAccount = (platform: string, username: string) => {
    // Simulate API connection and fetch stats (all starting from 0)
    setSocialAccounts(prev => ({
      ...prev,
      [platform]: {
        username,
        connected: true,
        stats: platform === 'youtube' 
          ? { subscribers: 0, views: 0 }
          : { followers: 0, engagement: 0 }
      }
    }));
  };

  const handleSubmit = () => {
    const data = {
      socialAccounts,
      manualEntry: useManualEntry ? manualEntry : null,
      totalStats: {
        followers: useManualEntry ? manualEntry.totalFollowers : 
          socialAccounts.instagram.stats.followers + 
          socialAccounts.youtube.stats.subscribers + 
          socialAccounts.twitter.stats.followers,
        engagement: useManualEntry ? manualEntry.avgEngagement : 0,
        reach: useManualEntry ? manualEntry.avgReach : 0
      }
    };
    onNext(data);
  };

  const socialPlatforms = [
    {
      name: 'Instagram',
      key: 'instagram',
      icon: Instagram,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      placeholder: '@username'
    },
    {
      name: 'YouTube',
      key: 'youtube',
      icon: Youtube,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      placeholder: 'Channel name or @handle'
    },
    {
      name: 'Twitter',
      key: 'twitter',
      icon: Twitter,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      placeholder: '@username'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Social Accounts</h2>
        <p className="text-gray-600">
          Link your social profiles to automatically pull your stats, or enter them manually if APIs are limited
        </p>
      </div>

      {!useManualEntry ? (
        <div className="space-y-6">
          <div className="grid md:grid-cols-1 gap-6">
            {socialPlatforms.map((platform) => {
              const PlatformIcon = platform.icon;
              const account = socialAccounts[platform.key as keyof typeof socialAccounts];
              
              return (
                <div key={platform.key} className={`${platform.bgColor} p-6 rounded-lg border`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <PlatformIcon className={`w-8 h-8 ${platform.color} mr-3`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                        <p className="text-gray-600 text-sm">Connect to pull your stats automatically</p>
                      </div>
                    </div>
                    {account.connected && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>

                  {!account.connected ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder={platform.placeholder}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleConnectAccount(platform.key, e.currentTarget.value);
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          if (input.value) {
                            handleConnectAccount(platform.key, input.value);
                          }
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Connect
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-gray-900">@{account.username}</p>
                        <button
                          onClick={() => setSocialAccounts(prev => ({
                            ...prev,
                            [platform.key]: { username: '', connected: false, stats: platform.key === 'youtube' ? { subscribers: 0, views: 0 } : { followers: 0, engagement: 0 } }
                          }))}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Disconnect
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {platform.key === 'youtube' ? (
                          <>
                            <div>
                              <p className="text-gray-600">Subscribers</p>
                              <p className="font-semibold">0</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Total Views</p>
                              <p className="font-semibold">0</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <p className="text-gray-600">Followers</p>
                              <p className="font-semibold">0</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Avg. Engagement</p>
                              <p className="font-semibold">0%</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px bg-gray-300" />
              <span className="absolute px-3 font-medium text-gray-500 bg-gray-50">or</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setUseManualEntry(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Enter stats manually instead
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Manual Entry Mode</p>
                <p>Enter your combined social media statistics. You can update these later from your dashboard.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Followers</label>
              <input
                type="number"
                value={manualEntry.totalFollowers}
                onChange={(e) => setManualEntry({...manualEntry, totalFollowers: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Combined followers across all platforms</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Engagement Rate (%)</label>
              <input
                type="number"
                value={manualEntry.avgEngagement}
                onChange={(e) => setManualEntry({...manualEntry, avgEngagement: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Average engagement rate across your posts</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Reach</label>
              <input
                type="number"
                value={manualEntry.avgReach}
                onChange={(e) => setManualEntry({...manualEntry, avgReach: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Average reach of your posts</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setUseManualEntry(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to social connection
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Continue to Profile Creation
        </button>
      </div>
    </div>
  );
};