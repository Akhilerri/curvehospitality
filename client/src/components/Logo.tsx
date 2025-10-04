import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ 
  className, 
  variant = 'default', 
  size = 'md',
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  // You can replace this with your actual logo
  const logoSrc = variant === 'white' 
    ? '/logo-white.svg' 
    : variant === 'dark' 
    ? '/logo-dark.svg' 
    : '/logo.svg';

  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2 hover:opacity-80 transition-opacity",
        className
      )}
    >
      {/* Replace this img tag with your logo */}
      <img 
        src={logoSrc}
        alt="Your Company Name"
        className={cn(sizeClasses[size], "w-auto")}
        onError={(e) => {
          // Fallback to text if image fails to load
          e.currentTarget.style.display = 'none';
          const textElement = e.currentTarget.nextElementSibling as HTMLElement;
          if (textElement) textElement.style.display = 'block';
        }}
      />
      
      {/* Fallback text logo - customize this */}
      {showText && (
        <span 
          className={cn(
            "font-bold text-primary hidden", // hidden by default, shown if image fails
            textSizeClasses[size]
          )}
        >
          Your Company
        </span>
      )}
    </Link>
  );
}

// Text-only logo component for when you don't have an image yet
export function TextLogo({ 
  className, 
  size = 'md',
  text = "Your Company Name"
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}) {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <Link 
      href="/" 
      className={cn(
        "font-bold text-primary hover:opacity-80 transition-opacity",
        textSizeClasses[size],
        className
      )}
    >
      {text}
    </Link>
  );
}