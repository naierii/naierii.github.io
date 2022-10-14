/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formats } from './types';

function getSrcSet(formats: Formats): string | null {
  if (!formats) return null;

  const fff = Object.entries(formats)
    .map((f) => {
      return f[1]
        ? {
            width: f[1].width,
            url: f[1].url,
          }
        : null;
    })
    .filter((format) => format);

  return !fff.length
    ? null
    : fff
        .sort((a, b) => {
          if (a?.width && b?.width && a.width < b.width) return -1;
          if (a?.width && b?.width && a.width > b.width) return 1;
          return 0;
        })
        .reduce((acc: any, current: any, index: number, array: any) => {
          return acc + `${current.url} ${current.width}w${index < array.length - 1 ? ', ' : ''}`;
        }, '');
}

export default function getSrcSets(formats: Formats): string | null {
  return getSrcSet(formats);
}
