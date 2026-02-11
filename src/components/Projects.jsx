import { useEffect, useRef } from "react";
import "./project.css";
import projectsData from "../locales/tr.json"


function ProjectsCursorEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const circle = document.createElement("span");
      circle.classList.add("projects-circle");

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      const size = Math.random() * 60;
      circle.style.width = `${20 + size}px`;
      circle.style.height = `${20 + size}px`;

      container.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 2800);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  function ProjectCard({ item }) {
    const videoRef = useRef(null);

    return (
      <figure
        className="card-figure"
        onMouseEnter={() => videoRef.current.play()}
        onMouseLeave={() => {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }}
      >
        <video
          ref={videoRef}
          src={`/portfolio/assets/${item.video}`}
          muted
          playsInline
          className="card-img"
        />
      </figure>
    );
  }

  return (
    <section ref={containerRef} className="projects-section" id="projects">
      <h1 className="projects-title">Projelerim</h1>

      <div className="projects-wrapper">
        {projectsData.projects.items.map((item) => (
          <div key={item.id} className="card-projects bg-base-100 shadow-sm">
            <ProjectCard item={item} />

            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.description}</p>

              <div className="card-actions justify-end">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-primary">İncele</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsCursorEffect;
