import React from 'react'
import classNames from "classnames";


export default function EllipsesText1({ text, className, maxWords }) {
    const truncateText = (text) => {
        const words = text.split(" ");
        if (words.length <= maxWords) {
          return text;
        }
        return words.slice(0, maxWords).join(" ") + " ...";
      };


  return (
   <div className={classNames("overflow-hidden", className)}>
      {truncateText(text)}
    </div>
  )
}
