import { execSync } from 'child_process';

// Base URL for testing
const baseUrl = 'http://localhost:3000';

// Function to fetch a URL using curl
function fetchWithCurl(url, options = {}) {
  const followRedirects = options.followRedirect === true ? '-L' : '';
  const headOnly = options.method === 'HEAD' ? '-I' : '';
  const silent = '-s';
  
  try {
    const command = `curl ${silent} ${headOnly} ${followRedirects} "${url}"`;
    return execSync(command, { encoding: 'utf-8' });
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
    return '';
  }
}

// Test a URL for proper redirect
function testRedirect(source, expectedRedirect) {
  const url = `${baseUrl}${source}`;
  const response = fetchWithCurl(url, { method: 'HEAD' });
  
  const locationMatch = response.match(/^location:\s*(.+)$/im);
  const statusMatch = response.match(/^HTTP\/[\d.]+ (\d+)/im);
  
  const location = locationMatch ? locationMatch[1].trim() : '';
  const status = statusMatch ? parseInt(statusMatch[1], 10) : null;
  
  const isPermanent = status === 301;
  const isTemporary = status === 302;
  const isRedirect = isPermanent || isTemporary;
  
  if (isRedirect) {
    const expectedFullUrl = expectedRedirect.startsWith('http') ? 
      expectedRedirect : `${baseUrl}${expectedRedirect}`;
    
    const success = location === expectedRedirect || location === expectedFullUrl;
    
    return {
      source,
      result: success ? 'PASS' : 'FAIL',
      status,
      location,
      expected: expectedRedirect
    };
  } else {
    return {
      source,
      result: 'FAIL',
      status,
      expected: expectedRedirect,
      message: 'No redirect detected'
    };
  }
}

// Test sitemap.xml
function testSitemap() {
  const url = `${baseUrl}/sitemap.xml`;
  const response = fetchWithCurl(url);
  
  const hasUrlset = response.includes('<urlset');
  const hasEntries = response.includes('<url>');
  const hasXMLNS = response.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  const statusMatch = response.match(/^HTTP\/[\d.]+ (\d+)/im);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : null;
  
  return {
    result: status === 200 && hasUrlset && hasEntries && hasXMLNS ? 'PASS' : 'FAIL',
    status,
    isValidXML: hasUrlset && hasXMLNS,
    hasEntries
  };
}

// Test robots.txt
function testRobotsTxt() {
  const url = `${baseUrl}/robots.txt`;
  const response = fetchWithCurl(url);
  
  const hasSitemap = response.includes('Sitemap:');
  const hasUserAgent = response.includes('User-agent:');
  const hasDisallow = response.includes('Disallow:');
  const statusMatch = response.match(/^HTTP\/[\d.]+ (\d+)/im);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : null;
  
  return {
    result: status === 200 && hasSitemap && hasUserAgent ? 'PASS' : 'FAIL',
    status,
    hasSitemap,
    hasUserAgent,
    hasDisallow
  };
}

// Test JSON-LD and metadata on a page
function testMetadata(path) {
  const url = `${baseUrl}${path}`;
  const response = fetchWithCurl(url);
  
  const hasLdJson = response.includes('application/ld+json');
  const hasOgTags = response.includes('og:');
  const hasCanonical = response.includes('rel="canonical"');
  const hasAlternates = response.includes('hreflang');
  const statusMatch = response.match(/^HTTP\/[\d.]+ (\d+)/im);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : null;
  
  return {
    path,
    result: status === 200 && hasLdJson && hasOgTags ? 'PASS' : 'FAIL',
    status,
    hasLdJson,
    hasOgTags,
    hasCanonical,
    hasAlternates
  };
}

// Run all tests
function runTests() {
  console.log('\n=== SEO TEST RESULTS ===\n');
  
  // List of URLs to test for proper redirects
  const redirectTests = [
    { source: '/', expectedRedirect: '/tr' },
    { source: '/insan_kaynaklari_politikamiz', expectedRedirect: '/tr/insan-kaynaklari-politikamiz' },
    { source: '/bize_katilin', expectedRedirect: '/tr/bize-katilin' },
    { source: '/franchising', expectedRedirect: '/tr/franchising' },
    { source: '/baydoner', expectedRedirect: '/tr/baydoner' },
    { source: '/kisisel-verilerin-korunmasi', expectedRedirect: '/tr/kisisel-verilerin-korunmasi' },
  ];
  
  // Test redirects
  console.log('1. REDIRECT TESTS:');
  console.log('-----------------');
  
  const redirectResults = redirectTests.map(test => 
    testRedirect(test.source, test.expectedRedirect)
  );
  
  redirectResults.forEach(result => {
    console.log(`${result.result === 'PASS' ? '✓' : '✗'} ${result.source} → ${result.expected} (${result.status || 'Unknown'})`);
    if (result.result !== 'PASS') {
      console.log(`   Got: ${result.location || 'No redirect'}`);
    }
  });
  
  // Test sitemap
  console.log('\n2. SITEMAP TEST:');
  console.log('--------------');
  
  const sitemapResult = testSitemap();
  console.log(`${sitemapResult.result === 'PASS' ? '✓' : '✗'} sitemap.xml (${sitemapResult.status || 'Unknown'})`);
  console.log(`   Valid XML: ${sitemapResult.isValidXML ? 'Yes' : 'No'}`);
  console.log(`   Has Entries: ${sitemapResult.hasEntries ? 'Yes' : 'No'}`);
  
  // Test robots.txt
  console.log('\n3. ROBOTS.TXT TEST:');
  console.log('------------------');
  
  const robotsResult = testRobotsTxt();
  console.log(`${robotsResult.result === 'PASS' ? '✓' : '✗'} robots.txt (${robotsResult.status || 'Unknown'})`);
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
  
  const metadataResults = pagesToTest.map(path => testMetadata(path));
  
  metadataResults.forEach(result => {
    console.log(`${result.result === 'PASS' ? '✓' : '✗'} ${result.path} (${result.status || 'Unknown'})`);
    console.log(`   JSON-LD: ${result.hasLdJson ? 'Yes' : 'No'}`);
    console.log(`   OG Tags: ${result.hasOgTags ? 'Yes' : 'No'}`);
    console.log(`   Canonical: ${result.hasCanonical ? 'Yes' : 'No'}`);
    console.log(`   Alternates: ${result.hasAlternates ? 'Yes' : 'No'}`);
  });
  
  // Summary
  console.log('\n=== SUMMARY ===');
  
  const totalTests = redirectResults.length + 1 + 1 + metadataResults.length;
                   
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
runTests();
