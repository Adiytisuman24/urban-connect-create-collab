import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';

interface KYCStepProps {
  onNext: (data: any) => void;
}

export const KYCStep: React.FC<KYCStepProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    panNumber: '',
    aadhaarNumber: '',
    panDocument: null as File | null,
    aadhaarDocument: null as File | null,
    selfieDocument: null as File | null
  });
  const [errors, setErrors] = useState<any>({});
  const [isVerifying, setIsVerifying] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number';
    }

    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
    }

    if (!formData.panDocument) {
      newErrors.panDocument = 'PAN document is required';
    }

    if (!formData.aadhaarDocument) {
      newErrors.aadhaarDocument = 'Aadhaar document is required';
    }

    if (!formData.selfieDocument) {
      newErrors.selfieDocument = 'Selfie verification is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsVerifying(true);
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        onNext(formData);
      }, 3000);
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData({ ...formData, [field]: file });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (isVerifying) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Verifying Your Documents</h3>
        <p className="text-gray-600">This may take a few moments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification</h2>
        <p className="text-gray-600">
          We need to verify your identity to ensure platform security
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* PAN Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            PAN Card Details
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
            <input
              type="text"
              value={formData.panNumber}
              onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.panNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
            {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload PAN Card</label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
              formData.panDocument ? 'border-green-300 bg-green-50' : 
              errors.panDocument ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('panDocument', e.target.files[0])}
                className="hidden"
                id="pan-upload"
              />
              <label htmlFor="pan-upload" className="cursor-pointer">
                {formData.panDocument ? (
                  <div className="text-green-600">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{formData.panDocument.name}</p>
                    <p className="text-sm">Click to change</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">Upload PAN Card</p>
                    <p className="text-sm">PNG, JPG or PDF (Max 5MB)</p>
                  </div>
                )}
              </label>
            </div>
            {errors.panDocument && <p className="text-red-500 text-sm mt-1">{errors.panDocument}</p>}
          </div>
        </div>

        {/* Aadhaar Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Aadhaar Card Details
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
            <input
              type="text"
              value={formData.aadhaarNumber}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123456789012"
              maxLength={12}
            />
            {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Aadhaar Card</label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
              formData.aadhaarDocument ? 'border-green-300 bg-green-50' : 
              errors.aadhaarDocument ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarDocument', e.target.files[0])}
                className="hidden"
                id="aadhaar-upload"
              />
              <label htmlFor="aadhaar-upload" className="cursor-pointer">
                {formData.aadhaarDocument ? (
                  <div className="text-green-600">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{formData.aadhaarDocument.name}</p>
                    <p className="text-sm">Click to change</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">Upload Aadhaar Card</p>
                    <p className="text-sm">PNG, JPG or PDF (Max 5MB)</p>
                  </div>
                )}
              </label>
            </div>
            {errors.aadhaarDocument && <p className="text-red-500 text-sm mt-1">{errors.aadhaarDocument}</p>}
          </div>
        </div>

        {/* Selfie Verification */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Camera className="w-5 h-5 text-blue-500 mr-2" />
            Selfie Verification
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Selfie</label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
              formData.selfieDocument ? 'border-green-300 bg-green-50' : 
              errors.selfieDocument ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('selfieDocument', e.target.files[0])}
                className="hidden"
                id="selfie-upload"
              />
              <label htmlFor="selfie-upload" className="cursor-pointer">
                {formData.selfieDocument ? (
                  <div className="text-green-600">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{formData.selfieDocument.name}</p>
                    <p className="text-sm">Click to change</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">Take or Upload Selfie</p>
                    <p className="text-sm">Clear face photo for verification</p>
                  </div>
                )}
              </label>
            </div>
            {errors.selfieDocument && <p className="text-red-500 text-sm mt-1">{errors.selfieDocument}</p>}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Selfie Guidelines:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensure your face is clearly visible</li>
                  <li>Take photo in good lighting</li>
                  <li>Look directly at the camera</li>
                  <li>Remove any accessories covering your face</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Verify Documents
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Your documents will be verified within 24-48 hours
          </p>
        </div>
      </form>
    </div>
  );
};