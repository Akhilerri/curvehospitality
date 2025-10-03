import React from 'react';
import { ArrowLeft, Clock, Eye, Share2, Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '../../../../shared/types/blog';
import { formatDate } from '../../lib/utils';

interface BlogPostDetailProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  onBack?: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ 
  post, 
  relatedPosts = [], 
  onBack 
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </button>
      )}

      {/* Article Header */}
      <header className="mb-8">
        {/* Category Badge */}
        <div className="flex items-center gap-4 mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
            {post.viewCount && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.viewCount.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author and Actions */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">{post.author}</div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-8">
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
        />
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="border-t border-gray-200 pt-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <RelatedPostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}

      {/* SEO Meta Tags (would be handled by a head manager in a real app) */}
      {post.seo && (
        <div className="hidden">
          <meta name="description" content={post.seo.description} />
          <meta name="keywords" content={post.seo.keywords?.join(', ')} />
          <meta property="og:title" content={post.seo.title || post.title} />
          <meta property="og:description" content={post.seo.description} />
          {post.featuredImage && (
            <meta property="og:image" content={post.featuredImage.url} />
          )}
          <meta property="og:type" content="article" />
          <meta property="article:author" content={post.author} />
          <meta property="article:published_time" content={post.publishedAt?.toISOString()} />
          <meta property="article:section" content={post.category} />
          {post.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </div>
      )}
    </div>
  );
};

interface RelatedPostCardProps {
  post: BlogPost;
}

const RelatedPostCard: React.FC<RelatedPostCardProps> = ({ post }) => {
  const handleClick = () => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <article 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
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
      
      <div className="p-4">
        <div className="text-xs text-teal-600 font-medium mb-2">{post.category}</div>
        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h4>
        {post.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{post.author}</span>
          {post.publishedAt && (
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
};

// Helper function to format blog content (convert markdown-like content to HTML)
const formatBlogContent = (content: string): string => {
  // Simple markdown-to-HTML conversion
  // In a real app, you'd use a proper markdown parser like marked or remark
  return content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.*)$/gim, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><li>/g, '<ul><li>')
    .replace(/<\/li><\/p>/g, '</li></ul>')
    .replace(/<\/ul><ul>/g, '');
};

export default BlogPostDetail;