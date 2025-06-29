"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import styles from "./BoldTitle.module.scss";
import Container from "@/components/UI/Layout/Layout";
import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";

export default function BoldTitle() {
  const boldTitle = useRef();
  const boldTitleLeft = useRef();
  const boldTitleRight = useRef();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const splitTextLeft = new SplitText(boldTitleLeft.current, {
      type: "chars",
    });
    const splitTextRight = new SplitText(boldTitleRight.current, {
      type: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: boldTitle.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    // BoldText
    tl.fromTo(
      boldTitleLeft.current,
      {
        xPercent: -50,
      },
      {
        xPercent: -10,
      },
      0
    );
    tl.fromTo(
      boldTitleRight.current,
      {
        xPercent: 50,
      },
      {
        xPercent: 10,
      },
      0
    );
  });

  return (
    <section className={styles.section} id="#about">
      <Container className={styles.grid}>
        <TextReveal className={styles.paragraph}>
          I currently work for Aurora Web Studio as a frontend developer, where
          I tackle extremely difficult engineering problems every day. I
          continuously work towards improving my knowledge and skills so I can
          contribute more to the business.
        </TextReveal>
        <h2 className={styles.boldTitle} ref={boldTitle}>
          <span className={styles.boldTitleLeft} ref={boldTitleLeft}>
            Creative
          </span>
          <span>Frontend</span>
          <span className={styles.boldTitleRight} ref={boldTitleRight}>
            Developer
          </span>
        </h2>
        <TextReveal className={`${styles.paragraph} ${styles.paragraphAlt}`}>
        My mission is to continuously advance in web development, using my
        growing expertise to drive societal progress through technology.
        </TextReveal>

        <Blobs type={"v3"} classVariable={styles.blob} />
      </Container>
    </section>
  );
}
