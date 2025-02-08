"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from "react-icons/fa";
import Image from "next/image";

const ImageSlider = () => {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);

  const slides = [
    { src: "/images/carl.jpg", desc: "Carlos Alec", smallDesc: "CEO & Head of Tech" },
    { src: "/images/image2.jpg", desc: "Clivert", smallDesc: "Software Maintanance engineer" },
    { src: "/images/image6.jpg", desc: "Elton", smallDesc: "Security Lead" },
    { src: "/images/image7.jpg", desc: "Valentine", smallDesc: "Chief Commercial Officer" },
  ];
  const moveRight = () => {
    setI((i + 1) % slides.length);
  };

  const moveLeft = () => {
    setI((i - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) moveRight();
    }, 5000);
    return () => clearInterval(interval);
  }, [pause, i]);

  const playPause = () => setPause(!pause);

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "rgb(0, 0, 0)",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "50px",
            fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "30px",
          }}
        >
          <span style={{ fontSize: "60px", color: "gold", marginRight: "5px" }}>
            ⭐
          </span>
          The Team
        </div>

        <div
          style={{
            width: "100%",
            height: "fit-content",
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "fit-content",
              height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translateX(calc(50% - 155px))",
            }}
          >
            <div
              className="slider"
              style={{
                width: "fit-content",
                height: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.25s ease-in-out",
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${i === index ? "active" : ""}`}
                  style={{
                    width: i === index ? "280px" : "140px",
                    height: i === index ? "350px" : "175px",
                    position: "relative",
                    borderRadius: "2mm",
                    margin: "0 10px",
                    transition: "0.25s",
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.desc}
                    width={280}
                    height={350}
                    style={{
                      width: i === index ? "280px" : "140px",
                      height: i === index ? "350px" : "175px",
                      borderRadius: "2mm",
                      objectFit: "cover",
                      WebkitBoxReflect:
                        "below 0px linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4))",
                      transition: "0.25s",
                    }}
                  />
                  <div
                    className="desc"
                    style={{
                      position: "absolute",
                      width: "90%",
                      bottom: "10px",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                      borderRadius: "10mm",
                      background: "rgba(0, 0, 0, 0.7)",
                      fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                      fontSize: "18px",
                      fontWeight: "500",
                      textAlign: "center",
                      boxSizing: "border-box",
                      padding: "15px",
                      color: "white",
                      opacity: i === index ? 1 : 0,
                      transition: "0.2s",
                    }}
                  >
                    {slide.desc}
                    <div style={{ fontSize: "12px", fontWeight: "400", marginTop: "5px" }}>
                      {slide.smallDesc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
