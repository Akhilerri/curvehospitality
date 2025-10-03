import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import type { NavigationItem } from "@shared/types/navigation";

export interface NavigationState {
  isOpen: boolean;
  activeDropdown: string | null;
  isMobile: boolean;
}

export function useNavigation() {
  const [location] = useLocation();
  const [state, setState] = useState<NavigationState>({
    isOpen: false,
    activeDropdown: null,
    isMobile: false,
  });

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setState(prev => ({
        ...prev,
        isMobile: window.innerWidth < 768
      }));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      activeDropdown: null
    }));
  }, [location]);

  const toggleMenu = () => {
    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      activeDropdown: null
    }));
  };

  const closeMenu = () => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      activeDropdown: null
    }));
  };

  const setActiveDropdown = (id: string | null) => {
    setState(prev => ({
      ...prev,
      activeDropdown: id
    }));
  };

  const isActiveRoute = (href: string): boolean => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const isActiveItem = (item: NavigationItem): boolean => {
    if (isActiveRoute(item.href)) return true;
    
    // Check if any child is active
    if (item.children) {
      return item.children.some((child: NavigationItem) => isActiveItem(child));
    }
    
    return false;
  };

  return {
    ...state,
    location,
    toggleMenu,
    closeMenu,
    setActiveDropdown,
    isActiveRoute,
    isActiveItem,
  };
}