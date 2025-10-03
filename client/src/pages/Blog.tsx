import React from 'react';
import BlogSection from '../components/sections/BlogSection';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Insights & Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the latest trends, best practices, and expert insights in interior design, 
            manufacturing, and project management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-300">Expert Articles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-gray-300">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">Weekly</div>
              <div className="text-sm text-gray-300">New Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <BlogSection 
        showFeatured={true}
        featuredTitle="Featured Articles"
        postsPerPage={9}
      />


    </div>
  );
};

export default Blog;