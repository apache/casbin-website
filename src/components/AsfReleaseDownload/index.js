import React from "react";
import Translate from "@docusaurus/Translate";
import release from "@site/src/data/asf-release.json";

// The release metadata is refreshed at build time by scripts/generate-asf-release.js,
// so a new ASF release shows up here without editing the download page.
export default function AsfReleaseDownload() {
  return (
    <ul>
      <li>
        <a href={release.sourceUrl}>
          <Translate
            values={{version: release.version}}
          >
            {"Apache Casbin {version} source release"}
          </Translate>
        </a>
        {" ("}
        <a href={release.signatureUrl}>
          <Translate>PGP signature</Translate>
        </a>
        {", "}
        <a href={release.checksumUrl}>SHA-512</a>
        {")"}
      </li>
      <li>
        <a href={release.keysUrl}>
          <Translate>Release signing keys (KEYS)</Translate>
        </a>
      </li>
    </ul>
  );
}
