const fs = require("fs");
const path = require("path");

// Writes /llms.txt (https://llmstxt.org) from the docs sidebar at build time,
// so AI assistants get an up-to-date index of the documentation.
module.exports = function llmsTxtPlugin(context, options) {
  let version = null;

  function collectDocIds(item, ids) {
    if (typeof item === "string") {
      ids.push(item);
    } else if (item.type === "doc" || item.type === "ref") {
      ids.push(item.id);
    } else if (item.type === "category") {
      if (item.link && item.link.type === "doc") {
        ids.push(item.link.id);
      }
      (item.items || []).forEach((child) => collectDocIds(child, ids));
    }
    return ids;
  }

  return {
    name: "llms-txt",

    async allContentLoaded({allContent}) {
      const docsContent = allContent["docusaurus-plugin-content-docs"];
      version = docsContent && docsContent.default ? docsContent.default.loadedVersions[0] : null;
    },

    async postBuild({outDir, siteConfig}) {
      if (!version) {
        return;
      }

      const docsById = new Map(version.docs.map((doc) => [doc.id, doc]));
      const siteUrl = siteConfig.url.replace(/\/$/, "");
      const formatDoc = (id) => {
        const doc = docsById.get(id);
        if (!doc) {
          return null;
        }
        const description = (doc.description || "").replace(/\s+/g, " ").trim();
        const permalink = siteConfig.trailingSlash && !doc.permalink.endsWith("/") ? `${doc.permalink}/` : doc.permalink;
        return `- [${doc.title}](${siteUrl}${permalink})${description ? `: ${description}` : ""}`;
      };

      const sections = [];
      const ungrouped = [];
      const seen = new Set();
      Object.values(version.sidebars).forEach((sidebar) => {
        sidebar.forEach((item) => {
          const ids = collectDocIds(item, []).filter((id) => !seen.has(id));
          ids.forEach((id) => seen.add(id));
          const lines = ids.map(formatDoc).filter(Boolean);
          if (item.type === "category") {
            if (lines.length > 0) {
              sections.push(`## ${item.label}\n\n${lines.join("\n")}`);
            }
          } else {
            ungrouped.push(...lines);
          }
        });
      });
      if (ungrouped.length > 0) {
        sections.push(`## More\n\n${ungrouped.join("\n")}`);
      }

      const links = (options.links || []).map((link) => `- [${link.title}](${link.url})${link.description ? `: ${link.description}` : ""}`);
      if (links.length > 0) {
        sections.push(`## Optional\n\n${links.join("\n")}`);
      }

      const content = `# ${options.title}\n\n> ${options.summary}\n\n${sections.join("\n\n")}\n`;
      fs.writeFileSync(path.join(outDir, "llms.txt"), content);
    },
  };
};
