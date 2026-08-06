const {themes} = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import("@docusaurus/types").DocusaurusConfig} */
module.exports = {
  title: "Apache Casbin (Incubating)",
  tagline:
    "An authorization library that supports access control models like ACL, RBAC, ABAC, ReBAC, PBAC, OrBAC, BLP, Biba, LBAC, UCON for Golang, Java, C/C++, Node.js, Javascript, PHP, Laravel, Python, .NET (C#), Delphi, Rust, Ruby, Swift (Objective-C), Lua (OpenResty), Dart (Flutter) and Elixir",
  url: "https://casbin.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  favicon: "img/favicon.png",
  organizationName: "casbin", // Usually your GitHub org/user name.
  projectName: "casbin.io", // Usually your repo name.
  themeConfig: {
    metadata: [
      {
        name: "Apache Casbin",
        content:
          "An authorization library that supports access control models like ACL, RBAC, ABAC, ReBAC, PBAC, OrBAC, BLP, Biba, LBAC, UCON for Golang, Java, C/C++, Node.js, Javascript, PHP, Laravel, Python, .NET (C#), Delphi, Rust, Ruby, Swift (Objective-C), Lua (OpenResty), Dart (Flutter) and Elixir",
      },
    ],
    algolia: {
      appId: "6NBEV8TOFK",
      apiKey: "f00fe67a071e60e18a5c85ae314bba55",
      indexName: "casbin-v2",
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Apache Casbin",
      logo: {
        alt: "Casbin Logo",
        src: "img/casbin.svg",
      },
      hideOnScroll: true,
      items: [
        {
          label: "Docs",
          position: "left",
          to: "/docs/overview",
          items: [
            {
              label: "Get Started",
              to: "/docs/get-started",
            },
            {
              label: "Model",
              to: "/docs/category/access-control-models",
            },
            {
              label: "Storage",
              to: "/docs/category/storage",
            },
            {
              label: "Adapters",
              to: "/docs/adapters",
            },
            {
              label: "API",
              to: "/docs/category/api",
            },
            {
              label: "IDE plugins",
              to: "/docs/ide-plugins",
            },
            {
              label: "Start Contributing",
              to: "/docs/contributing",
            },
          ],
        },
        {
          to: "/ecosystem",
          label: "Plugins",
          position: "left",
        },
        {
          href: "https://editor.casbin.org/gallery",
          label: "Authorization Models",
          position: "left",
        },
        {
          href: "https://editor.casbin.org/",
          label: "GUI Policy Editor",
          position: "left",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          label: "ASF",
          position: "left",
          items: [
            {
              label: "Foundation",
              href: "https://www.apache.org/",
            },
            {
              label: "License",
              href: "https://www.apache.org/licenses/",
            },
            {
              label: "Events",
              href: "https://www.apache.org/events/current-event.html",
            },
            {
              label: "Privacy",
              href: "https://privacy.apache.org/policies/privacy-policy-public.html",
            },
            {
              label: "Security",
              href: "https://www.apache.org/security/",
            },
            {
              label: "Sponsorship",
              href: "https://www.apache.org/foundation/sponsorship.html",
            },
            {
              label: "Thanks",
              href: "https://www.apache.org/foundation/thanks.html",
            },
            {
              label: "Code of Conduct",
              href: "https://www.apache.org/foundation/policies/conduct.html",
            },
          ],
        },
        {
          to: "/help",
          label: "Help",
          position: "left",
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              type: "html",
              value: "<hr style=\"margin: 0.3rem 0;\">",
            },
            {
              href: "https://crowdin.com/project/casbin-website",
              label: "Help Us Translate",
            },
          ],
        },
        {
          href: "https://github.com/casbin/casbin",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          type: "custom-community",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/get-started",
            },
            {
              label: "Management API",
              to: "/docs/management-api",
            },
            {
              label: "RBAC API",
              to: "/docs/rbac-api",
            },
            {
              label: "Middlewares",
              to: "/docs/middlewares",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              html: `
                <a href="https://discord.gg/S5UjpzGZjN" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link">
                  <svg class="footer-community-icon" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  <span>Discord</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://stackoverflow.com/search?q=casbin" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link">
                  <svg class="footer-community-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                  </svg>
                  <span>Stack Overflow</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://groups.google.com/g/casbin" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link">
                  <svg class="footer-community-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  <span>Google Groups</span>
                </a>
              `,
            },
          ],
        },
        {
          title: "More",
          className: "footer-more-column",
          items: [],
        },
      ],
      logo: {
        alt: "Apache Incubator",
        src: "img/incubator_feather_egg_logo_sm.png",
        href: "https://incubator.apache.org/",
      },
      copyright: `<p>Apache Casbin (Incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p><p>Copyright © ${new Date().getFullYear()} The Apache Software Foundation, Licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p><p>Apache, the names of Apache projects, and the feather logo are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries. All other marks mentioned may be trademarks or registered trademarks of their respective owners.</p>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: [
        "ini",
        "csv",
        "lua",
        "csharp",
        "java",
        "php",
        "rust",
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsed: false,
          editUrl: ({docPath}) => {
            return `https://github.com/apache/casbin-website/edit/master/docs/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          onUntruncatedBlogPosts: "ignore",
          editUrl: ({blogDirPath, blogPath}) => {
            return `https://github.com/apache/casbin-website/edit/master/${blogDirPath}/${blogPath}`;
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: [
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "ko", "ru", "fr", "de", "ja", "es", "pt", "uk", "th", "ar", "id", "vi", "it", "ms", "tr"],
  },
  customFields: {
    customMessage: "", // Set any custom message here; leave empty to show the latest version message
    customLink: "", // Set a custom link here; leave empty to link to the latest release
  },
};
