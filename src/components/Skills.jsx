import React from "react";
import Rating from "@mui/material/Rating";
import rating from "../locales/tr.json";
import "bulma/css/bulma.min.css"
import SkillsHeader from "./SkillsHeader";
import DialogContent from "@mui/material/DialogContent";

function Skills() {
  return (
    <div>
      <SkillsHeader />
      <div className="container-skills">
        <div className="columns is-multiline">
          {rating.skills.map((item) => (
            <div key={item.id} className="column is-3">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{item.name}</p>
                    </div>
                  </div>
                  <div className="content">
                    <Rating value={item.rating} readOnly />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Skills;
