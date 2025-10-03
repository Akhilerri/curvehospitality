import React from 'react';
import { useParams, useLocation } from 'wouter';
import { useBlogPost } from '../hooks/useBlog';
import BlogPostDetail from '../components/sections/BlogPostDetail';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  
  const { post, relatedPosts, isLoading, error } = useBlogPost(slug || '');

  const handleBack = () => {
    setLocation('/blog');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogPostSkeleton />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogPostDetail 
        post={post} 
        relatedPosts={relatedPosts}
        onBack={handleBack}
      />
    </div>
  );
};

const BlogPostSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Back button skeleton */}
      <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>
      
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-3 mb-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Author and actions skeleton */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Featured image skeleton */}
      <div className="aspect-video bg-gray-200 rounded-lg mb-8"></div>
      
      {/* Content skeleton */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        ))}
      </div>
      
      {/* Tags skeleton */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      
      {/* Related posts skeleton */}
      <div className="border-t border-gray-200 pt-8">
        <div className="h-8 w-40 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;