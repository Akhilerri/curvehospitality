import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

export interface UrlStateOptions<T> {
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  replace?: boolean; // Use replaceState instead of pushState
}

/**
 * Hook for managing state that syncs with URL search parameters
 */
export const useUrlState = <T>(
  key: string,
  options: UrlStateOptions<T>
) => {
  const [location, setLocation] = useLocation();
  const { defaultValue, serialize, deserialize, replace = false } = options;

  // Parse current URL parameters
  const getUrlParams = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams;
  }, []);

  // Get value from URL or use default
  const getValueFromUrl = useCallback((): T => {
    const params = getUrlParams();
    const urlValue = params.get(key);
    
    if (urlValue === null) {
      return defaultValue;
    }
    
    if (deserialize) {
      try {
        return deserialize(urlValue);
      } catch {
        return defaultValue;
      }
    }
    
    return urlValue as T;
  }, [key, defaultValue, deserialize, getUrlParams]);

  const [state, setState] = useState<T>(getValueFromUrl);

  // Update URL when state changes
  const updateUrl = useCallback((newValue: T) => {
    const params = getUrlParams();
    
    if (newValue === defaultValue || newValue === null || newValue === undefined || newValue === '') {
      params.delete(key);
    } else {
      const serializedValue = serialize ? serialize(newValue) : String(newValue);
      params.set(key, serializedValue);
    }
    
    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    
    if (replace) {
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.pushState({}, '', newUrl);
    }
  }, [key, defaultValue, serialize, replace, getUrlParams]);

  // Update state and URL
  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(prev => {
      const value = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      updateUrl(value);
      return value;
    });
  }, [updateUrl]);

  // Listen for browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setState(getValueFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getValueFromUrl]);

  // Update state when URL changes externally
  useEffect(() => {
    const currentValue = getValueFromUrl();
    setState(currentValue);
  }, [location, getValueFromUrl]);

  return [state, setValue] as const;
};

/**
 * Hook for managing multiple URL state values as an object
 */
export const useUrlStateObject = <T extends Record<string, any>>(
  defaultValue: T,
  options: {
    replace?: boolean;
    serialize?: (value: any) => string;
    deserialize?: (value: string) => any;
  } = {}
) => {
  const [location, setLocation] = useLocation();
  const { replace = false, serialize, deserialize } = options;

  const getUrlParams = useCallback(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const getValueFromUrl = useCallback((): T => {
    const params = getUrlParams();
    const result = { ...defaultValue };
    
    Object.keys(defaultValue).forEach(key => {
      const urlValue = params.get(key);
      if (urlValue !== null) {
        if (deserialize) {
          try {
            (result as any)[key] = deserialize(urlValue);
          } catch {
            // Keep default value on parse error
          }
        } else {
          // Try to parse as JSON, fallback to string
          try {
            (result as any)[key] = JSON.parse(urlValue);
          } catch {
            (result as any)[key] = urlValue;
          }
        }
      }
    });
    
    return result;
  }, [defaultValue, deserialize, getUrlParams]);

  const [state, setState] = useState<T>(getValueFromUrl);

  const updateUrl = useCallback((newValue: T) => {
    const params = getUrlParams();
    
    Object.entries(newValue).forEach(([key, value]) => {
      const defaultVal = (defaultValue as any)[key];
      
      if (value === defaultVal || value === null || value === undefined || value === '') {
        params.delete(key);
      } else {
        const serializedValue = serialize ? serialize(value) : JSON.stringify(value);
        params.set(key, serializedValue);
      }
    });
    
    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    
    if (replace) {
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.pushState({}, '', newUrl);
    }
  }, [defaultValue, serialize, replace, getUrlParams]);

  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(prev => {
      const value = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      updateUrl(value);
      return value;
    });
  }, [updateUrl]);

  // Listen for browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setState(getValueFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getValueFromUrl]);

  // Update state when URL changes externally
  useEffect(() => {
    const currentValue = getValueFromUrl();
    setState(currentValue);
  }, [location, getValueFromUrl]);

  return [state, setValue] as const;
};

export default useUrlState;