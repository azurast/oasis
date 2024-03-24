import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Thought Oasis",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: [
      "private", 
      "**/private",
      "0. Directory",
      "1. Projects",
      "2. Areas/⌨️ Writing",
      "2. Areas/🏃🏻‍♀️Health and Fitness",
      "2. Areas/💡 Boards",
      "2. Areas/🏢 Work",
      "2. Areas/📖 Books",
      "2. Areas/📝 Notes",
      "2. Areas/💻 Computer Science/🎓 Master's Studies",
      "3. Resources",
      "4. Archives",
      "templates", 
      ".obsidian"
    ],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Hiragino Sans",
        body: "Hiragino Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#38495c",
          dark: "#334150",
          secondary: "#2e9bba",
          tertiary: "#929982",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#202326",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d7d7d7",
          dark: "#ffffff",
          secondary: "#8DD0E2",
          tertiary: "#C4C8BC",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
