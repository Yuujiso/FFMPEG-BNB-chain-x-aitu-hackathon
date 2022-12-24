import React from "react";
import Stream from "../components/Stream";
import "../styles/home.css";
import Navbar from "../components/Navbar";
export default function Home({ streams }) {
  return (
    <>
      <Navbar />
      <div className="home">
        {streams.map((item) => {
          return <Stream key={item.id} {...item} />;
        })}
      </div>
    </>
  );
}
