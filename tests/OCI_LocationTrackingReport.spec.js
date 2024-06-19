import { test } from '@playwright/test';  // Importing 'test' from Playwright's test framework for defining tests
import { login } from '../PageObject/login';  // Importing the 'login' function from the login module in PageObject folder
import { waitForPageLoad } from '../PageObject/wait';  // Importing 'waitForPageLoad' function from wait module in PageObject folder
import DashboardActions from '../PageObject/Navigate';  // Importing DashboardActions class from Navigate module in PageObject folder
import SearchActions from '../PageObject/Search';  // Importing SearchActions class from Search module in PageObject folder
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector';  // Importing PerformanceMetricsCollector class from Common folder
import { selectFromDateWithFilter } from '../PageObject/DateUtils';  // Importing 'selectFromDateWithFilter' function from DateUtils module in PageObject folder


test('OCI_LocationTrackingReport', async ({ page }) => {
    console.log("OCI_LocationTrackingReport");
    
    // Set the test timeout to 10 minutes
    test.setTimeout(600000);
   
    // Login to the application and record the start time
    const start = await login(page);

    // Navigate to Location Tracking Report
    await new DashboardActions(page).navigateToLocationTrackingReport();

    // Select "From Date" as two weeks prior to the current date for a two-week report.
    await selectFromDateWithTextbox(page);
    
    // Perform the search action on the Location Tracking Report
    await new SearchActions(page).SearchclickLocationTrackingReport();
    
    // Wait until the page is fully loaded
    await waitForPageLoad(page);

    // Collect and write performance metrics to InfluxDB
    const performanceMetricsCollector = new PerformanceMetricsCollector();
    await performanceMetricsCollector.collectAndWriteMetrics(page, start, 'Location Tracking Report');

    // Close the page after the test is complete
    await page.close();
});
