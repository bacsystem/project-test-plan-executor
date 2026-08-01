import { ThemeVariant } from "@/constants";

type ThemeImageConfig = {
  [key in ThemeVariant]?: string | string[];
};

type ImageSrcSet = string | string[] | ThemeImageConfig;

type CurrentThemeConfig = {
  theme: ThemeVariant;
  isDarkMode: boolean;
};

type GetThemeImageParams = {
  srcSet: ImageSrcSet;
  current: CurrentThemeConfig;
  directory?: string;
};

/**
 * Gets the appropriate image based on theme and mode options
 * @param params - Configuration object containing:
 *                 - srcSet: Can be:
 *                   1. string: Same image for all variants
 *                   2. string[]: If length=1: same image for both modes, if length=2: [light image, dark image]
 *                   3. ThemeImageConfig: Theme-specific images
 *                 - current: Current theme configuration
 *                   - theme: Current theme variant
 *                   - isDarkMode: Current dark mode status
 *                 - directory: Optional directory prefix for all image paths
 * @returns string The resolved image path
 */
export function getThemeImage({ srcSet, current, directory }: GetThemeImageParams): string {
  // Helper function to add directory prefix
  const addDirectory = (path: string) => (directory ? `${directory}${path}` : path);

  // Helper function to handle array configs
  const handleArrayConfig = (arr: string[]) => {
    if (arr.length === 1) return addDirectory(arr[0]);
    if (arr.length === 2) {
      const [lightImage, darkImage] = arr;
      return addDirectory(current.isDarkMode ? darkImage : lightImage);
    }
    return "";
  };

  // Case 1: Single string - same image for all variants
  if (typeof srcSet === "string") {
    return addDirectory(srcSet);
  }

  // Case 2: Array of images
  if (Array.isArray(srcSet)) {
    return handleArrayConfig(srcSet);
  }

  // Case 3: Theme-specific configuration
  const themeConfig = srcSet[current.theme];
  if (themeConfig) {
    // If theme config is a string, use it for all modes
    if (typeof themeConfig === "string") {
      return addDirectory(themeConfig);
    }
    // If theme config is an array, handle it
    if (Array.isArray(themeConfig)) {
      return handleArrayConfig(themeConfig);
    }
  }

  return "";
}
