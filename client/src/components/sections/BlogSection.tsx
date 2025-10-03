import React, { useState } from 'react';
import { useBlog } from '../../hooks/useBlog';
import BlogSearchAndFilter from './BlogSearchAndFilter';
import BlogGrid from './BlogGrid';

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  showFeatured?: boolean;
  featuredTitle?: string;
  postsPerPage?: number;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  title = "Insights & Resources",
  subtitle = "Stay informed with the latest trends, best practices, and insights from our team of experts.",
  showFeatured = true,
  featuredTitle = "Featured Posts",
  postsPerPage = 9
}) => {
  const {
    filteredPosts,
    featuredPosts,
    categories,
    authors,
    tags,
    searchQuery,
    selectedCategory,
    selectedTag,
    selectedAuthor,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTag,
    setSelectedAuthor,
    clearFilters,
    getTotalResults
  } = useBlog();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedTag, selectedAuthor]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="blog-section" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Featured Posts */}
        {showFeatured && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{featuredTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <BlogSearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          authors={authors}
          tags={tags}
          selectedCategory={selectedCategory}
          selectedAuthor={selectedAuthor}
          selectedTag={selectedTag}
          onCategoryChange={setSelectedCategory}
          onAuthorChange={setSelectedAuthor}
          onTagChange={setSelectedTag}
          onClearFilters={clearFilters}
          totalResults={getTotalResults()}
        />

        {/* Blog Grid */}
        <div className="mt-8">
          <BlogGrid 
            posts={currentPosts} 
            loading={loading}
            emptyMessage="No blog posts match your current filters."
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

interface FeaturedPostCardProps {
  post: any; // BlogPost type
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  const handleClick = () => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-teal-600 rounded-full">
            Featured
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full">
            {post.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-200">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium text-gray-700">{post.author}</span>
          <div className="flex items-center gap-3">
            {post.readingTime && (
              <span>{post.readingTime} min read</span>
            )}
            {post.viewCount && (
              <span>{post.viewCount.toLocaleString()} views</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'text-white bg-teal-600 border border-teal-600'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default BlogSection;