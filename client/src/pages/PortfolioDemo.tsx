import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Portfolio } from './Portfolio';

export const PortfolioDemo: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Portfolio Demo - CurveRedo';
  }, []);

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        {/* Demo Header */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                  <span>Back to Home</span>
                </Link>
                <div className="w-px h-6 bg-blue-400" />
                <h1 className="text-xl font-semibold">Portfolio Demo</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <ExternalLink size={16} />
                <span>Interactive Demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Description */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Portfolio & Projects System Demo
              </h2>
              <p className="text-gray-600 mb-4">
                This demo showcases the complete portfolio system including:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• <strong>Masonry Gallery:</strong> Responsive grid layout with hover effects</li>
                <li>• <strong>Advanced Filtering:</strong> Filter by project type, brand, location, and featured status</li>
                <li>• <strong>URL State Management:</strong> Filters persist in URL for sharing and bookmarking</li>
                <li>• <strong>Case Study Modals:</strong> Detailed project views with image carousels</li>
                <li>• <strong>Before/After Images:</strong> Visual project progression with categorized images</li>
                <li>• <strong>Client Testimonials:</strong> Integrated testimonials with ratings</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  ✓ Responsive Design
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  ✓ Accessibility Compliant
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  ✓ SEO Optimized
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  ✓ Performance Optimized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Component */}
        <Portfolio />
      </div>
    </>
  );
};

export default PortfolioDemo;