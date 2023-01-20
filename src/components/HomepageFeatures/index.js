import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Proven track record",
    Svg: require("@site/static/img/undraw_slider_re_ch7w.svg").default,
    description: (
      <>Used in production since 2006 by most European Broadcasters.</>
    ),
  },
  {
    title: "Free and open source",
    Svg: require("@site/static/img/undraw_engineering_team_a7n2.svg").default,
    description: (
      <>
        All code is available under the GPL license, no license fees, no
        commercial limitations and an active user knowledge base.
      </>
    ),
  },
  {
    title: "Flexible engine",
    Svg: require("@site/static/img/undraw_animating_re_5gvn.svg").default,
    description: (
      <>
        The most extendable engine for live real-time broadcast use to date
        featuring a layer based compositor and an open network protocol with
        many free controllers already available
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
