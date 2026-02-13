import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import educationData from "../locales/tr.json";
import EducationTitle from "./EducationTitle";
gsap.registerPlugin(ScrollTrigger);

function Timeline() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".card-1", {
        x: 0,
        opacity: 1,
        zIndex: 1,
      });
      gsap.set(".card-2", {
        x: 400,
        opacity: 0,
        zIndex: 2,
      });
      gsap.set(".card-3", {
        x: -400,
        opacity: 0,
        zIndex: 3,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      });
      tl.to(".card-2", {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
      });
      tl.to(".card-3", {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <EducationTitle />
      <div className="timeline-container" ref={containerRef}>
        {educationData.education.items.map((item, index) => (
          <div
            key={item.id}
            className={`timelineCard card-${index + 1}`}
            style={{
              backgroundImage: `url(/my-portfolio/${item.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="education-info"
              style={{
                backgroundColor: item.cardColor,
              }}
            >
              <h2 className="text-lg sm:text-xl md:text-xl lg:text-3xl">
                {item.university}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                {item.field}
              </p>
              <p className="text-sm sm:text-base md:text-lg">{item.degree}</p>
              <p className="text-sm sm:text-base md:text-base">{item.class}</p>
              <p className="text-sm sm:text-base md:text-base">
                GNO: {item.gno}
              </p>
              <p className="text-sm sm:text-base md:text-base">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
