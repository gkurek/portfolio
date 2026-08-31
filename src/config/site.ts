export type SocialId = 'github' | 'linkedin';

export const site = {
  name: 'Grzegorz Kurek',
  tagline: 'can i kick it?',
  jobTitle: 'Software Engineer',
  seoTitle: 'Grzegorz Kurek — Software Engineer',
  seoDescription:
    'Grzegorz Kurek — software engineer focused on clean, performant web applications.',
  url: 'https://grzegorzkurek.pl',
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Grzegorz Kurek — animated dot sphere on dark background',
  social: [
    {
      id: 'github' satisfies SocialId,
      url: 'https://github.com/gkurek',
      title: 'GitHub profile',
    },
    {
      id: 'linkedin' satisfies SocialId,
      url: 'https://www.linkedin.com/in/grzegorz-kurek',
      title: 'LinkedIn profile',
    },
  ],
} as const;
