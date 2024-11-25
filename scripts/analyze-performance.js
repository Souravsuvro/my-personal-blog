import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: ['html', 'json'],
    onlyCategories: ['performance'],
    port: chrome.port
  };

  try {
    const runnerResult = await lighthouse('http://localhost:3002', options);
    const { lhr } = runnerResult;

    // Save the report
    const reportPath = path.join(__dirname, '../lighthouse-report.html');
    await fs.writeFile(reportPath, runnerResult.report[0]);
    console.log(`\nReport saved to: ${reportPath}`);

    // Performance Score
    console.log('\n📊 Performance Score:', Math.round(lhr.categories.performance.score * 100));

    // Core Web Vitals
    console.log('\n🌟 Core Web Vitals:');
    console.log('- First Contentful Paint (FCP):', lhr.audits['first-contentful-paint'].displayValue);
    console.log('- Largest Contentful Paint (LCP):', lhr.audits['largest-contentful-paint'].displayValue);
    console.log('- Total Blocking Time (TBT):', lhr.audits['total-blocking-time'].displayValue);
    console.log('- Cumulative Layout Shift (CLS):', lhr.audits['cumulative-layout-shift'].displayValue);

    // Performance Metrics
    console.log('\n📈 Other Performance Metrics:');
    console.log('- Time to Interactive:', lhr.audits['interactive'].displayValue);
    console.log('- Speed Index:', lhr.audits['speed-index'].displayValue);
    console.log('- First Meaningful Paint:', lhr.audits['first-meaningful-paint'].displayValue);

    // Opportunities
    console.log('\n🎯 Top Opportunities:');
    const opportunities = lhr.categories.performance.auditRefs
      .filter(audit => audit.group === 'load-opportunities')
      .map(audit => ({
        title: lhr.audits[audit.id].title,
        score: lhr.audits[audit.id].score,
        description: lhr.audits[audit.id].description
      }))
      .filter(opp => opp.score !== null && opp.score < 0.9);

    opportunities.forEach(opp => {
      console.log(`\n- ${opp.title}`);
      console.log(`  Score: ${Math.round(opp.score * 100)}%`);
    });

    // Diagnostics
    console.log('\n🔍 Key Diagnostics:');
    console.log('- Total JavaScript Size:', lhr.audits['total-byte-weight'].details?.items?.[0]?.totalBytes 
      ? `${Math.round(lhr.audits['total-byte-weight'].details.items[0].totalBytes / 1024)}KB` 
      : 'N/A');
    console.log('- DOM Size:', lhr.audits['dom-size'].displayValue);
    console.log('- Main Thread Work:', lhr.audits['mainthread-work-breakdown'].displayValue);

  } catch (error) {
    console.error('Error running Lighthouse:', error);
  } finally {
    await chrome.kill();
  }
}

runLighthouse().catch(error => {
  console.error('Error running Lighthouse:', error);
  process.exit(1);
});
