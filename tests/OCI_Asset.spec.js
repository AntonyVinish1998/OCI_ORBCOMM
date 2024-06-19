import { test } from '@playwright/test';  // Importing 'test' from Playwright's test framework for defining tests
import { login } from '../PageObject/login';  // Importing the 'login' function from the login module in PageObject folder
import { waitForPageLoad } from '../PageObject/wait';  // Importing 'waitForPageLoad' function from wait module in PageObject folder
import DashboardActions from '../PageObject/Navigate';  // Importing DashboardActions class from Navigate module in PageObject folder
import SearchActions from '../PageObject/Search';  // Importing SearchActions class from Search module in PageObject folder
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector';  // Importing PerformanceMetricsCollector class from Common folder
import { selectFromDateWithFilter } from '../PageObject/DateUtils';  // Importing 'selectFromDateWithFilter' function from DateUtils module in PageObject folder


test('OCI_AssetDashboard', async ({ page }) => {
  console.log("OCI_AssetDashboard");
  
  // Set the test timeout to 10 minutes
  test.setTimeout(600000);

  // Login to the application and record the start time
  const start = await login(page);

  // Navigate to Asset Dashboard
  await new DashboardActions(page).navigateToAssetDashboard();

  // Select "From Date" as two weeks prior to the current date for a two-week report.
  await selectFromDateWithFilter(page);

  // Perform the search action on the Asset Dashboard
  await new SearchActions(page).SearchclickAssetDashboard();
  
  // Wait until the page is fully loaded
  await waitForPageLoad(page);
  
  // Collect and write performance metrics to InfluxDB
  const performanceMetricsCollector = new PerformanceMetricsCollector();
  await performanceMetricsCollector.collectAndWriteMetrics(page, start, 'Asset Dashboard');
 
  // Close the page after the test is complete
  await page.close();
});
