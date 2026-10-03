import React, {useEffect, useRef} from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import {UserList} from "@site/src/components/UserList";
import Translate from "@docusaurus/Translate";
import EditorPreview from "../components/EditorPreview";
import LanguageIntegration from "../components/LanguageIntegration";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import AnimatedText from "../components/AnimatedText";
import {Code, Zap} from "lucide-react";
import LogoCarousel from "@site/src/components/LogoCarousel";
import latestReleaseData from "@site/src/data/latest-release.json";

function HomepageHeader() {
  const headerRef = useRef(null);
  const haloRef = useRef(null);
  const {siteConfig} = useDocusaurusContext();
  const {customFields} = siteConfig;
  const latestVersion = latestReleaseData.tagName || "v3.4.1";
  const latestReleaseLink =
    latestReleaseData.url || `https://github.com/apache/casbin/releases/tag/${latestVersion}`;

  // Activate halo behavior for this header
  useHeroCursorHalo(headerRef, haloRef);

  const pillText = customFields?.customMessage || `${latestVersion} Released`;
  const link = customFields?.customLink || latestReleaseLink;

  return (
    <header ref={headerRef} className={clsx("hero hero--primary", styles.heroBanner)}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/img/background.png"
        aria-hidden="true"
        onEnded={(e) => {
          e.target.currentTime = 0;
          e.target.play();
        }}
      >
        <source src="/video/background.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroOverlay}></div>

      {/* Cursor halo element - placed after overlay so it sits above overlay but below content */}
      <div className={styles.cursorHalo} ref={haloRef} aria-hidden="true" />
      <div className={clsx("container", styles.heroContent)}>
        <Link href={link} target="_blank" rel="noopener noreferrer" className={styles.heroPill}>
          <span className={styles.pillNew}>NEWS</span>
          <span className={styles.pillText}>{pillText}</span>
          <span className={styles.pillArrow}>→</span>
        </Link>
        <h1 className="hero__title">
          <span className={styles.brandName}>Apache Casbin</span>
          <br />
          <span className={styles.taglineWrapper}>
            <span className={styles.tagline}><Translate>Open-source authorization for</Translate></span>&nbsp;&nbsp;
            <AnimatedText words={["applications", "clouds", "web apps", "AI gateway", "MCP"]} interval={3000} />
          </span>
          <br />
        </h1>
        <p className="hero__subtitle"><Translate>A powerful and efficient open-source access control library that supports multiple authorization models</Translate></p>
        <div className={styles.actionButtons}>
          <Link className={`button button--lg ${styles.getStartedBtn}`}
            to="/docs/get-started"
          >
            <Zap size={18} />
            <Translate>Get Started</Translate>
          </Link>
          <Link className={`button button--lg ${styles.tryEditorBtn}`}
            href="https://editor.casbin.org/"
          >
            <Code size={18} />
            <Translate>Try Online Editor</Translate>
          </Link>
        </div>
        {/* logo carousel in hero */}
        <div style={{marginTop: "18px"}}>
          <LogoCarousel />
        </div>
      </div>
    </header>
  );
}

// Cursor halo logic: position the halo inside the hero and show/hide on enter/leave
// Attach listeners in an effect so it only runs in browser
function useHeroCursorHalo(headerRef, haloRef) {
  useEffect(() => {
    if (typeof window === "undefined") {return;}
    const headerEl = headerRef.current;
    const haloEl = haloRef.current;
    if (!headerEl || !haloEl) {return;}

    let rafId = null;

    const onMove = (e) => {
      const rect = headerEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (rafId) {cancelAnimationFrame(rafId);}
      rafId = requestAnimationFrame(() => {
        // compute half width/height to center halo exactly at cursor
        const hw = (haloEl.offsetWidth || 100) / 2;
        const hh = (haloEl.offsetHeight || 100) / 2;
        // use translate3d for smoother GPU-assisted movement
        haloEl.style.transform = `translate3d(${x - hw}px, ${y - hh}px, 0)`;
        // subtle visible alpha when active
        haloEl.style.opacity = "0.25";
      });
    };

    const onLeave = () => {
      if (rafId) {cancelAnimationFrame(rafId);}
      haloEl.style.opacity = "0";
    };

    headerEl.addEventListener("mousemove", onMove);
    headerEl.addEventListener("mouseleave", onLeave);

    return () => {
      headerEl.removeEventListener("mousemove", onMove);
      headerEl.removeEventListener("mouseleave", onLeave);
      if (rafId) {cancelAnimationFrame(rafId);}
    };
  }, [headerRef, haloRef]);
}

