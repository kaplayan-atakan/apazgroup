/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO test script - checks redirects, metadata, and sitemap
import http from 'http';

// Base URL for testing
const baseUrl = 'http://localhost:3000';

// List of URLs to test for proper redirects
const redirectTests = [
  { source: '/', expectedRedirect: '/tr' },
  { source: '/insan_kaynaklari_politikamiz', expectedRedirect: '/tr/insan-kaynaklari-politikamiz' },
  { source: '/bize_katilin', expectedRedirect: '/tr/bize-katilin' },
  { source: '/franchising', expectedRedirect: '/tr/franchising' },
  { source: '/baydoner', expectedRedirect: '/tr/baydoner' },
  { source: '/kisisel-verilerin-korunmasi', expectedRedirect: '/tr/kisisel-verilerin-korunmasi' },
];

// Test a URL for proper redirect
async function testRedirect(source, expectedRedirect) {
  return new Promise((resolve, _reject) => {
    const url = `${baseUrl}${source}`;
    
    http.get(url, { followRedirect: false }, (res) => {
      const { statusCode, headers } = res;
      const location = headers.location || '';
      
      const isPermanent = statusCode === 301;
      const isTemporary = statusCode === 302;
      const isRedirect = isPermanent || isTemporary;
      
      if (isRedirect) {
        const success = location === expectedRedirect || 
                       location === `${baseUrl}${expectedRedirect}`;
        
        resolve({
          source,
          result: success ? 'PASS' : 'FAIL',
          status: statusCode,
          location,
          expected: expectedRedirect
        });
      } else {
        resolve({
          source,
          result: 'FAIL',
          status: statusCode,
          expected: expectedRedirect,
          message: 'No redirect detected'
        });
      }
      
      res.resume();
    }).on('error', (err) => {
      resolve({
        source,
        result: 'ERROR',
        message: err.message
      });
    });
  });
}

// Test sitemap.xml
async function testSitemap() {
  return new Promise((resolve, _reject) => {
    http.get(`${baseUrl}/sitemap.xml`, (res) => {
      const { statusCode } = res;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasUrlset = data.includes('<urlset');
        const hasEntries = data.includes('<url>');
        const hasXMLNS = data.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
        
        resolve({
          result: statusCode === 200 && hasUrlset && hasEntries && hasXMLNS ? 'PASS' : 'FAIL',
          status: statusCode,
          isValidXML: hasUrlset && hasXMLNS,
          hasEntries
        });
      });
    }).on('error', (err) => {
      resolve({
        result: 'ERROR',
        message: err.message
      });
    });
  });
}

// Test robots.txt
async function testRobotsTxt() {
  return new Promise((resolve, _reject) => {
    http.get(`${baseUrl}/robots.txt`, (res) => {
      const { statusCode } = res;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasSitemap = data.includes('Sitemap:');
        const hasUserAgent = data.includes('User-agent:');
        const hasDisallow = data.includes('Disallow:');
        
        resolve({
          result: statusCode === 200 && hasSitemap && hasUserAgent ? 'PASS' : 'FAIL',
          status: statusCode,
          hasSitemap,
          hasUserAgent,
          hasDisallow
        });
      });
    }).on('error', (err) => {
      resolve({
        result: 'ERROR',
        message: err.message
      });
    });
  });
}

// Test JSON-LD and metadata on a page
async function testMetadata(path) {
  return new Promise((resolve, _reject) => {
    http.get(`${baseUrl}${path}`, (res) => {
      const { statusCode } = res;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const hasLdJson = data.includes('application/ld+json');
        const hasOgTags = data.includes('og:');
        const hasCanonical = data.includes('rel="canonical"');
        const hasAlternates = data.includes('hreflang');
        
        resolve({
          path,
          result: statusCode === 200 && hasLdJson && hasOgTags ? 'PASS' : 'FAIL',
          status: statusCode,
          hasLdJson,
          hasOgTags,
          hasCanonical,
          hasAlternates
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        result: 'ERROR',
        message: err.message
      });
    });
  });
}

// Run all tests
async function runTests() {
  console.log('\n=== SEO TEST RESULTS ===\n');
  
  // Test redirects
  console.log('1. REDIRECT TESTS:');
  console.log('-----------------');
  
  const redirectResults = await Promise.all(
    redirectTests.map(test => testRedirect(test.source, test.expectedRedirect))
  );
  
  redirectResults.forEach(result => {
    console.log(`${result.result === 'PASS' ? '✓' : '✗'} ${result.source} → ${result.expected} (${result.status})`);
  });
  
  // Test sitemap
  console.log('\n2. SITEMAP TEST:');
  console.log('--------------');
  
  const sitemapResult = await testSitemap();
  console.log(`${sitemapResult.result === 'PASS' ? '✓' : '✗'} sitemap.xml (${sitemapResult.status})`);
  console.log(`   Valid XML: ${sitemapResult.isValidXML ? 'Yes' : 'No'}`);
  console.log(`   Has Entries: ${sitemapResult.hasEntries ? 'Yes' : 'No'}`);
  
  // Test robots.txt
  console.log('\n3. ROBOTS.TXT TEST:');
  console.log('------------------');
  
  const robotsResult = await testRobotsTxt();
  console.log(`${robotsResult.result === 'PASS' ? '✓' : '✗'} robots.txt (${robotsResult.status})`);
  console.log(`   Has User-Agent: ${robotsResult.hasUserAgent ? 'Yes' : 'No'}`);
  console.log(`   Has Sitemap: ${robotsResult.hasSitemap ? 'Yes' : 'No'}`);
  console.log(`   Has Disallow: ${robotsResult.hasDisallow ? 'Yes' : 'No'}`);
  
  // Test metadata
  console.log('\n4. METADATA TESTS:');
  console.log('-----------------');
  
  const pagesToTest = [
    '/tr',
    '/tr/franchising',
    '/tr/basvuru-formu',
    '/tr/insan-kaynaklari-politikamiz'
  ];
  
  const metadataResults = await Promise.all(
    pagesToTest.map(path => testMetadata(path))
  );
  
  metadataResults.forEach(result => {
    console.log(`${result.result === 'PASS' ? '✓' : '✗'} ${result.path} (${result.status})`);
    console.log(`   JSON-LD: ${result.hasLdJson ? 'Yes' : 'No'}`);
    console.log(`   OG Tags: ${result.hasOgTags ? 'Yes' : 'No'}`);
    console.log(`   Canonical: ${result.hasCanonical ? 'Yes' : 'No'}`);
    console.log(`   Alternates: ${result.hasAlternates ? 'Yes' : 'No'}`);
  });
  
  // Summary
  console.log('\n=== SUMMARY ===');
  
  const totalTests = redirectResults.length + 
                   (sitemapResult.result === 'PASS' ? 1 : 0) + 
                   (robotsResult.result === 'PASS' ? 1 : 0) + 
                   metadataResults.length;
                   
  const passedTests = redirectResults.filter(r => r.result === 'PASS').length + 
                    (sitemapResult.result === 'PASS' ? 1 : 0) + 
                    (robotsResult.result === 'PASS' ? 1 : 0) + 
                    metadataResults.filter(r => r.result === 'PASS').length;
  
  console.log(`Passed: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);
  
  if (passedTests === totalTests) {
    console.log('\n✅ ALL SEO TESTS PASSED! ✅');
  } else {
    console.log('\n⚠️ SOME SEO TESTS FAILED ⚠️');
  }
}

// Run the tests
runTests().catch(console.error);
