import { useState } from "react";
import NextImage from "./NextImage";

export function ImageMagnifier({ src, productName, magnifierHeight = 400, magnifieWidth = 400, zoomLevel = 2 }) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const isLarge = typeof window !== "undefined" && window.innerWidth < 991;

  return (
    <div
      className="border w-100 mw-100 mh-500px d-flex justify-content-center align-items-center cursor-move ratio ratio-1x1"
      onMouseEnter={(e) => {
        // update image size and turn-on magnifier
        const elem = e.currentTarget?.querySelector("img");
        const { width, height } = elem.getBoundingClientRect();
        setSize([width, height]);
        if (!isLarge) {
          setShowMagnifier(true);
        }
      }}
      onMouseMove={(e) => {
        // update cursor position
        const elem = e.currentTarget?.querySelector("img");
        const { top, left } = elem.getBoundingClientRect();

        // calculate cursor position on the image
        const x = e.pageX - left - window.pageXOffset;
        const y = e.pageY - top - window.pageYOffset;
        setXY([x, y]);
      }}
      onMouseLeave={() => {
        setShowMagnifier(false);
      }}
    >
      <div className="position-relative d-contents">
        <NextImage
          imageClassName={`w-100 mw-100 mh-500px p-2 object-fit-contain ${showMagnifier ? "opacity-50" : ""}`}
          src={src}
          alt={productName}
        />
        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            // prevent maginier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: 0, //`${y - magnifierHeight / 2}px`,
            left: "100%", //`${x - magnifieWidth / 2}px`,
            zIndex: 11,
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",

            //calculate zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

            //calculete position of zoomed image.
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
          }}
        ></div>
      </div>
    </div>
  );
}