function PolicyPersistence() {
  return (
    <div className={styles.policypersistence}>
      <div className="container text--center">
        <div className="row">
          <div className="col" style={{marginBlock: "auto"}}>
            <h3> <Translate>Policy Persistence</Translate></h3>
            <Translate
              values={{
                adaptersLink: (
                  <Link to="/docs/adapters">
                    <Translate>adapters</Translate>
                  </Link>
                ),
              }}
            >
              {"Apache Casbin stores policies through adapters. To keep the library lightweight, adapter code is separated from the main library (except for the default file adapter). We support third-party adapter contributions. See the full list of {adaptersLink} for more information."}
            </Translate>
          </div>
          <div style={{marginInline: "auto"}}>
            <img src="/img/store.png" alt="Policy Persistence" width="500" height="500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyEnforcement() {
  return (
    <div className={styles.policyenforcement}>
      <div className="container text--center">
        <div className="row">
          <div style={{marginInline: "auto"}}>
            <img src="/img/scale.png" alt="Policy enforcement at scale" width="500" height="500" />
          </div>
          <div className="col" style={{marginBlock: "auto"}}>
            <h3><Translate>Policy Enforcement at Scale</Translate></h3>
            <Translate>Some adapters support filtered policy loading. This means Apache Casbin can load only a subset of policies from storage based on specified filters. This feature is useful for large-scale, multi-tenant applications where loading all policies at once would be inefficient.</Translate>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleManager() {
  return (
    <div className={styles.rolemanager}>
      <div className="container text--center">
        <div className="row">
          <div className="col" style={{marginBlock: "auto"}}>
            <h3><Translate>Role Manager</Translate></h3>
            <Translate
              values={{
                rolemanagersLink: (
                  <Link to="/docs/role-managers">
                    <Translate>role-managers</Translate>
                  </Link>
                ),
              }}
            >
              {"The role manager handles RBAC role hierarchy (user-role mappings) in Apache Casbin. It can load role data from Apache Casbin policy rules or from external sources like LDAP, Okta, Auth0, Azure AD, etc. To keep the library lightweight, role manager code is separated from the main library (except for the default one). See all available {rolemanagersLink}."}
            </Translate>
          </div>
          <div style={{marginInline: "auto"}}>
            <img src="/img/role.png" alt="Role manager" width="500" height="500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  return (
    <div className="hero text--center showcase">
      <div className="container">
        <h2><Translate>Who&apos;s using Apache Casbin?</Translate></h2>
        <p style={{
          width: "50vw",
          margin: "auto",
        }}>
          <Translate values={{
            UsersPage: (
              <Link to="/users">
                <Translate>check out these apps</Translate>
              </Link>
            ),
          }}>
            {"Hundreds of projects use Apache Casbin, from Fortune 500 companies to new startups. If you want to see what can be built with Apache Casbin, {UsersPage}!"}
          </Translate>
        </p>
        <br /><br />
        <UserList />
      </div>
    </div>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://casbin.apache.org/#website",
      "name": "Apache Casbin",
      "url": "https://casbin.apache.org/",
      "publisher": {"@id": "https://www.apache.org/#organization"},
    },
    {
      "@type": "Organization",
      "@id": "https://www.apache.org/#organization",
      "name": "The Apache Software Foundation",
      "url": "https://www.apache.org/",
    },
    {
      "@type": "SoftwareSourceCode",
      "name": "Apache Casbin",
      "url": "https://casbin.apache.org/",
      "description": "Open-source authorization library that supports access control models such as ACL, RBAC, ABAC and ReBAC, with implementations for Go, Java, Node.js, Python, .NET, PHP, Rust, C++ and other languages.",
      "codeRepository": "https://github.com/apache/casbin",
      "programmingLanguage": ["Go", "Java", "JavaScript", "TypeScript", "Python", "C#", "PHP", "Rust", "C++"],
      "license": "https://www.apache.org/licenses/LICENSE-2.0",
      "publisher": {"@id": "https://www.apache.org/#organization"},
    },
  ],
};

export default function Home() {
  return (
    <Layout
      title="Open-Source Authorization Library for ACL, RBAC and ABAC"
      description="Apache Casbin is an open-source authorization library that supports ACL, RBAC, ABAC, ReBAC and more, with one model for Go, Java, Node.js, Python, .NET, PHP, Rust and C++.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <main>
        <HomepageHeader />
        <LanguageIntegration />
        <HomepageFeatures />
        <EditorPreview />
        <PolicyPersistence />
        <PolicyEnforcement />
        <RoleManager />
        <Showcase />
      </main>
    </Layout>
  );
}
