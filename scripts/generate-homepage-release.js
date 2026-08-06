const path = require("path");
const {
  fetchGitHubJson,
  readExistingJson,
  writeJson,
} = require("./github-data-utils");

const outputPath = path.join(__dirname, "..", "src", "data", "latest-release.json");
const fallbackTag = "v3.4.1";
const fallbackUrl = `https://github.com/apache/casbin/releases/tag/${fallbackTag}`;

async function fetchLatestRelease() {
  const data = await fetchGitHubJson(
    "https://api.github.com/repos/apache/casbin/releases/latest",
    "casbin-website-homepage-release",
    "latest homepage release"
  );

  return {
    generatedAt: new Date().toISOString(),
    tagName: data.tag_name || fallbackTag,
    url: data.html_url || fallbackUrl,
  };
}

async function main() {
  const existingRelease = readExistingJson(outputPath);

  try {
    const payload = await fetchLatestRelease();
    writeJson(outputPath, payload);
    process.stdout.write(`Updated homepage release at ${outputPath}\n`);
  } catch (error) {
    if (existingRelease?.tagName && existingRelease?.url) {
      process.stderr.write(`${error.message}\nUsing existing homepage release JSON.\n`);
      return;
    }

    writeJson(outputPath, {
      generatedAt: new Date().toISOString(),
      tagName: fallbackTag,
      url: fallbackUrl,
    });
    process.stderr.write(`${error.message}\nUsing fallback homepage release JSON.\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
