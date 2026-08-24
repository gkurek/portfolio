export const site = {
  name: "Grzegorz Kurek",
  title: "Software Engineer",
  description: "Can I kick it?",
  url: "https://grzegorzkurek.pl",
  social: [
    {
      id: "github",
      icon: "fab fa-github",
      url: "https://github.com/gkurek",
      title: "GitHub profile",
    },
    {
      id: "linkedin",
      icon: "fab fa-linkedin",
      url: "https://www.linkedin.com/in/grzegorz-kurek",
      title: "LinkedIn profile",
    },
  ],
  projects: [
    {
      id: "patience",
      label: "1",
      title: "patience game",
      path: "/projects/patience",
    },
    {
      id: "natours",
      label: "2",
      title: "natours",
      path: "/projects/natours",
    },
    {
      id: "merdillo",
      label: "3",
      title: "medrillo",
      path: "/projects/merdillo",
    },
  ],
} as const;
