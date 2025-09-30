import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { InfluencerDashboard } from './components/dashboard/InfluencerDashboard';
import { BrandDashboard } from './components/dashboard/BrandDashboard';
import { UserProvider } from './context/UserContext';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'onboarding' | 'influencer-dashboard' | 'brand-dashboard'>('landing');
  const [userType, setUserType] = useState<'influencer' | 'brand' | null>(null);

  const handleGetStarted = (type: 'influencer' | 'brand') => {
    setUserType(type);
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = () => {
    if (userType === 'influencer') {
      setCurrentView('influencer-dashboard');
    } else if (userType === 'brand') {
      setCurrentView('brand-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setUserType(null);
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'landing' && (
          <LandingPage onGetStarted={handleGetStarted} />
        )}

        {currentView === 'onboarding' && userType && (
          <OnboardingFlow
            userType={userType}
            onComplete={handleOnboardingComplete}
            onBack={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'influencer-dashboard' && (
          <InfluencerDashboard onLogout={handleLogout} />
        )}

        {currentView === 'brand-dashboard' && (
          <BrandDashboard onLogout={handleLogout} />
        )}
      </div>
    </UserProvider>
  );
}

export default App;