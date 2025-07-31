// Authentication Helper for Service Form Testing
// This file provides utilities for handling authentication in the service form

// Set test mode (bypasses real API calls)
function enableTestMode() {
    localStorage.setItem('testMode', 'true');
    console.log('Test mode enabled - API calls will be simulated');
}

// Disable test mode
function disableTestMode() {
    localStorage.removeItem('testMode');
    console.log('Test mode disabled - real API calls will be made');
}

// Set mock authentication token
function setMockAuthToken(token = 'mock-token-12345') {
    localStorage.setItem('authToken', token);
    console.log('Mock auth token set:', token);
}

// Set mock API key
function setMockApiKey(key = 'mock-api-key-67890') {
    localStorage.setItem('apiKey', key);
    console.log('Mock API key set:', key);
}

// Clear all authentication
function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('apiKey');
    console.log('Authentication cleared');
}

// Check if user is authenticated
function isAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    const apiKey = localStorage.getItem('apiKey');
    return !!(authToken || apiKey);
}

// Get authentication status
function getAuthStatus() {
    return {
        isAuthenticated: isAuthenticated(),
        hasAuthToken: !!localStorage.getItem('authToken'),
        hasApiKey: !!localStorage.getItem('apiKey'),
        testMode: localStorage.getItem('testMode') === 'true'
    };
}

// Setup for testing
function setupForTesting() {
    enableTestMode();
    setMockAuthToken();
    setMockApiKey();
    console.log('Setup complete for testing. You can now test the form without real API calls.');
}

// Export functions for use in browser console
window.authHelper = {
    enableTestMode,
    disableTestMode,
    setMockAuthToken,
    setMockApiKey,
    clearAuth,
    isAuthenticated,
    getAuthStatus,
    setupForTesting
};

console.log('Auth helper loaded. Use authHelper.setupForTesting() to enable test mode.');
console.log('Available functions:');
console.log('- authHelper.setupForTesting() - Enable test mode with mock auth');
console.log('- authHelper.enableTestMode() - Enable test mode only');
console.log('- authHelper.disableTestMode() - Disable test mode');
console.log('- authHelper.getAuthStatus() - Check current auth status');
console.log('- authHelper.clearAuth() - Clear all auth data');