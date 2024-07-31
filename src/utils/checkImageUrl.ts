export function checkImageUrl(url: string) {
  const urlForCheck = '/i.imgur.com';
  return url.includes(urlForCheck);
}
