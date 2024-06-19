import { test } from '@playwright/test';  // Importing 'test' from Playwright's test framework for defining tests
import { login } from '../PageObject/login';  // Importing the 'login' function from the login module in PageObject folder
import { waitForPageLoad } from '../PageObject/wait';  // Importing 'waitForPageLoad' function from wait module in PageObject folder
import DashboardActions from '../PageObject/Navigate';  // Importing DashboardActions class from Navigate module in PageObject folder
import SearchActions from '../PageObject/Search';  // Importing SearchActions class from Search module in PageObject folder
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector';  // Importing PerformanceMetricsCollector class from Common folder
import { selectFromDateWithFilter } from '../PageObject/DateUtils';  // Importing 'selectFromDateWithFilter' function from DateUtils module in PageObject folder


test('OCI_GeofenceWorkspace', async ({ page }) => {
    console.log("OCI_GeofenceWorkspace");

    // Set the test timeout to 200 seconds
    test.setTimeout(200000);
    
    // Login to the application and record the start time
    const start = await login(page);

    // Navigate to Geofence Workspace
    await new DashboardActions(page).navigateToGeofenceWorkspace();

    // Select "From Date" as two weeks prior to the current date for a two-week report.
    await selectFromDateWithTextbox(page);

    // Perform the search action on the Geofence Workspace
    await new SearchActions(page).SearchclickGeofenceWorkspace();

    // Wait until the page is fully loaded
    await waitForPageLoad(page);
  
    // Collect and write performance metrics to InfluxDB
    const performanceMetricsCollector = new PerformanceMetricsCollector();
    await performanceMetricsCollector.collectAndWriteMetrics(page, start, 'Geofence Workspace');

    // Close the page after the test is complete
    await page.close();
});
