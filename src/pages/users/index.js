import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import {UserList} from "@site/src/components/UserList";

export default function Users() {
  return (
    <Layout title="Showcase" description="Apache Casbin Showcase">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">
            <Translate>Who&apos;s using Apache Casbin?</Translate>
          </h1>
          <p className="hero__subtitle">
            <Translate>
              Hundreds of projects use Apache Casbin, from Fortune 500 companies to new startups. Check out these applications to see what can be built with Apache Casbin.
            </Translate>
          </p>
        </div>
      </header>
      <div className="container" style={{
        paddingTop: "10vh",
        paddingBottom: "10vh",
        textAlign: "center",
      }}>
        <UserList />
        <br /><br /><br />
        <h2>
          <Translate>Is your project using Apache Casbin?</Translate>
        </h2>
        <a className="button button--lg button--outline button--primary" href="https://github.com/apache/casbin-website/edit/master/static/data/users.json">
          <Translate>Add your company</Translate>
        </a>
      </div>
    </Layout>
  );
}
