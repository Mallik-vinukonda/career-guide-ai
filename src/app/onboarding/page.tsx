'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaCheck, FaUpload } from 'react-icons/fa';

// Define the steps in the onboarding process - simplified for children
type OnboardingStep = 'about-me' | 'favorites' | 'school' | 'complete';

// Child-friendly interest options
const INTEREST_OPTIONS = [
  'Computers & Technology', 'Science & Experiments', 'Helping People', 'Art & Drawing', 
  'Building Things', 'Reading & Writing', 'Animals & Nature', 'Sports & Games',
  'Music & Dancing', 'Math & Puzzles', 'Cooking & Food', 'Other'
];

// Child-friendly skill options
const SKILL_OPTIONS = [
  'Solving Problems', 'Talking to People', 'Being Creative', 'Working with Computers',
  'Building and Making Things', 'Taking Care of Animals', 'Sports & Being Active',
  'Drawing & Art', 'Reading & Learning', 'Helping Others', 'Other'
];

// Child-friendly school subjects
const SUBJECT_OPTIONS = [
  'Math', 'Science', 'Reading', 'Art', 'Music', 'Physical Education',
  'Social Studies', 'Computer Class', 'Other'
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('about-me');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    interests: [] as string[],
    skills: [] as string[],
    favoriteSubjects: [] as string[],
    otherInterests: '',
    otherSkills: '',
    otherSubjects: '',
    schoolName: '',
    teacherName: '',
    favoriteActivity: ''
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects in the form data
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const updatedProfile = { ...prev };
        const parentKey = parent as keyof typeof prev;
        const parentObj = { ...updatedProfile[parentKey] as Record<string, any> };
        parentObj[child] = value;
        updatedProfile[parentKey] = parentObj as any;
        return updatedProfile;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle checkbox changes for multi-select options
  const handleCheckboxChange = (category: 'interests' | 'skills', value: string) => {
    setFormData(prev => {
      const currentValues = prev[category];
      
      if (Array.isArray(currentValues)) {
        const updatedProfile = { ...prev } as typeof prev;
        updatedProfile[category] = currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value];
        return updatedProfile;
      }
      
      return prev;
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We're not storing file uploads in this simplified version
    // If needed, you could add a resumeFile property to the formData state
    console.log('File selected:', e.target.files?.[0]?.name);
    // For demonstration purposes only - not actually storing the file
  };

  // Navigate to next step
  const handleNextStep = () => {
    switch (currentStep) {
      case 'about-me':
        setCurrentStep('favorites');
        break;
      case 'favorites':
        setCurrentStep('school');
        break;
      case 'school':
        setCurrentStep('complete');
        break;
      default:
        break;
    }
  };

  // Navigate to previous step
  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'favorites':
        setCurrentStep('about-me');
        break;
      case 'school':
        setCurrentStep('favorites');
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send the data to an API
    console.log('Form submitted:', formData);
    
    // Move to the completion step
    if (currentStep !== 'complete') {
      setCurrentStep('complete');
    }
  };

  // Determine if the current step is valid for navigation
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 'about-me':
        return formData.name.trim() !== '';
      case 'favorites':
        // Allow proceeding even if no interests/skills are selected
        return true;
      case 'school':
        // Allow proceeding even if no subjects are selected
        return true;
      default:
        return true;
    }
  };

  // Render the progress indicator
  const renderProgressIndicator = () => {
    const steps = ['about-me', 'favorites', 'school'];
    const currentIndex = steps.indexOf(currentStep);
    
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentIndex 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`h-1 w-12 ${
                  index < currentIndex 
                    ? 'bg-blue-600' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'about-me':
        return renderAboutMeStep();
      case 'favorites':
        return renderFavoritesStep();
      case 'school':
        return renderSchoolStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return <div>Unknown step</div>;
    }
  };

  // About Me step
  const renderAboutMeStep = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tell us about yourself</h2>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Grade
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            placeholder="Example: 5th Grade, 7th Grade"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    );
  };

  // Favorites step
  const renderFavoritesStep = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Favorites</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Favorite Subjects
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SUBJECT_OPTIONS.map(subject => (
              <div 
                key={subject}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-colors
                  ${formData.favoriteSubjects.includes(subject)
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400'
                    : 'bg-white border-gray-200 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500'
                  }
                `}
                onClick={() => handleCheckboxChange('favoriteSubjects', subject)}
              >
                <div className="flex items-center">
                  <div 
                    className={`
                      w-5 h-5 rounded-full mr-3 flex items-center justify-center
                      ${formData.favoriteSubjects.includes(subject)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                      }
                    `}
                  >
                    {formData.favoriteSubjects.includes(subject) && <FaCheck size={10} />}
                  </div>
                  <span className="text-gray-900 dark:text-white">{subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="otherSubjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Other Favorite Subjects
          </label>
          <input
            type="text"
            id="otherSubjects"
            name="otherSubjects"
            value={formData.otherSubjects}
            onChange={handleInputChange}
            placeholder="Enter any other subjects you enjoy"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    );
  };

  // School step
  const renderSchoolStep = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your School</h2>
        
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            School Name
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={formData.schoolName || ''}
            onChange={handleInputChange}
            placeholder="Enter your school name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Teacher's Name
          </label>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            value={formData.teacherName || ''}
            onChange={handleInputChange}
            placeholder="Enter your teacher's name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="favoriteActivity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Favorite School Activity
          </label>
          <input
            type="text"
            id="favoriteActivity"
            name="favoriteActivity"
            value={formData.favoriteActivity || ''}
            onChange={handleInputChange}
            placeholder="What do you enjoy doing at school?"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    );
  };

  // Complete step
  const renderCompleteStep = () => {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-green-600 dark:text-green-400" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Complete!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Thank you for sharing your information. Your profile has been created and our AI career guide is ready to provide personalized recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/chat"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 inline-flex items-center justify-center"
          >
            Start Chatting with Career Guide AI
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-medium rounded-lg transition duration-300 inline-flex items-center justify-center"
          >
            View Your Dashboard
          </Link>
        </div>
      </div>
    );
  };
  
  // No more commented-out code blocks - they've been removed to fix errors
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Create Your Profile</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main content */}
      <main className="py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {currentStep !== 'complete' && renderProgressIndicator()}
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              {renderStepContent()}
            </div>
            
            {currentStep !== 'complete' && (
              <div className="flex justify-between mt-6">
                {currentStep !== 'personal' ? (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div> // Empty div for spacing
                )}
                
                {currentStep !== 'goals' ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isCurrentStepValid()}
                    className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isCurrentStepValid()}
                    className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
                  >
                    Complete Profile
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
