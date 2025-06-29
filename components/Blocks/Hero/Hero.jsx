'use client';

import React, {useState, useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";
import {SplitText} from "gsap/SplitText";

import styles from './Hero.module.scss'
import commonConfig from '@/database/config/metadata.json';
import PreLoader from "@/components/Blocks/PreLoader/PreLoader";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
import Particles from "@/components/UI/Cards/Particles/Particles";

export default function Hero() {
    const [preloaderComplete, setPreloaderComplete] = useState(false);
    const container = useRef();
    const fakeContainer = useRef();
    const textRef = useRef(null);
    const descRef = useRef();
    const {contextSafe} = useGSAP({scope: container});

    const handlePreloaderComplete = () => {
        setPreloaderComplete(true);
    };

    // GSAP Animations
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);
        gsap.set(`.${styles.line} svg path`, {
            drawSVG: '0%',
        });
        gsap.set(descRef.current, {
            autoAlpha: 0,
        })

        if (preloaderComplete) {
            // Line Animation
            gsap.to(`.${styles.lineRight} svg path`, {
                drawSVG: '100%',
                duration: 1,
                stagger: 0.1
            });
            gsap.to(`.${styles.lineLeft} svg path`, {
                drawSVG: '100%',
                duration: 1,
                stagger: 0.1
            });

            // Hero Title
            textRef.current.style.opacity = 1;
            const splitText = new SplitText(textRef.current, {
                type: 'words, lines',
                linesClass: `${styles.splitLine}`,
                wordsClass: `${styles.splitWords}`,
            });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    toggleActions: "restart pause resume reverse",
                    start: "top 90%",
                },
            });
            tl.from(splitText.words, {
                duration: 0.4,
                autoAlpha: 0,
                y: 120,
                ease: "power1.out",
                stagger: 0.08,
            });

            // Description
            gsap.to(descRef.current, {
                autoAlpha: 1,
                duration: 3,
                ease: "power1.out",
            })

            // Image Reveal
            gsap.to(`.${styles.reveal}`, {
                x: '-100%',
                delay: 0.5,
                duration: 1,
                onComplete: () => {
                    gsap.to(`.${styles.heroImg}`, {
                        x: '-30%',
                        scale: 1.3,
                        scrollTrigger: {
                            trigger: fakeContainer.current,
                            scrub: true,
                            start: 'top top',
                            end: 'bottom 50%'
                        }
                    });
                }
            });

            // Scale Content
            gsap.to(`.${styles.inner}`, {
                scale: 0.8,
                scrollTrigger: {
                    trigger: fakeContainer.current,
                    scrub: true,
                    start: 'top top',
                    end: 'bottom top',
                }
            });

            // Container Animation
            gsap.to(container.current, {
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    toggleActions: "restart pause resume reverse",
                    start: "top top",
                    end: "bottom top",
                    pinSpacing: false,
                },
            });
        }

    }, [preloaderComplete]);

    // ✨ helper — all the “d” values you already have
    const leftLinePaths = [
    'M961 995L0 1.00093',
    'M961 994.807L0 139.055',
    'M961 995L0 268.279',
    'M961 994.998L0 388.092',
    'M961 995L0 498.692',
    'M961 995L0 600.073',
    'M961 994.998L0 692.236',
    'M961 994.998L0 775.185',
    'M961 994.998L0 851.682',
    'M961 994.998L0 916.197',
    ];

    const rightLinePaths = [
    'M1 995L962 1.00093',
    'M1 994.807L962 139.055',
    'M1 995L962 268.279',
    'M1 994.998L962 388.092',
    'M1 995L962 498.692',
    'M1 995L962 600.073',
    'M1 994.998L962 692.236',
    'M1 994.998L962 775.185',
    'M1 994.998L962 851.682',
    'M1 994.998L962 916.197',
    ];

    // how much to reduce opacity each step (tweak to taste)
    const startOpacity = 0.1;          // first line
    const endOpacity   = 0.26;        // last line
    const step         = (startOpacity - endOpacity) / (leftLinePaths.length - 1);



    return (
        <>
            <PreLoader onComplete={handlePreloaderComplete}/>
            <section className={styles.hero}>
                <div ref={container}>
                    <div className={styles.inner}>
                        <div className={styles.title}>
                            <h1 ref={textRef}>
                                Matej Vit <br/> Frontend Developer.
                            </h1>
                            <p ref={descRef}>{commonConfig.metadata.description}</p>
                        </div>
                    </div>
                    <div className={styles.background}>

                        <div className={styles.noise}></div>
                        {/* ───────── Left group ───────── */}
                        <div className={`${styles.line} ${styles.lineLeft}`}>
                        <svg width="962" height="995" viewBox="0 0 962 995" fill="none">
                            {leftLinePaths.map((d, i) => (
                            <path
                                key={i}
                                d={d}
                                stroke={`url(#paint_left_${i})`}
                                strokeOpacity={startOpacity - step * i}
                            />
                            ))}

                            <defs>
                            {leftLinePaths.map((_, i) => (
                                <linearGradient
                                key={i}
                                id={`paint_left_${i}`}
                                x1="960.499"
                                y1="992.187"
                                x2="-6.38836"
                                y2="985.916"
                                gradientUnits="userSpaceOnUse"
                                >
                                {/* keep the along-stroke fade */}
                                <stop offset="0"     stopColor="#FFFFFF"/>
                                <stop offset="0.0001" stopColor="#FFFFFF" stopOpacity="0.9"/>
                                <stop offset="1"     stopColor="#FFFFFF" stopOpacity="0"/>
                                </linearGradient>
                            ))}
                            </defs>
                        </svg>
                        </div>

                        {/* ───────── Right group ───────── */}
                        <div className={`${styles.line} ${styles.lineRight}`}>
                        <svg width="962" height="995" viewBox="0 0 962 995" fill="none">
                            {rightLinePaths.map((d, i) => (
                            <path
                                key={i}
                                d={d}
                                stroke={`url(#paint_right_${i})`}
                                strokeOpacity={startOpacity - step * i}
                            />
                            ))}

                            <defs>
                            {rightLinePaths.map((_, i) => (
                                <linearGradient
                                key={i}
                                id={`paint_right_${i}`}
                                x1="1.50051"
                                y1="992.187"
                                x2="968.388"
                                y2="985.916"
                                gradientUnits="userSpaceOnUse"
                                >
                                <stop offset="0"     stopColor="#FFFFFF"/>
                                <stop offset="0.0001" stopColor="#FFFFFF" stopOpacity="0.9"/>
                                <stop offset="1"     stopColor="#FFFFFF" stopOpacity="0"/>
                                </linearGradient>
                            ))}
                            </defs>
                        </svg>
                        </div>

                        <Particles className={styles.particlesBG}/>

                        <Blobs type={'v1'}/>
                        <Blobs type={'v2'}/>
                        <Blobs type={'v3'}/>
                    </div>
                </div>
                <div className={styles.fakeContainer} ref={fakeContainer}></div>
            </section>
        </>
    )
}