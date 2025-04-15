'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaGraduationCap, FaBriefcase, FaFileAlt, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

// Sample career recommendations for demonstration
const SAMPLE_RECOMMENDATIONS = [
  {
    title: 'Software Engineer',
    match: 92,
    description: 'Develops applications and systems using programming languages and software development principles.',
    education: ['Bachelor\'s degree in Computer Science', 'Coding bootcamp (alternative)'],
    skills: ['Programming', 'Problem-solving', 'Debugging', 'Software design'],
    outlook: 'Excellent growth potential with 22% projected increase by 2030'
  },
  {
    title: 'Data Scientist',
    match: 88,
    description: 'Analyzes and interprets complex data to help organizations make better decisions.',
    education: ['Master\'s degree in Data Science', 'Bachelor\'s with specialized certifications'],
    skills: ['Statistical analysis', 'Machine learning', 'Programming (Python/R)', 'Data visualization'],
    outlook: 'Very strong growth with 31% projected increase by 2030'
  },
  {
    title: 'UX/UI Designer',
    match: 85,
    description: 'Creates user-friendly interfaces and experiences for digital products.',
    education: ['Bachelor\'s in Design or related field', 'UX/UI certification programs'],
    skills: ['User research', 'Wireframing', 'Prototyping', 'Visual design'],
    outlook: 'Strong growth with 23% projected increase by 2030'
  }
];

// Sample scholarship opportunities
const SAMPLE_SCHOLARSHIPS = [
  {
    name: 'Technology Leaders Scholarship',
    amount: '$5,000',
    deadline: '2025-06-15',
    eligibility: 'Students pursuing degrees in computer science, engineering, or related fields'
  },
  {
    name: 'Women in STEM Scholarship',
    amount: '$7,500',
    deadline: '2025-05-30',
    eligibility: 'Female students pursuing degrees in science, technology, engineering, or mathematics'
  },
  {
    name: 'Future Innovators Grant',
    amount: '$3,000',
    deadline: '2025-07-10',
    eligibility: 'Students with demonstrated interest in innovation and entrepreneurship'
  }
];

// Sample internship opportunities
const SAMPLE_INTERNSHIPS = [
  {
    company: 'TechCorp',
    position: 'Software Engineering Intern',
    location: 'Remote',
    deadline: '2025-05-20'
  },
  {
    company: 'DataViz Inc.',
    position: 'Data Analysis Intern',
    location: 'New York, NY',
    deadline: '2025-06-01'
  },
  {
    company: 'DesignHub',
    position: 'UX/UI Design Intern',
    location: 'San Francisco, CA',
    deadline: '2025-05-15'
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('recommendations');

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Top Career Matches
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SAMPLE_RECOMMENDATIONS.map((career, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">{career.title}</h3>
                      <div className="bg-white text-blue-600 rounded-full px-2 py-1 text-sm font-medium">
                        {career.match}% Match
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{career.description}</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Education</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {career.education.map((edu, i) => (
                            <li key={i}>{edu}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Skills</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {career.skills.map((skill, i) => (
                            <span 
                              key={i}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Job Outlook</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{career.outlook}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        Explore This Career
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link 
                href="/chat"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Get More Recommendations
                <FaArrowLeft className="rotate-180" />
              </Link>
            </div>
          </div>
        );
        
      case 'scholarships':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Scholarship Opportunities
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Scholarship Name</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Amount</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Deadline</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Eligibility</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {SAMPLE_SCHOLARSHIPS.map((scholarship, index) => {
                    const deadlineDate = new Date(scholarship.deadline);
                    const today = new Date();
                    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <tr key={index} className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{scholarship.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{scholarship.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-600 dark:text-gray-300 mr-2">
                              {new Date(scholarship.deadline).toLocaleDateString()}
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">
                              {daysLeft} days left
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{scholarship.eligibility}</td>
                        <td className="px-4 py-3 text-sm">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'internships':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Internship Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_INTERNSHIPS.map((internship, index) => {
                const deadlineDate = new Date(internship.deadline);
                const today = new Date();
                const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{internship.position}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                        New
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{internship.company}</p>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-2">
                      <FaBriefcase className="mr-1" size={14} />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                      <FaCalendarAlt className="mr-1" size={14} />
                      <span>Apply by {new Date(internship.deadline).toLocaleDateString()}</span>
                      <span className="ml-2 text-yellow-600 dark:text-yellow-400 font-medium">
                        ({daysLeft} days left)
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <button className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded text-sm transition-colors dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                        Save
                      </button>
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'progress':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Career Exploration Progress
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Completion</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Completed</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center text-green-600 dark:text-green-400">
                      <FaCheck size={12} className="mr-2" />
                      <span>Personal Information</span>
                    </li>
                    <li className="flex items-center text-green-600 dark:text-green-400">
                      <FaCheck size={12} className="mr-2" />
                      <span>Interests</span>
                    </li>
                    <li className="flex items-center text-green-600 dark:text-green-400">
                      <FaCheck size={12} className="mr-2" />
                      <span>Skills</span>
                    </li>
                    <li className="flex items-center text-green-600 dark:text-green-400">
                      <FaCheck size={12} className="mr-2" />
                      <span>Education</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Missing</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaCircle size={8} className="mr-2" />
                      <span>Resume Upload</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                Career Exploration Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <FaChartLine className="text-blue-600 dark:text-blue-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Careers Explored</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">You've viewed detailed information about 3 careers</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">3</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                      <FaGraduationCap className="text-purple-600 dark:text-purple-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Education Pathways</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">You've researched 2 education options</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">2</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                      <FaFileAlt className="text-green-600 dark:text-green-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Saved Resources</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">You've saved 0 resources for later reference</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">0</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/chat"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Continue exploring careers
                  <FaArrowLeft className="ml-1 rotate-180" size={12} />
                </Link>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <FaArrowLeft size={18} />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Your Career Dashboard</h1>
          </div>
          <Link
            href="/chat"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors hidden sm:block"
          >
            Chat with Career Guide
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recommendations'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Recommendations
              </button>
              <button
                onClick={() => setActiveTab('scholarships')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scholarships'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Scholarships
              </button>
              <button
                onClick={() => setActiveTab('internships')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'internships'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Internships
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'progress'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Your Progress
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}

// Helper components
function FaCheck({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 448 512" 
      width={size} 
      height={size} 
      className={className}
      fill="currentColor"
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
  );
}

function FaCircle({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      className={className}
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
    </svg>
  );
}
