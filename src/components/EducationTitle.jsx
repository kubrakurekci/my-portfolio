import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

function EducationTitle() {
  const textRef = useRef(null);
  const splitRef = useRef(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    splitRef.current = new SplitText(textRef.current, {
      type: "lines",
    });

    gsap.set(textRef.current, { perspective: 800 });

    gsap.from(splitRef.current.lines, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      rotationX: -90,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });

    return () => {
      splitRef.current?.revert();
    };
  }, []);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    gsap.fromTo(
      imgRef.current,
      { x: -150 },
      {
        x: () => container.offsetWidth / 2,
        xPercent: 10,
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "+=400",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <div className="education-header">
      <div ref={containerRef} className="relative h-24 ">
        <img
          ref={imgRef}
          src="/my-portfolio/assets/education.png"
          className="flair"
          alt=""
        />
      </div>
      <h1 ref={textRef} className="timeline-header playwrite-nz-basic">
        Eğitim
      </h1>
    </div>
  );
}

export default EducationTitle;
