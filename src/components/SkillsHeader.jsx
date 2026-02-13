import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { useRef } from "react";    
import { useEffect } from "react";
import "./skillsHeader.css"
gsap.registerPlugin(SplitText, ScrollTrigger);

function SkillsHeader() {
  const stageRef = useRef(null);
  const txtRef = useRef(null);
  const charsRef = useRef([]);

  const mouseInitialY = useRef(0);
  const mouseFinalY = useRef(0);
  const charIndexSelected = useRef(0);
  const charH = useRef(0);
  const isMouseDown = useRef(false);

  const weightInit = 600;
  const weightTarget = 400;
  const weightDiff = weightInit - weightTarget;

  const stretchInit = 150;
  const stretchTarget = 80;
  const stretchDiff = stretchInit - stretchTarget;

  const maxYScale = 2.5;
  const elasticDropOff = 0.8;

  const dragYScale = useRef(0);
  const distY = useRef(0);

  const calcDist = () => {
    let maxYDragDist = charH.current * (maxYScale - 1);
    distY.current = mouseInitialY.current - mouseFinalY.current;
    dragYScale.current = distY.current / maxYDragDist;

    if (dragYScale.current > maxYScale - 1) {
      dragYScale.current = maxYScale - 1;
    } else if (dragYScale.current < -0.5) {
      dragYScale.current = -0.5;
    }
  };

  const calcfracDispersion = (index) => {
    const numChars = charsRef.current.length;
    let dispersion =
      1 -
      Math.abs(index - charIndexSelected.current) / (numChars * elasticDropOff);
    return dispersion * dragYScale.current;
  };

  const setFontDragDimensions = () => {
    gsap.to(charsRef.current, {
      y: (i) => calcfracDispersion(i) * -50,
      fontWeight: (i) => weightInit - calcfracDispersion(i) * weightDiff,
      fontStretch: (i) =>
        `${stretchInit - calcfracDispersion(i) * stretchDiff}%`,
      scaleY: (i) => {
        let s = 1 + calcfracDispersion(i);
        return s < 0.5 ? 0.5 : s;
      },
      duration: 0.6,
      ease: "power4",
    });
  };

  const snapBackText = () => {
    gsap.to(charsRef.current, {
      y: 0,
      fontWeight: weightInit,
      fontStretch: `${stretchInit}%`,
      scale: 1,
      ease: "elastic(0.35, 0.1)",
      duration: 1,
      stagger: {
        each: 0.02,
        from: charIndexSelected.current,
      },
    });
  };

  const animInTxt = () => {
    const elem = charsRef.current[0];
    if (!elem) return;

    const rect = elem.getBoundingClientRect();

    gsap.from(charsRef.current, {
      y: () => -1 * (rect.y + charH.current + 500),
      fontWeight: weightTarget,
      fontStretch: `${stretchTarget}%`,
      scaleY: 2,
      ease: "elastic(0.2, 0.1)",
      duration: 1.5,
      stagger: {
        each: 0.05,
        from: "random",
      },
    });
  };

  useEffect(() => {
    const split = new SplitText(txtRef.current, {
      type: "chars",
      charsClass: "char",
    });

    charsRef.current = split.chars;
    charH.current = txtRef.current.offsetHeight;

    gsap.set(stageRef.current, { autoAlpha: 1 });
    gsap.set(charsRef.current, { transformOrigin: "center bottom" });

    ScrollTrigger.create({
      trigger: stageRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        animInTxt();
      },
    });

    charsRef.current.forEach((char, index) => {
      char.addEventListener("mousedown", (e) => {
        mouseInitialY.current = e.clientY;
        charIndexSelected.current = index;
        isMouseDown.current = true;
      });
    });

    const move = (e) => {
      if (!isMouseDown.current) return;
      mouseFinalY.current = e.clientY;
      calcDist();
      setFontDragDimensions();
    };

    const up = (e) => {
      if (!isMouseDown.current) return;
      mouseFinalY.current = e.clientY;
      isMouseDown.current = false;
      snapBackText();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      split.revert();
      ScrollTrigger.killAll();
    };
  }, []);


  return (
    <div className="skills-header">
      <div ref={stageRef} className="stage">
        <div className="skills-content">
          <h1
            ref={txtRef}
            className="skills-txt text-xl sm:text-2xl md:text-4xl lg:text-6xl "
          >
            Teknik Becerilerim
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SkillsHeader;
