import { test } from '@playwright/test';// Importing 'test' from Playwright's test framework for defining tests
import { login } from '../PageObject/login';// Importing the 'login' function from the login module in PageObject folder
import { waitForPageLoad } from '../PageObject/wait';// Importing 'waitForPageLoad' function from wait module in PageObject folder
import DashboardActions from '../PageObject/Navigate';// Importing DashboardActions class from Navigate module in PageObject folder
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector'; // Importing PerformanceMetricsCollector class from Common folder

test('OCI_FleetDashboard', async ({ page }) => {
    console.log("OCI_FleetDashboard");

    // Set the test timeout to 200 seconds
    test.setTimeout(200000);
    
    // Login to the application and record the start time
    const startTime = await login(page);
    
    // Navigate to Fleet Dashboard
    await new DashboardActions(page).navigateToFleetDashboard();
    
    // Wait for the page to fully load
    await waitForPageLoad(page);
    
    // Collect and write performance metrics for Fleet Dashboard
    const performanceMetricsCollector = new PerformanceMetricsCollector();
    await performanceMetricsCollector.collectAndWriteMetrics(page, startTime, 'Fleet Dashboard');
    
    // Close the page after the test completes
    await page.close();
});
