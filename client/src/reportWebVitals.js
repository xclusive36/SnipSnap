// This function is used to report web vitals to an external analytics service or monitoring tool.

const reportWebVitals = onPerfEntry => {
  // Check if the "onPerfEntry" is a function before proceeding.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the "web-vitals" library using "import()" which supports code-splitting.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each web vital function and pass the "onPerfEntry" callback to report the measurement.

      getCLS(onPerfEntry); // Cumulative Layout Shift (CLS)
      getFID(onPerfEntry); // First Input Delay (FID)
      getFCP(onPerfEntry); // First Contentful Paint (FCP)
      getLCP(onPerfEntry); // Largest Contentful Paint (LCP)
      getTTFB(onPerfEntry); // Time to First Byte (TTFB)
    });
  }
};

// Export the "reportWebVitals" function to make it available for usage in other parts of the app.
export default reportWebVitals;
