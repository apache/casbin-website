import React, {useEffect, useState} from "react";
import Giscus from "@giscus/react";
import Translate from "@docusaurus/Translate";
import {useColorMode} from "@docusaurus/theme-common";

// ASF privacy policy: third-party content may only load after the visitor opts in.
const consentKey = "casbin-giscus-consent";

export default function GiscusComments() {
  const {colorMode} = useColorMode();
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    try {
      setConsented(localStorage.getItem(consentKey) === "1");
    } catch (e) {
      // localStorage may be unavailable
    }
  }, []);

  const setConsent = (value) => {
    try {
      if (value) {
        localStorage.setItem(consentKey, "1");
      } else {
        localStorage.removeItem(consentKey);
      }
    } catch (e) {
      // localStorage may be unavailable
    }
    setConsented(value);
  };

  return (
    <div id="comments" className="margin-top--lg">
      {consented ? (
        <>
          <Giscus
            repo="apache/casbin"
            repoId="MDEwOlJlcG9zaXRvcnk4NzYxNzUwOA=="
            category="Docs comments"
            categoryId="DIC_kwDOBTjv5M4CRIiA"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={colorMode}
            lang="en"
            loading="lazy"
          />
          <button className="button button--link padding-horiz--none" type="button" onClick={() => setConsent(false)}>
            <Translate>Hide comments</Translate>
          </button>
        </>
      ) : (
        <div className="padding--md" style={{border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "var(--ifm-global-radius)"}}>
          <p>
            <Translate
              values={{giscus: <a href="https://giscus.app/" target="_blank" rel="noopener noreferrer">giscus</a>}}
            >
              {"Comments are powered by {giscus} and GitHub Discussions. They load from giscus.app and GitHub only after you click the button below."}
            </Translate>
          </p>
          <button className="button button--primary" type="button" onClick={() => setConsent(true)}>
            <Translate>Show comments</Translate>
          </button>
        </div>
      )}
    </div>
  );
}
