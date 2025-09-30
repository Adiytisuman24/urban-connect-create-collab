import React, { useState } from 'react';
import { Upload, CheckCircle, Building, FileText, CreditCard } from 'lucide-react';

interface BusinessKYCStepProps {
  onNext: (data: any) => void;
}

export const BusinessKYCStep: React.FC<BusinessKYCStepProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    gstNumber: '',
    panNumber: '',
    registeredAddress: '',
    directorName: '',
    directorPan: '',
    gstDocument: null as File | null,
    panDocument: null as File | null,
    addressProof: null as File | null,
    directorIdProof: null as File | null
  });
  const [errors, setErrors] = useState<any>({});
  const [isVerifying, setIsVerifying] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.gstNumber) {
      newErrors.gstNumber = 'GST number is required';
    } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Please enter a valid GST number';
    }

    if (!formData.panNumber) {
      newErrors.panNumber = 'Company PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number';
    }

    if (!formData.registeredAddress.trim()) {
      newErrors.registeredAddress = 'Registered address is required';
    }

    if (!formData.directorName.trim()) {
      newErrors.directorName = 'Director name is required';
    }

    if (!formData.directorPan) {
      newErrors.directorPan = 'Director PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.directorPan)) {
      newErrors.directorPan = 'Please enter a valid PAN number';
    }

    if (!formData.gstDocument) {
      newErrors.gstDocument = 'GST certificate is required';
    }

    if (!formData.panDocument) {
      newErrors.panDocument = 'Company PAN document is required';
    }

    if (!formData.addressProof) {
      newErrors.addressProof = 'Address proof is required';
    }

    if (!formData.directorIdProof) {
      newErrors.directorIdProof = 'Director ID proof is required';
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Verifying Business Documents</h3>
        <p className="text-gray-600">This may take a few moments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business KYC Verification</h2>
        <p className="text-gray-600">
          Complete business verification to access the platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-5 h-5 text-blue-500 mr-2" />
            Company Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter company name"
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.gstNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
              />
              {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company PAN</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Registered Address</label>
              <textarea
                value={formData.registeredAddress}
                onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.registeredAddress ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter complete registered address"
                rows={3}
              />
              {errors.registeredAddress && <p className="text-red-500 text-sm mt-1">{errors.registeredAddress}</p>}
            </div>
          </div>
        </div>

        {/* Director Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 text-green-500 mr-2" />
            Director Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Director Name</label>
              <input
                type="text"
                value={formData.directorName}
                onChange={(e) => handleInputChange('directorName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.directorName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter director's full name"
              />
              {errors.directorName && <p className="text-red-500 text-sm mt-1">{errors.directorName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Director PAN</label>
              <input
                type="text"
                value={formData.directorPan}
                onChange={(e) => handleInputChange('directorPan', e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.directorPan ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ABCDE1234F"
                maxLength={10}
              />
              {errors.directorPan && <p className="text-red-500 text-sm mt-1">{errors.directorPan}</p>}
            </div>
          </div>
        </div>

        {/* Document Uploads */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 text-purple-500 mr-2" />
            Document Uploads
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { key: 'gstDocument', label: 'GST Certificate', id: 'gst-upload' },
              { key: 'panDocument', label: 'Company PAN Card', id: 'pan-upload' },
              { key: 'addressProof', label: 'Address Proof', id: 'address-upload' },
              { key: 'directorIdProof', label: 'Director ID Proof', id: 'director-upload' }
            ].map(({ key, label, id }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  formData[key as keyof typeof formData] ? 'border-green-300 bg-green-50' : 
                  errors[key] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(key, e.target.files[0])}
                    className="hidden"
                    id={id}
                  />
                  <label htmlFor={id} className="cursor-pointer">
                    {formData[key as keyof typeof formData] ? (
                      <div className="text-green-600">
                        <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                        <p className="font-medium text-sm">
                          {(formData[key as keyof typeof formData] as File)?.name}
                        </p>
                        <p className="text-xs">Click to change</p>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <Upload className="w-6 h-6 mx-auto mb-2" />
                        <p className="font-medium text-sm">Upload {label}</p>
                        <p className="text-xs">PNG, JPG or PDF (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Verify Business Documents
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Business verification typically takes 2-3 business days
          </p>
        </div>
      </form>
    </div>
  );
};