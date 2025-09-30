import React, { useState } from 'react';
import { SignUpStep } from './steps/SignUpStep';
import { KYCStep } from './steps/KYCStep';
import { SocialConnectionStep } from './steps/SocialConnectionStep';
import { ProfileCreationStep } from './steps/ProfileCreationStep';
import { BusinessKYCStep } from './steps/BusinessKYCStep';
import { SubscriptionStep } from './steps/SubscriptionStep';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface OnboardingFlowProps {
  userType: 'influencer' | 'brand';
  onComplete: () => void;
  onBack: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userType, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const influencerSteps = [
    { id: 1, title: 'Sign Up', description: 'Email & Phone verification' },
    { id: 2, title: 'KYC Verification', description: 'PAN/Aadhaar + Selfie' },
    { id: 3, title: 'Connect Socials', description: 'Link social accounts' },
    { id: 4, title: 'Create Profile', description: 'Portfolio & Bio' }
  ];

  const brandSteps = [
    { id: 1, title: 'Sign Up', description: 'Email & Phone verification' },
    { id: 2, title: 'Business KYC', description: 'Company verification' },
    { id: 3, title: 'Subscription', description: 'Choose plan & payment' }
  ];

  const steps = userType === 'influencer' ? influencerSteps : brandSteps;
  const totalSteps = steps.length;

  const handleNext = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    
    if (currentStep === totalSteps) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    if (userType === 'influencer') {
      switch (currentStep) {
        case 1:
          return <SignUpStep userType={userType} onNext={handleNext} />;
        case 2:
          return <KYCStep onNext={handleNext} />;
        case 3:
          return <SocialConnectionStep onNext={handleNext} />;
        case 4:
          return <ProfileCreationStep onNext={handleNext} />;
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <SignUpStep userType={userType} onNext={handleNext} />;
        case 2:
          return <BusinessKYCStep onNext={handleNext} />;
        case 3:
          return <SubscriptionStep onNext={handleNext} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handlePrevious}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userType === 'influencer' ? 'Creator' : 'Brand'} Onboarding
            </h1>
            <p className="text-gray-600 mt-1">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index + 1 < currentStep 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : index + 1 === currentStep
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {index + 1 < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-4 ${
                    index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center">
                <h3 className={`font-semibold ${
                  index + 1 <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${
                  index + 1 <= currentStep ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};