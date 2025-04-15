'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the user profile interface
export interface UserProfile {
  name: string;
  email: string;
  age: string;
  location: string;
  interests: string[];
  skills: string[];
  education: {
    level: string;
    field: string;
    institution: string;
    graduationYear: string;
  };
  goals: {
    shortTerm: string;
    longTerm: string;
    preferredWorkEnvironment: string;
    salaryExpectations: string;
  };
  resumeFile: File | null;
  profileComplete: boolean;
}

// Create an empty default profile
const defaultProfile: UserProfile = {
  name: '',
  email: '',
  age: '',
  location: '',
  interests: [],
  skills: [],
  education: {
    level: '',
    field: '',
    institution: '',
    graduationYear: ''
  },
  goals: {
    shortTerm: '',
    longTerm: '',
    preferredWorkEnvironment: '',
    salaryExpectations: ''
  },
  resumeFile: null,
  profileComplete: false
};

// Define the context interface
interface UserProfileContextType {
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearProfile: () => void;
  isProfileComplete: boolean;
}

// Create the context
const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

// Provider component
export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);

  // Load profile from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        // We can't store File objects in localStorage, so resumeFile will be null
        setUserProfile(parsedProfile);
        
        // Check if profile is complete
        checkProfileCompletion(parsedProfile);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, []);

  // Check if the profile has enough information to be considered complete
  const checkProfileCompletion = (profile: UserProfile) => {
    const isComplete = !!(
      profile.name &&
      profile.email &&
      profile.interests.length > 0 &&
      profile.skills.length > 0 &&
      profile.education.level
    );
    
    setIsProfileComplete(isComplete);
    
    // Also update the profileComplete field in the profile itself
    if (isComplete !== profile.profileComplete) {
      setUserProfile(prev => ({
        ...prev,
        profileComplete: isComplete
      }));
    }
    
    return isComplete;
  };

  // Update profile function
  const updateProfile = (newProfileData: Partial<UserProfile>) => {
    setUserProfile(prevProfile => {
      const updatedProfile = {
        ...prevProfile,
        ...newProfileData
      };
      
      // Save to localStorage (without the File object)
      const profileForStorage = { ...updatedProfile };
      delete (profileForStorage as any).resumeFile;
      localStorage.setItem('userProfile', JSON.stringify(profileForStorage));
      
      // Check if profile is now complete
      checkProfileCompletion(updatedProfile);
      
      return updatedProfile;
    });
  };

  // Clear profile function
  const clearProfile = () => {
    setUserProfile(defaultProfile);
    setIsProfileComplete(false);
    localStorage.removeItem('userProfile');
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateProfile, clearProfile, isProfileComplete }}>
      {children}
    </UserProfileContext.Provider>
  );
}

// Custom hook for using the context
export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
