import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InfluencerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  profileImage: string;
  socialAccounts: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  stats: {
    followers: number;
    engagement: number;
    reach: number;
  };
  profileCompletion: number;
  tags: string[];
  sampleWorks: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    description: string;
  }>;
  earnings: {
    total: number;
    pending: number;
    released: number;
    escrow: number;
  };
  campaigns: Array<{
    id: string;
    title: string;
    brand: string;
    status: 'applied' | 'in-review' | 'accepted' | 'rejected' | 'completed';
    amount: number;
    type: 'payment' | 'barter';
  }>;
}

interface BrandProfile {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  logo: string;
  description: string;
  gst: string;
  pan: string;
  subscription: {
    plan: 'monthly' | 'annual';
    status: 'active' | 'expired';
    renewalDate: string;
  };
  campaigns: Array<{
    id: string;
    title: string;
    budget: number;
    niche: string;
    deliverables: string;
    type: 'payment' | 'barter';
    applications: number;
    status: 'active' | 'completed' | 'paused';
  }>;
  escrowBalance: number;
}

interface UserContextType {
  userType: 'influencer' | 'brand' | null;
  influencerProfile: InfluencerProfile | null;
  brandProfile: BrandProfile | null;
  setUserType: (type: 'influencer' | 'brand' | null) => void;
  setInfluencerProfile: (profile: InfluencerProfile | null) => void;
  setBrandProfile: (profile: BrandProfile | null) => void;
  updateInfluencerProfile: (updates: Partial<InfluencerProfile>) => void;
  updateBrandProfile: (updates: Partial<BrandProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<'influencer' | 'brand' | null>(null);
  const [influencerProfile, setInfluencerProfile] = useState<InfluencerProfile | null>(null);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);

  const updateInfluencerProfile = (updates: Partial<InfluencerProfile>) => {
    setInfluencerProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  const updateBrandProfile = (updates: Partial<BrandProfile>) => {
    setBrandProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <UserContext.Provider value={{
      userType,
      influencerProfile,
      brandProfile,
      setUserType,
      setInfluencerProfile,
      setBrandProfile,
      updateInfluencerProfile,
      updateBrandProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};