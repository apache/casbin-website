const path = require("path");
const {readExistingJson, writeJson} = require("./github-data-utils");

// Podling releases live under /incubator/; drop that segment once Casbin graduates.
const distPath = "incubator/casbin";
// Checksums, signatures and KEYS must come from the ASF distribution directory,
// while the source archive itself must go through the closer.lua mirror script.
// See https://infra.apache.org/release-download-pages.html
const downloadsBase = `https://downloads.apache.org/${distPath}`;
const mirrorBase = `https://www.apache.org/dyn/closer.lua/${distPath}`;

const outputPath = path.join(__dirname, "..", "src", "data", "asf-release.json");
const fallbackVersion = "3.11.0-incubating";

function buildRelease(version, sourceFile) {
  return {
    generatedAt: new Date().toISOString(),
    version,
    sourceUrl: `${mirrorBase}/${version}/${sourceFile}`,
    signatureUrl: `${downloadsBase}/${version}/${sourceFile}.asc`,
    checksumUrl: `${downloadsBase}/${version}/${sourceFile}.sha512`,
    keysUrl: `${downloadsBase}/KEYS`,
  };
}

async function fetchListing(url) {
  const response = await fetch(url, {
    headers: {"User-Agent": "casbin-website-asf-release"},
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to fetch ASF release listing ${url}: ${response.status} ${body}`);
  }

  return response.text();
}

function parseHrefs(html) {
  return [...html.matchAll(/href="([^"]+)"/gu)].map((match) => match[1]);
}

function compareVersions(left, right) {
  const toParts = (version) => version.split("-")[0].split(".").map(Number);
  const leftParts = toParts(left);
  const rightParts = toParts(right);

  for (let i = 0; i < Math.max(leftParts.length, rightParts.length); i += 1) {
    const diff = (leftParts[i] ?? 0) - (rightParts[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

async function fetchLatestRelease() {
  const versions = parseHrefs(await fetchListing(`${downloadsBase}/`))
    .filter((href) => /^\d+\.\d+[^/]*\/$/u.test(href))
    .map((href) => href.replace(/\/$/u, ""))
    .sort(compareVersions);

  const version = versions[versions.length - 1];
  if (!version) {
    throw new Error(`Found no release directory under ${downloadsBase}/`);
  }

  const sourceFile = parseHrefs(await fetchListing(`${downloadsBase}/${version}/`))
    .map((href) => href.split("/").pop())
    .find((file) => file.endsWith("-src.tar.gz"));

  if (!sourceFile) {
    throw new Error(`Found no source archive under ${downloadsBase}/${version}/`);
  }

  return buildRelease(version, sourceFile);
}

async function main() {
  const existingRelease = readExistingJson(outputPath);

  try {
    writeJson(outputPath, await fetchLatestRelease());
    process.stdout.write(`Updated ASF release at ${outputPath}\n`);
  } catch (error) {
    if (existingRelease?.version && existingRelease?.sourceUrl) {
      process.stderr.write(`${error.message}\nUsing existing ASF release JSON.\n`);
      return;
    }

    writeJson(
      outputPath,
      buildRelease(fallbackVersion, `apache-casbin-${fallbackVersion}-src.tar.gz`)
    );
    process.stderr.write(`${error.message}\nUsing fallback ASF release JSON.\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
