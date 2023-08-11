import React from "react";
import classNames from "classnames";

const EllipsesText = ({ text, className,lineClamp }) => {
  const showFullText = () => {
    const element = document.getElementById("ellipsisText");
    element.classList.remove("line-clamp-1");
  };

  return (
    <div
      id="ellipsisText"
      className={classNames(
        `line-clamp-${lineClamp} overflow-hidden`,
        className
      )}
    >
      {text}
      <span
        className="cursor-pointer text-blue-500"
        onClick={showFullText}
      >
        ...
      </span>
    </div>
  );
};

export default EllipsesText;
