import React, { useState } from 'react';
import { Check, Star, CreditCard } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

interface SubscriptionStepProps {
  onNext: (data: any) => void;
}

export const SubscriptionStep: React.FC<SubscriptionStepProps> = ({ onNext }) => {
  const { setBrandProfile } = useUser();
  
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    upiId: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: 2999,
      originalPrice: 3999,
      description: 'Perfect for testing the waters',
      features: [
        'Unlimited influencer discovery',
        'Up to 10 active campaigns',
        'Basic analytics & reporting',
        'Email support',
        'Campaign management tools',
        'Secure payment processing'
      ]
    },
    annual: {
      name: 'Annual Plan',
      price: 29999,
      originalPrice: 47999,
      description: 'Best value for serious brands',
      features: [
        'Everything in Monthly Plan',
        'Unlimited active campaigns',
        'Advanced analytics & insights',
        'Priority phone support',
        'Dedicated account manager',
        'Custom campaign templates',
        'Bulk operations',
        'API access'
      ]
    }
  };

  const validatePayment = () => {
    const newErrors: any = {};

    if (!selectedPlan) {
      newErrors.plan = 'Please select a subscription plan';
      setErrors(newErrors);
      return false;
    }

    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!paymentDetails.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
        newErrors.expiryDate = 'Please enter expiry in MM/YY format';
      }

      if (!paymentDetails.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!paymentDetails.holderName.trim()) {
        newErrors.holderName = 'Cardholder name is required';
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/@/.test(paymentDetails.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create brand profile with subscription details
      const profile = {
        id: Date.now().toString(),
        companyName: 'New Brand', // This should come from previous steps
        email: 'brand@example.com',
        phone: '9876543210',
        industry: 'Technology',
        logo: '',
        description: '',
        gst: '',
        pan: '',
        subscription: {
          plan: selectedPlan!,
          status: 'active' as const,
          renewalDate: new Date(Date.now() + (selectedPlan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
        },
        campaigns: [],
        escrowBalance: 0 // Starting from 0 as requested
      };

      setBrandProfile(profile);
      setIsProcessing(false);
      onNext({ selectedPlan, paymentMethod, paymentDetails });
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
        <p className="text-gray-600">Please wait while we process your subscription...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Subscription</h2>
        <p className="text-gray-600">
          Select the plan that best fits your brand's needs
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            className={`relative bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all ${
              selectedPlan === key
                ? 'border-blue-500 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            } ${key === 'annual' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : ''}`}
            onClick={() => setSelectedPlan(key as 'monthly' | 'annual')}
          >
            {key === 'annual' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">₹{plan.price.toLocaleString()}</span>
                <span className="text-gray-500">/{key === 'monthly' ? 'month' : 'year'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-gray-500 line-through">₹{plan.originalPrice.toLocaleString()}</span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  Save {Math.round((1 - plan.price / plan.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                selectedPlan === key
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedPlan === key && (
                  <Check className="w-3 h-3 text-white mx-auto mt-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {errors.plan && (
        <div className="text-center mb-6">
          <p className="text-red-500">{errors.plan}</p>
        </div>
      )}

      {selectedPlan && (
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
            Payment Details
          </h3>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'card', label: 'Card', icon: '💳' },
                { key: 'upi', label: 'UPI', icon: '📱' },
                { key: 'netbanking', label: 'Net Banking', icon: '🏦' }
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPaymentMethod(key as typeof paymentMethod)}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    paymentMethod === key
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentDetails.holderName}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, holderName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.holderName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.holderName && <p className="text-red-500 text-sm mt-1">{errors.holderName}</p>}
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
              <input
                type="text"
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.upiId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="yourname@paytm"
              />
              {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="text-center py-8">
              <p className="text-gray-600">You will be redirected to your bank's website to complete the payment</p>
            </div>
          )}

          {/* Order Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">{plans[selectedPlan].name}</span>
              <span className="text-gray-900">₹{plans[selectedPlan].price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
              <span>Total</span>
              <span>₹{plans[selectedPlan].price.toLocaleString()}</span>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Complete Subscription
          </button>
        </div>
      )}
    </div>
  );
};