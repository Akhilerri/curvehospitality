import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { BlogCategory, BlogAuthor, BlogTag } from '../../../../shared/types/blog';

interface BlogSearchAndFilterProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  
  // Filters
  categories: BlogCategory[];
  authors: BlogAuthor[];
  tags: BlogTag[];
  
  selectedCategory: string | null;
  selectedAuthor: string | null;
  selectedTag: string | null;
  
  onCategoryChange: (category: string | null) => void;
  onAuthorChange: (author: string | null) => void;
  onTagChange: (tag: string | null) => void;
  
  // Actions
  onClearFilters: () => void;
  
  // Results
  totalResults: number;
}

const BlogSearchAndFilter: React.FC<BlogSearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  authors,
  tags,
  selectedCategory,
  selectedAuthor,
  selectedTag,
  onCategoryChange,
  onAuthorChange,
  onTagChange,
  onClearFilters,
  totalResults
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = selectedCategory || selectedAuthor || selectedTag || searchQuery;
  const activeFilterCount = [selectedCategory, selectedAuthor, selectedTag, searchQuery].filter(Boolean).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors duration-200 ${
              showFilters || hasActiveFilters
                ? 'border-teal-500 text-teal-600 bg-teal-50'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {totalResults} {totalResults === 1 ? 'post' : 'posts'} found
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="ml-2 text-teal-600 hover:text-teal-700 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <FilterChip
                label={`Search: "${searchQuery}"`}
                onRemove={() => onSearchChange('')}
              />
            )}
            {selectedCategory && (
              <FilterChip
                label={`Category: ${selectedCategory}`}
                onRemove={() => onCategoryChange(null)}
              />
            )}
            {selectedAuthor && (
              <FilterChip
                label={`Author: ${selectedAuthor}`}
                onRemove={() => onAuthorChange(null)}
              />
            )}
            {selectedTag && (
              <FilterChip
                label={`Tag: ${selectedTag}`}
                onRemove={() => onTagChange(null)}
              />
            )}
          </div>
        )}

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => onCategoryChange(
                        selectedCategory === category.name ? null : category.name
                      )}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.postCount})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Authors */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Authors</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {authors.map((author) => (
                  <label key={author.id} className="flex items-center">
                    <input
                      type="radio"
                      name="author"
                      checked={selectedAuthor === author.name}
                      onChange={() => onAuthorChange(
                        selectedAuthor === author.name ? null : author.name
                      )}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{author.name}</span>
                    <span className="text-xs text-gray-500">({author.postCount})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {tags.map((tag) => (
                  <label key={tag.slug} className="flex items-center">
                    <input
                      type="radio"
                      name="tag"
                      checked={selectedTag === tag.name}
                      onChange={() => onTagChange(
                        selectedTag === tag.name ? null : tag.name
                      )}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{tag.name}</span>
                    <span className="text-xs text-gray-500">({tag.postCount})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-teal-200 rounded-full p-0.5 transition-colors duration-200"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default BlogSearchAndFilter;