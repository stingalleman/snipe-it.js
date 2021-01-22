/* eslint-disable @typescript-eslint/no-explicit-any */
import { URLSearchParams } from 'url';

export function getApiURL(snipeURL: string, slug: string, options?: any): string {
  // Check for / at end
  // eslint-disable-next-line no-throw-literal
  if (slug.charAt(slug.length - 1) === '/') throw '/ at end of API endpoint! pls fix';

  return `${snipeURL}/api/v1${slug}?${new URLSearchParams(options).toString()}`;
};
