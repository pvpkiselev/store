export function parseImageUrls(imageUrlString: string): string[] {
  const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|webp|svg))$/;

  try {
    const parsedUrls = JSON.parse(imageUrlString);

    if (Array.isArray(parsedUrls)) {
      return parsedUrls.filter((url) => typeof url === 'string' && urlPattern.test(url));
    } else if (typeof parsedUrls === 'string' && urlPattern.test(parsedUrls)) {
      return [parsedUrls];
    } else {
      throw new Error('Parsed data is neither a valid string nor a valid array of strings');
    }
  } catch (error) {
    console.error('Failed to parse image URLs:', error);
    return [];
  }
}
