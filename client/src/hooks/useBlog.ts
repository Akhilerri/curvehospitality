import { useState, useMemo } from 'react';
import { BlogPost, BlogCategory, BlogAuthor, BlogTag, BlogSearchRequest } from '../../../shared/types/blog';
import { 
  mockBlogPosts, 
  mockBlogCategories, 
  mockBlogAuthors, 
  mockBlogTags,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  getBlogPostsByAuthor,
  searchBlogPosts,
  getPublishedBlogPosts,
  getFeaturedBlogPosts,
  getRecentBlogPosts
} from '../data/mockBlog';

export interface UseBlogReturn {
  // Data
  posts: BlogPost[];
  categories: BlogCategory[];
  authors: BlogAuthor[];
  tags: BlogTag[];
  
  // Filtered data
  filteredPosts: BlogPost[];
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
  
  // Search and filter state
  searchQuery: string;
  selectedCategory: string | null;
  selectedTag: string | null;
  selectedAuthor: string | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
  setSelectedAuthor: (author: string | null) => void;
  clearFilters: () => void;
  
  // Utilities
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getRelatedPosts: (post: BlogPost, limit?: number) => BlogPost[];
  getTotalResults: () => number;
}

export const useBlog = (): UseBlogReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  // Base data
  const posts = getPublishedBlogPosts();
  const categories = mockBlogCategories;
  const authors = mockBlogAuthors;
  const tags = mockBlogTags;

  // Featured and recent posts
  const featuredPosts = getFeaturedBlogPosts(3);
  const recentPosts = getRecentBlogPosts(5);

  // Filtered posts based on current filters
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Apply search query
    if (searchQuery.trim()) {
      result = searchBlogPosts(searchQuery.trim());
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply tag filter
    if (selectedTag) {
      result = result.filter(post => 
        post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Apply author filter
    if (selectedAuthor) {
      result = result.filter(post => 
        post.author.toLowerCase() === selectedAuthor.toLowerCase()
      );
    }

    // Sort by published date (newest first)
    return result.sort((a, b) => 
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    );
  }, [posts, searchQuery, selectedCategory, selectedTag, selectedAuthor]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
    setSelectedAuthor(null);
  };

  // Get post by slug
  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return posts.find(post => post.slug === slug);
  };

  // Get related posts based on category and tags
  const getRelatedPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
    const related = posts.filter(p => {
      if (p.id === post.id) return false;
      
      // Same category gets higher priority
      if (p.category === post.category) return true;
      
      // Shared tags
      if (post.tags && p.tags) {
        return post.tags.some(tag => p.tags?.includes(tag));
      }
      
      return false;
    });

    // Sort by relevance (same category first, then by shared tags)
    related.sort((a, b) => {
      const aScore = (a.category === post.category ? 10 : 0) + 
        (post.tags?.filter(tag => a.tags?.includes(tag)).length || 0);
      const bScore = (b.category === post.category ? 10 : 0) + 
        (post.tags?.filter(tag => b.tags?.includes(tag)).length || 0);
      
      return bScore - aScore;
    });

    return related.slice(0, limit);
  };

  // Get total results count
  const getTotalResults = (): number => {
    return filteredPosts.length;
  };

  return {
    // Data
    posts,
    categories,
    authors,
    tags,
    
    // Filtered data
    filteredPosts,
    featuredPosts,
    recentPosts,
    
    // Search and filter state
    searchQuery,
    selectedCategory,
    selectedTag,
    selectedAuthor,
    
    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedTag,
    setSelectedAuthor,
    clearFilters,
    
    // Utilities
    getPostBySlug,
    getRelatedPosts,
    getTotalResults
  };
};

// Hook for individual blog post with related posts
export const useBlogPost = (slug: string) => {
  const { getPostBySlug, getRelatedPosts } = useBlog();
  
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(post) : [];
  
  return {
    post,
    relatedPosts,
    isLoading: false,
    error: null
  };
};

// Hook for blog search with debouncing
export const useBlogSearch = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Simple debounce implementation
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  });

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchBlogPosts(debouncedQuery.trim());
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    isSearching: query !== debouncedQuery,
    hasResults: results.length > 0
  };
};