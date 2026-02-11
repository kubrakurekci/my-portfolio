import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import video from "/assets/video.mp4"

function Hero() {
 gsap.registerPlugin(SplitText, ScrollTrigger);

 const quoteRef = useRef(null);
 const containerRef = useRef(null);
 const splitTextRef = useRef(null);

 useLayoutEffect(() => {
   if (!quoteRef.current || !containerRef.current) return;
   splitTextRef.current?.revert();
   splitTextRef.current = new SplitText(quoteRef.current, {
     type: "lines",
     linesClass: "line",
   });

   gsap.set(quoteRef.current, { perspective: 400 });

   gsap.set(splitTextRef.current.lines, {
     opacity: 0,
     x: -60,
   });

   const tl = gsap.timeline({
     scrollTrigger: {
       trigger: containerRef.current,
       start: "top 80%",
       end: "top 30%",
       toggleActions: "play none none reverse",
       invalidateOnRefresh: true, 
       markers: false,
     },
     defaults: {
       ease: "expo.out",
     },
   });

   tl.to(splitTextRef.current.lines, {
     opacity: 1,
     x: 0,
     duration:8, 
     stagger: 0.12,
   });

   ScrollTrigger.refresh();

   return () => {
     splitTextRef.current?.revert();
     ScrollTrigger.getAll().forEach((t) => t.kill());
   };
 }, []);

  return (
    <div className="hero min-h-screen bottom-1" ref={containerRef} id="hero">
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div id="demo" className="w-full max-w-4xl mx-auto px-4 py-20">
        <div id="quote" ref={quoteRef} className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-3">
            Merhaba!
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed">
            Ben Kübra. Front-End Developer olma yolunda kendimi geliştiriyorum. Yaptığım projeleri ve teknik becerilerimi burada
            bulabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
