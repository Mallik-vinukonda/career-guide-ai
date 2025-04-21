import Link from "next/link";
import { FaGraduationCap, FaBriefcase, FaChartLine } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your Personal <span className="text-blue-600 dark:text-blue-400">Career Guide</span> AI Assistant
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Discover your ideal career path with personalized guidance based on your interests, skills, and goals. Our AI-powered assistant helps you navigate your educational and professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 text-center">
                Start Exploring Careers
              </Link>
              <Link href="/onboarding" className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-medium rounded-lg transition duration-300 text-center">
                Create Your Profile
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-md">
            <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <FaGraduationCap className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Career Guide AI</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Online now</p>
                </div>
              </div>
              <div className="space-y-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-gray-800 dark:text-gray-200">Hi there! I&apos;m your personal career guidance assistant. How can I help you today?</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-blue-800 dark:text-blue-200">I&apos;m interested in careers that combine technology and healthcare.</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-gray-800 dark:text-gray-200">Great choice! Some options include Health Informatics, Biomedical Engineering, Medical Software Development, and Telemedicine. Would you like to explore any of these in detail?</p>
                </div>
              </div>
            </div>
            <div className="absolute top-6 -right-6 -bottom-6 -left-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-xl opacity-20 z-0"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How Our AI Career Guide Helps You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<FaGraduationCap size={24} />}
            title="Educational Pathways"
            description="Discover the right educational path for your dream career with detailed information on degrees, certifications, and training programs."
          />
          <FeatureCard 
            icon={<MdExplore size={24} />}
            title="Career Exploration"
            description="Explore diverse career options based on your interests, skills, and values with personalized recommendations."
          />
          <FeatureCard 
            icon={<FaBriefcase size={24} />}
            title="Job Market Insights"
            description="Get up-to-date information on job market trends, salary expectations, and growth potential in various fields."
          />
          <FeatureCard 
            icon={<FaChartLine size={24} />}
            title="Skill Development"
            description="Identify key skills needed for your target career and get recommendations for courses and resources to develop them."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-blue-600 dark:bg-blue-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Career Path?</h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
            Start a conversation with our AI career guide and get personalized recommendations based on your unique profile.
          </p>
          <Link href="/chat" className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg transition duration-300 inline-block">
            Chat with Career Guide AI
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FaGraduationCap size={24} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Career Guide AI</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Career Guide AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
