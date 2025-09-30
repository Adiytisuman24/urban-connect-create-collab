import React, { useState } from 'react';
import { Upload, X, Plus, Camera } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

interface ProfileCreationStepProps {
  onNext: (data: any) => void;
}

export const ProfileCreationStep: React.FC<ProfileCreationStepProps> = ({ onNext }) => {
  const { setInfluencerProfile } = useUser();
  
  const [formData, setFormData] = useState({
    profileImage: null as File | null,
    bio: '',
    tags: [] as string[],
    sampleWorks: [] as Array<{ file: File; type: 'image' | 'video'; description: string }>
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<any>({});

  const popularTags = [
    'Fitness', 'Gaming', 'Beauty', 'Lifestyle', 'Fashion', 'Food', 'Travel',
    'Technology', 'Health', 'Music', 'Comedy', 'Education', 'Business',
    'Parenting', 'DIY', 'Sports', 'Photography', 'Art', 'Books', 'Movies'
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 50) {
      newErrors.bio = 'Bio should be at least 50 characters';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'Please select at least one tag';
    }

    if (formData.sampleWorks.length < 2) {
      newErrors.sampleWorks = 'Please upload at least 2 sample works';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create the initial influencer profile with all values starting from 0
      const profile = {
        id: Date.now().toString(),
        name: 'New Creator', // This should come from signup step
        email: 'creator@example.com', // This should come from signup step
        phone: '9876543210', // This should come from signup step
        bio: formData.bio,
        profileImage: formData.profileImage ? URL.createObjectURL(formData.profileImage) : '',
        socialAccounts: {
          instagram: '',
          youtube: '',
          twitter: ''
        },
        stats: {
          followers: 0, // Starting from 0 as requested
          engagement: 0, // Starting from 0 as requested
          reach: 0 // Starting from 0 as requested
        },
        profileCompletion: 85, // High completion after onboarding
        tags: formData.tags,
        sampleWorks: formData.sampleWorks.map((work, index) => ({
          id: (index + 1).toString(),
          type: work.type,
          url: URL.createObjectURL(work.file),
          description: work.description
        })),
        earnings: {
          total: 0, // Starting from ₹0 as requested
          pending: 0, // Starting from ₹0 as requested
          released: 0, // Starting from ₹0 as requested
          escrow: 0 // Starting from ₹0 as requested
        },
        campaigns: [] // Empty array to start with
      };

      setInfluencerProfile(profile);
      onNext(formData);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleFileUpload = (file: File) => {
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    setFormData({
      ...formData,
      sampleWorks: [...formData.sampleWorks, { file, type, description: '' }]
    });
  };

  const updateSampleWorkDescription = (index: number, description: string) => {
    const updatedWorks = [...formData.sampleWorks];
    updatedWorks[index].description = description;
    setFormData({ ...formData, sampleWorks: updatedWorks });
  };

  const removeSampleWork = (index: number) => {
    setFormData({
      ...formData,
      sampleWorks: formData.sampleWorks.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
        <p className="text-gray-600">
          Showcase your work and tell brands what makes you unique
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Image */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera className="w-4 h-4" />
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && setFormData({ ...formData, profileImage: e.target.files[0] })}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Upload your profile picture</p>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Tell brands about yourself, your content style, and what makes you unique..."
            maxLength={500}
          />
          <div className="flex justify-between text-sm mt-1">
            {errors.bio && <p className="text-red-500">{errors.bio}</p>}
            <p className="text-gray-500 ml-auto">{formData.bio.length}/500</p>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Categories <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add custom tag"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(currentTag);
                }
              }}
            />
            <button
              type="button"
              onClick={() => addTag(currentTag)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-3">Or select from popular tags:</p>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm border"
                disabled={formData.tags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-sm mt-2">{errors.tags}</p>}
        </div>

        {/* Sample Works */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sample Works <span className="text-red-500">*</span> (2-3 samples)
          </label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {formData.sampleWorks.map((work, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="relative mb-3">
                  {work.type === 'image' ? (
                    <img
                      src={URL.createObjectURL(work.file)}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(work.file)}
                      className="w-full h-32 object-cover rounded"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeSampleWork(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Brief description..."
                  value={work.description}
                  onChange={(e) => updateSampleWorkDescription(index, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}

            {formData.sampleWorks.length < 3 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="sample-upload"
                />
                <label htmlFor="sample-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload sample work</p>
                  <p className="text-xs text-gray-400">Image or Video (Max 10MB)</p>
                </label>
              </div>
            )}
          </div>
          {errors.sampleWorks && <p className="text-red-500 text-sm">{errors.sampleWorks}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Complete Profile Setup
          </button>
        </div>
      </form>
    </div>
  );
};