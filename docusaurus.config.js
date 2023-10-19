// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CasparCG",
  tagline:
    "CasparCG Server is a Windows and Linux software used to play out professional graphics, audio and video to multiple outputs. It has been in 24/7 broadcast production since 2006.",
  url: "https://casparcg.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "casparcg", // Usually your GitHub org/user name.
  projectName: "casparcg.github.io", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/casparcg/casparcg.github.io/tree/docusaurus/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "CasparCG",
        logo: {
          alt: "CasparCG Logo",
          src: "img/casparcg_logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "downloads/server-client",
            position: "left",
            label: "Downloads",
          },
          {
            href: "https://casparcgforum.org",
            label: "Forum",
            position: "left",
          },
          {
            href: "https://github.com/casparcg/help/wiki",
            label: "Wiki",
            position: "left",
          },
          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Tutorial",
          // },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/casparcg",
            label: "GitHub",
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
                label: "Downloads",
                to: "/docs/downloads/server-client",
              },
              {
                label: "Wiki",
                to: "https://github.com/casparcg/help/wiki",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Forum",
                href: "https://casparcgforum.org",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/casparcg",
              },
              {
                label: "Facebook",
                href: "https://facebook.com/casparcg",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Beta builds",
                href: "https://casparcg.com/builds",
              },
              {
                label: "GitHub",
                href: "https://github.com/casparcg",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CasparCG. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
