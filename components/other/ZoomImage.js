import React from "react";
import { useState } from "react";
import classNames from "classnames";

function ZoomImage({ src, alt, disableOnMobile }) {
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };
  return (
    <figure
      className={`zoom-image ${classNames({
        "-disable-on-mobile": disableOnMobile,
      })}`}
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: backgroundPos,
      }}
    >
      <img src={src} alt={alt} />
    </figure>
  );
}

export default React.memo(ZoomImage);
