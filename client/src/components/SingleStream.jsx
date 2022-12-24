import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/singleStream.css";
import { BiLike, BiDislike } from "react-icons/bi";
import Navbar from "../components/Navbar";
import ReactHlsPlayer from "react-hls-player";
export default function SingleStream({ streams }) {
  const url = "http://192.168.248.48/";
  const [hlsUrl, setHlsUrl] = useState(`${url}hls/test.m3u8`);
  const { id } = useParams();
  const stream = streams.find((item) => {
    return item.id === Number(id);
  });
  console.log(stream);
  const { title, viewers } = stream;

  return (
    <>
      <Navbar />
      <div className="stream-container">
        <div className="stream-block">
          <div className="stream-img">
            <ReactHlsPlayer
              src={hlsUrl}
              autoPlay={true}
              controls={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="comments"></div>
        </div>
        <div className="title-section">
          <div className="title">{title}</div>
          <div className="viewers-stream">{viewers} viewers</div>
        </div>
        <div className="info">
          <div className="info-first-section">
            <div className="person-img"></div>
            <div className="name-subscribers">
              <div className="person-name">Some name</div>
              <div className="person-subscribers">100 subscribers</div>
            </div>
          </div>
          <div className="info-second-section">
            <button type="button">subscribe</button>
            <div className="likes-dislikes">
              <div className="like">
                <span className="like-icon">
                  <BiLike />
                </span>
                200
              </div>
              <span className="between-likes"></span>
              <div className="dislike">
                <span className="like-icon">
                  <BiDislike />
                </span>
                40
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
