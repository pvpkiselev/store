export function cleanUrl(url: string): string {
  const cleanedUrl = url.replace(/^[^\w]+|[^\w]+$/g, '');
  return cleanedUrl;
}
