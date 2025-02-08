import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const InfiniteSlider = () => {
  const [visibleTextIndex, setVisibleTextIndex] = useState(null); // Track which image's text is visible
  const [titleStyle, setTitleStyle] = useState({}); // State for responsive title style
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  const imageTexts = [

  ];

  // Function to calculate responsive title style based on screen width
  const updateTitleStyle = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      setTitleStyle({ fontSize: "30px", padding: "5px" });
    } else if (screenWidth <= 768) {
      setTitleStyle({ fontSize: "50px", padding: "10px" });
    } else {
      setTitleStyle({ fontSize: "100px", padding: "20px" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateTitleStyle(); // Set initial style
      window.addEventListener("resize", updateTitleStyle); // Update on resize

      return () => {
        window.removeEventListener("resize", updateTitleStyle); // Cleanup listener
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = imagesRef.current.findIndex(
                (image) => image === entry.target
              );
              setVisibleTextIndex(index);
              setTimeout(() => setVisibleTextIndex(null), 10000); // Hide text after 10 seconds
            }
          });
        },
        {
          root: containerRef.current,
          threshold: 0.75, // Trigger when the image is at least 75% visible
        }
      );

      imagesRef.current.forEach((image) => {
        if (image) observer.observe(image);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "black",
        overflow: "hidden",
      }}
      ref={containerRef}
    >

      <div
        style={{
          width: "100%",
          height: "fit-content",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "fit-content",
            display: "flex",
            animation: "slide 50s linear infinite",
          }}
        >
          {Array(14)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  margin: "10px",
                  width: "600px",  // Enlarge image container width
                  height: "350px", // Enlarge image container height
                  overflow: "hidden", // Ensure images do not overflow
                }}
                ref={(el) => (imagesRef.current[index] = el)}
              >
                <Image
                  src={`/images/infinite-${(index % 7) + 1}.jpg`}
                  alt={`Slide ${index + 1}`}
                  width={600}  // Match image width with container
                  height={350} // Match image height with container
                  style={{
                    borderRadius: "5mm",
                    objectFit: "cover", // Ensure the image covers the container without stretching
                  }}
                />
                {visibleTextIndex === index && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "44px", // Larger text
                      textAlign: "center",
                      background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
                      padding: "15px",
                      borderRadius: "10px",
                      animation: "fade 40s forwards",
                      zIndex: 10, // Ensure text is above image
                    }}
                  >
                    {imageTexts[index % 7]}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <style>
        {`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
};

export default InfiniteSlider;
