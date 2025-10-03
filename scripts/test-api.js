// Simple API test script
// Run with: node scripts/test-api.js

const baseUrl = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Content Management API...\n');

  try {
    // Test authentication
    console.log('1. Testing authentication...');
    const authResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    
    if (authResponse.ok) {
      const authData = await authResponse.json();
      console.log('✅ Authentication successful');
      const token = authData.token;

      // Test team endpoints
      console.log('\n2. Testing team endpoints...');
      const teamResponse = await fetch(`${baseUrl}/team`);
      if (teamResponse.ok) {
        console.log('✅ GET /api/team - Success');
      } else {
        console.log('❌ GET /api/team - Failed');
      }

      // Test services endpoints
      console.log('\n3. Testing services endpoints...');
      const servicesResponse = await fetch(`${baseUrl}/services`);
      if (servicesResponse.ok) {
        console.log('✅ GET /api/services - Success');
      } else {
        console.log('❌ GET /api/services - Failed');
      }

      // Test products endpoints
      console.log('\n4. Testing products endpoints...');
      const productsResponse = await fetch(`${baseUrl}/products`);
      if (productsResponse.ok) {
        console.log('✅ GET /api/products - Success');
      } else {
        console.log('❌ GET /api/products - Failed');
      }

      // Test projects endpoints
      console.log('\n5. Testing projects endpoints...');
      const projectsResponse = await fetch(`${baseUrl}/projects`);
      if (projectsResponse.ok) {
        console.log('✅ GET /api/projects - Success');
      } else {
        console.log('❌ GET /api/projects - Failed');
      }

      // Test blog endpoints
      console.log('\n6. Testing blog endpoints...');
      const blogResponse = await fetch(`${baseUrl}/blog`);
      if (blogResponse.ok) {
        console.log('✅ GET /api/blog - Success');
      } else {
        console.log('❌ GET /api/blog - Failed');
      }

      // Test media endpoints (requires auth)
      console.log('\n7. Testing media endpoints...');
      const mediaResponse = await fetch(`${baseUrl}/media/list`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (mediaResponse.ok) {
        console.log('✅ GET /api/media/list - Success');
      } else {
        console.log('❌ GET /api/media/list - Failed');
      }

      console.log('\n🎉 API testing completed!');
    } else {
      console.log('❌ Authentication failed');
    }
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure the server is running with: npm run dev');
  }
}

testAPI();