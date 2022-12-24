import React from "react";
import { Link } from "react-router-dom";

export default function Stream({ id, title, viewers }) {
  return (
    <div className="stream">
      <div className="img"></div>
      <div className="stream-main">
        <div className="info-section">
          <div className="title">{title}</div>
          <div className="viewers">{viewers} Viewers</div>
        </div>
        <Link to={`/streams/${id}`}>
          <button className="visit-btn">visit</button>
        </Link>
      </div>
    </div>
  );
}
