/* eslint-disable */
// Define a function to check if the page is fully loaded
function hideLoader() {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    // Set opacity to 0 to fade out
    loader.style.opacity = '0';

    // Remove from DOM after transition
    setTimeout(() => {
      if (loader.parentNode) {
        loader.style.display = 'none';
      }
    }, 500);
  }
}

// Use document ready state to check when the page is loaded
if (document.readyState === 'complete') {
  hideLoader();
} else {
  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') {
      // Add a small delay to ensure React has hydrated
      setTimeout(hideLoader, 300);
    }
  });
}

// Safety timeout to ensure the loader is eventually removed
// even if readyState never reaches 'complete' for some reason
setTimeout(hideLoader, 5000); 