import { useState } from "react";

export function useTextSplitter(initialText) {
    const [text, setText] = useState(initialText);
    const [firstPart, setFirstPart] = useState('');
    const [secondPart, setSecondPart] = useState('');
  
    const splitTextIntoTwoParts = () => {
      const length = text.length;
      const middleIndex = Math.floor(length / 2);
  
      const firstPartText = text.slice(0, middleIndex);
      const secondPartText = text.slice(middleIndex);
  
      setFirstPart(firstPartText);
      setSecondPart(secondPartText);
    };
  
    return {
      text,
      firstPart,
      secondPart,
      setText,
      splitTextIntoTwoParts,
    };
  }