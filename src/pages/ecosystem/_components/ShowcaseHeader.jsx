import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import React from "react";
import {DESCRIPTION, TITLE} from "@site/src/pages/ecosystem";
import Tooltip from "@site/src/pages/ecosystem/_components/ShowcaseTooltip";
const SUBMIT_URL = "https://github.com/apache/casbin-website/tree/master/src/tableData";

export default function ShowcaseHeader() {
  const tooltipText = "Fork the repository, find the files in the tableData folder, add a new item, and submit a pull request (click to open tableData folder)";

  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
      <Tooltip anchorEl="#__docusaurus" text={tooltipText}>
        <Link className="button button--primary" to={SUBMIT_URL}>
          <Translate id="showcase.header.button">🚀 Want to contribute a new plugin?</Translate>
        </Link>
      </Tooltip>
    </section>
  );
}
