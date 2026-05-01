"use client";

import React, { useRef } from "react";

import styles from "./SelectedWorks.module.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Works from "@/database/Works.json";
import Title from "@/components/UI/Elements/Title/Title";
import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
import Image from "next/image";

export default function SelectedWorks() {
  const galleryContainer = useRef();
  const bg = useRef();
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const gallery = galleryContainer.current;

      // BG Animation
      gsap.to(bg.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
        clipPath: "inset(0px 0px round 3rem 3rem 0rem 0rem)",
      });

      // Horizontal Scroll
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: () => {
            return `+=${gallery?.clientWidth - window.innerWidth}`;
          },
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      let mm = gsap.matchMedia();
      mm.add("(max-width: 991px)", () => {
        tl.to(gallery, {
          ease: "none",
        });
      });
      mm.add("(min-width: 992px)", () => {
        tl.to(gallery, {
          x: () => {
            return `-${gallery?.clientWidth - window.innerWidth}`;
          },
          ease: "none",
        });

        let browserArray = gsap.utils.toArray(`.${styles.browser}`);
        browserArray.forEach((browser, index) => {
          gsap.from(browser, {
            xPercent: 20,
            duration: 1,
            ease: "elastic",
            scrollTrigger: {
              trigger: browser,
              containerAnimation: tl,
              start: "left right",
              toggleActions: "play none none reverse",
              id: index,
            },
          });
        });
      });
    },
    { scope: galleryContainer }
  );


  return (
    <section className={styles.section} id={"works"} ref={container}>
      <div className={styles.bg} ref={bg}>
        <div className={`${styles.showcase}`}></div>
      </div>
      <div ref={galleryContainer}>
        <div className={styles.header}>
          <Title color="white">Selected Works</Title>
          <TextReveal className={styles.headerDescription}>
            Discover a curated portfolio of projects where each line of code
            tells a story of problem-solving, creativity, and technical finesse.
          </TextReveal>
          <Blobs type={"v2"} />
        </div>

        {Works.map((work, index) => {
          return (
            <div key={index} className={`${styles.browser}`}>
              <div className={`${styles.browserHeader}`}>
                <h3 className={styles.type}>{work.type}</h3>
                <div className={styles.date}>{work.date}</div>
              </div>
              <div className={styles.browserBody}>
                <h3 className={styles.title}>{work.title}</h3>
                <Image
                  src={work.image}
                  alt={work.title}
                  width={420}
                  height={420}
                  className={styles.image}
                  loading={"lazy"}
                />
                <p className={styles.description}>
                  {work.description}
                </p>
              </div>
            </div>
          );
        })}
        <div class={styles.backgroundGlow}></div>
      </div>
    </section>
  );
}
