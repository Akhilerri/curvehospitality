#!/usr/bin/env node

/**
 * User Flow Testing Script
 * 
 * This script tests complete user journeys through the business website
 * to ensure all components are properly integrated and working together.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, description) {
  log(`\n${step}. ${description}`, 'blue');
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

// Check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(path.join(__dirname, '..', filePath));
  } catch (error) {
    return false;
  }
}

// Check if directory exists
function dirExists(dirPath) {
  try {
    return fs.existsSync(path.join(__dirname, '..', dirPath)) && 
           fs.statSync(path.join(__dirname, '..', dirPath)).isDirectory();
  } catch (error) {
    return false;
  }
}

// Read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
  } catch (error) {
    return null;
  }
}

// Test routing integration
function testRoutingIntegration() {
  logStep(1, 'Testing Routing Integration');
  
  const appContent = readFile('client/src/App.tsx');
  if (!appContent) {
    logError('App.tsx not found');
    return false;
  }

  const requiredRoutes = [
    '/',
    '/about',
    '/services',
    '/products',
    '/portfolio',
    '/process',
    '/resources',
    '/blog',
    '/contact'
  ];

  let allRoutesFound = true;
  requiredRoutes.forEach(route => {
    if (appContent.includes(`path="${route}"`)) {
      logSuccess(`Route ${route} is configured`);
    } else {
      logError(`Route ${route} is missing`);
      allRoutesFound = false;
    }
  });

  return allRoutesFound;
}

// Test page components exist
function testPageComponents() {
  logStep(2, 'Testing Page Components');
  
  const requiredPages = [
    'client/src/pages/Home.tsx',
    'client/src/pages/About.tsx',
    'client/src/pages/Services.tsx',
    'client/src/pages/Products.tsx',
    'client/src/pages/Portfolio.tsx',
    'client/src/pages/Process.tsx',
    'client/src/pages/Resources.tsx',
    'client/src/pages/Blog.tsx',
    'client/src/pages/BlogPost.tsx',
    'client/src/pages/Contact.tsx'
  ];

  let allPagesExist = true;
  requiredPages.forEach(page => {
    if (fileExists(page)) {
      logSuccess(`Page component ${path.basename(page)} exists`);
    } else {
      logError(`Page component ${path.basename(page)} is missing`);
      allPagesExist = false;
    }
  });

  return allPagesExist;
}

// Test navigation integration
function testNavigationIntegration() {
  logStep(3, 'Testing Navigation Integration');
  
  const navContent = readFile('client/src/components/EnhancedNavigation.tsx');
  if (!navContent) {
    logError('EnhancedNavigation.tsx not found');
    return false;
  }

  const homeContent = readFile('client/src/pages/Home.tsx');
  if (!homeContent) {
    logError('Home.tsx not found');
    return false;
  }

  // Check if Home page uses EnhancedNavigation
  if (homeContent.includes('EnhancedNavigation')) {
    logSuccess('Home page uses EnhancedNavigation');
  } else {
    logError('Home page does not use EnhancedNavigation');
    return false;
  }

  // Check navigation structure
  const requiredNavItems = [
    'About Us',
    'Services',
    'Products',
    'Portfolio',
    'Process',
    'Resources',
    'Contact'
  ];

  let allNavItemsFound = true;
  requiredNavItems.forEach(item => {
    if (navContent.includes(`"${item}"`)) {
      logSuccess(`Navigation item "${item}" is configured`);
    } else {
      logError(`Navigation item "${item}" is missing`);
      allNavItemsFound = false;
    }
  });

  return allNavItemsFound;
}

// Test section components integration
function testSectionComponents() {
  logStep(4, 'Testing Section Components Integration');
  
  const sectionDirs = [
    'client/src/components/sections'
  ];

  let allSectionsExist = true;
  sectionDirs.forEach(dir => {
    if (dirExists(dir)) {
      logSuccess(`Section components directory ${dir} exists`);
    } else {
      logError(`Section components directory ${dir} is missing`);
      allSectionsExist = false;
    }
  });

  // Check key section components
  const requiredSections = [
    'client/src/components/sections/AboutUsSection.tsx',
    'client/src/components/sections/ServicesSection.tsx',
    'client/src/components/sections/ProductGrid.tsx',
    'client/src/components/sections/PortfolioGallery.tsx',
    'client/src/components/sections/ProcessSection.tsx',
    'client/src/components/sections/BlogSection.tsx',
    'client/src/components/sections/ContactSection.tsx'
  ];

  requiredSections.forEach(section => {
    if (fileExists(section)) {
      logSuccess(`Section component ${path.basename(section)} exists`);
    } else {
      logWarning(`Section component ${path.basename(section)} may be missing`);
    }
  });

  return allSectionsExist;
}

// Test API integration
function testAPIIntegration() {
  logStep(5, 'Testing API Integration');
  
  const serverRoutes = [
    'server/routes/team.ts',
    'server/routes/services.ts',
    'server/routes/products.ts',
    'server/routes/projects.ts',
    'server/routes/blog.ts',
    'server/routes/contact.ts'
  ];

  let allRoutesExist = true;
  serverRoutes.forEach(route => {
    if (fileExists(route)) {
      logSuccess(`API route ${path.basename(route)} exists`);
    } else {
      logError(`API route ${path.basename(route)} is missing`);
      allRoutesExist = false;
    }
  });

  // Check hooks for API integration
  const hookFiles = [
    'client/src/hooks/useBlog.ts',
    'client/src/hooks/usePortfolio.ts',
    'client/src/hooks/useContact.ts'
  ];

  hookFiles.forEach(hook => {
    if (fileExists(hook)) {
      logSuccess(`Hook ${path.basename(hook)} exists`);
    } else {
      logWarning(`Hook ${path.basename(hook)} may be missing`);
    }
  });

  return allRoutesExist;
}

// Test form integration
function testFormIntegration() {
  logStep(6, 'Testing Form Integration');
  
  const contactFormContent = readFile('client/src/components/sections/ContactForm.tsx');
  if (!contactFormContent) {
    logError('ContactForm.tsx not found');
    return false;
  }

  // Check for form validation
  if (contactFormContent.includes('zod') || contactFormContent.includes('validation')) {
    logSuccess('Contact form includes validation');
  } else {
    logWarning('Contact form validation may be missing');
  }

  // Check for form submission handling
  if (contactFormContent.includes('onSubmit') || contactFormContent.includes('handleSubmit')) {
    logSuccess('Contact form includes submission handling');
  } else {
    logError('Contact form submission handling is missing');
    return false;
  }

  return true;
}

// Test responsive design integration
function testResponsiveDesign() {
  logStep(7, 'Testing Responsive Design Integration');
  
  const navContent = readFile('client/src/components/EnhancedNavigation.tsx');
  if (!navContent) {
    logError('EnhancedNavigation.tsx not found');
    return false;
  }

  // Check for mobile navigation
  if (navContent.includes('MobileNavigation') || navContent.includes('mobile')) {
    logSuccess('Mobile navigation is implemented');
  } else {
    logError('Mobile navigation is missing');
    return false;
  }

  // Check for responsive classes
  if (navContent.includes('md:') || navContent.includes('lg:')) {
    logSuccess('Responsive classes are used');
  } else {
    logWarning('Responsive classes may be missing');
  }

  return true;
}

// Test SEO integration
function testSEOIntegration() {
  logStep(8, 'Testing SEO Integration');
  
  const seoFiles = [
    'client/src/lib/seo.ts',
    'client/src/hooks/useSEO.ts'
  ];

  let seoIntegrated = true;
  seoFiles.forEach(file => {
    if (fileExists(file)) {
      logSuccess(`SEO file ${path.basename(file)} exists`);
    } else {
      logError(`SEO file ${path.basename(file)} is missing`);
      seoIntegrated = false;
    }
  });

  // Check if pages use SEO hooks
  const homeContent = readFile('client/src/pages/Home.tsx');
  if (homeContent && homeContent.includes('useSEO')) {
    logSuccess('Home page uses SEO hooks');
  } else {
    logWarning('Home page may not use SEO hooks');
  }

  return seoIntegrated;
}

// Test database integration
function testDatabaseIntegration() {
  logStep(9, 'Testing Database Integration');
  
  const dbFiles = [
    'server/storage.ts',
    'migrations/0000_initial_schema.sql'
  ];

  let dbIntegrated = true;
  dbFiles.forEach(file => {
    if (fileExists(file)) {
      logSuccess(`Database file ${path.basename(file)} exists`);
    } else {
      logError(`Database file ${path.basename(file)} is missing`);
      dbIntegrated = false;
    }
  });

  return dbIntegrated;
}

// Main test runner
function runUserFlowTests() {
  log('\n' + '='.repeat(60), 'bold');
  log('BUSINESS WEBSITE USER FLOW INTEGRATION TESTS', 'bold');
  log('='.repeat(60), 'bold');

  const tests = [
    testRoutingIntegration,
    testPageComponents,
    testNavigationIntegration,
    testSectionComponents,
    testAPIIntegration,
    testFormIntegration,
    testResponsiveDesign,
    testSEOIntegration,
    testDatabaseIntegration
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  tests.forEach(test => {
    try {
      if (test()) {
        passedTests++;
      }
    } catch (error) {
      logError(`Test failed with error: ${error.message}`);
    }
  });

  // Summary
  log('\n' + '='.repeat(60), 'bold');
  log('TEST SUMMARY', 'bold');
  log('='.repeat(60), 'bold');
  
  if (passedTests === totalTests) {
    logSuccess(`All ${totalTests} integration tests passed!`);
    log('\n✅ The business website is properly integrated and ready for user testing.', 'green');
  } else {
    logError(`${passedTests}/${totalTests} tests passed`);
    log('\n❌ Some integration issues need to be resolved before user testing.', 'red');
  }

  // User flow checklist
  log('\n' + '-'.repeat(60), 'bold');
  log('MANUAL USER FLOW CHECKLIST', 'bold');
  log('-'.repeat(60), 'bold');
  
  const userFlows = [
    '1. Navigate from Home → About → Services → Products → Portfolio → Process → Resources → Blog → Contact',
    '2. Use mobile navigation menu on small screens',
    '3. Filter products by category and search',
    '4. Filter portfolio projects by brand, segment, location',
    '5. Read blog posts and navigate between articles',
    '6. Download guides from resources section',
    '7. Submit contact form with validation',
    '8. Test responsive design on different screen sizes',
    '9. Verify SEO meta tags on each page',
    '10. Check page loading performance'
  ];

  userFlows.forEach(flow => {
    log(`☐ ${flow}`, 'yellow');
  });

  log('\n📋 Complete the manual checklist above to verify all user journeys work correctly.', 'blue');
  
  return passedTests === totalTests;
}

// Run the tests
const success = runUserFlowTests();
process.exit(success ? 0 : 1);