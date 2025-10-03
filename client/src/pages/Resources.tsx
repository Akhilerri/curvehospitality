import React, { useState } from 'react';
import { BookOpen, Download, TrendingUp, Users } from 'lucide-react';
import BlogSection from '../components/sections/BlogSection';
import GuidesSection from '../components/sections/GuidesSection';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'guides'>('blog');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Resources & Insights
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Explore our comprehensive collection of expert insights, practical guides, 
            and downloadable resources to elevate your design projects.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-teal-300" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-300">Expert Articles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <Download className="w-8 h-8 mx-auto mb-2 text-teal-300" />
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm text-gray-300">Free Downloads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-teal-300" />
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-gray-300">Monthly Readers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <Users className="w-8 h-8 mx-auto mb-2 text-teal-300" />
              <div className="text-2xl font-bold">5K+</div>
              <div className="text-sm text-gray-300">Community Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'blog'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Blog & Insights</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'guides'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Downloadable Guides</span>
              </div>
            </button>
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      {activeTab === 'blog' && (
        <BlogSection 
          title="Latest Insights & Articles"
          subtitle="Stay informed with the latest trends, best practices, and expert insights from our team."
          showFeatured={true}
          featuredTitle="Featured Articles"
          postsPerPage={9}
        />
      )}

      {activeTab === 'guides' && (
        <GuidesSection 
          title="Downloadable Resources"
          subtitle="Access our comprehensive library of guides, templates, and tools to enhance your projects."
          showFeatured={true}
          featuredTitle="Popular Downloads"
          guidesPerPage={9}
        />
      )}

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let our team of experts help bring your vision to life with our comprehensive 
            design and manufacturing services.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;