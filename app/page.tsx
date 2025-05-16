"use client";
import { useState,useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [blinker, setBlinker] = useState("|");
  const [count, setCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const words : string[] = ["i am a student", "i am an innovator", "i am a creator"];

  const returnIndex = (index: number) => index%words.length;

  useEffect(() => {
    
    let interval: NodeJS.Timeout | undefined;

    if (!isTyping) {
      interval = setInterval(() => {
      setBlinker((prev) => (prev === "|" ? "" : "|"));
      }, 300);
    } else {
      setBlinker("|")
    }

    return () => interval ? clearInterval(interval) : undefined;
  },[isTyping])

  useEffect( () => {
    let timeouts: NodeJS.Timeout[] = [];

    const currWord = words[count];
    const nextWord = words[returnIndex(count+1)];
    let shared = 0;
    while (shared < currWord.length && shared < nextWord.length && currWord[shared] === nextWord[shared]) {
      shared++;
    }


    setIsTyping(true);

      for (let i = shared; i < words[count].length; i++) {
        timeouts.push
        (setTimeout( () => setText(words[count].slice(0, i + 1)), 100*(i-shared)))
    }

    const typingDuration = 100* words[count].length + 500

    timeouts.push(setTimeout(() => setIsTyping(false), typingDuration + 2000))
    for (let i = currWord.length-1; i>=shared; i--) {
      timeouts.push
        (setTimeout( () => setText(words[count].slice(0, i)), typingDuration + 100*(currWord.length - i)))
        if (i!==0 && words[returnIndex(count+1)].startsWith(words[count].slice(0, i))) {
          break
        }
    }
    
    const deletingDuration = 100 * (currWord.length - shared) + 500

    timeouts.push(setTimeout(() => setIsTyping(false), typingDuration + deletingDuration + 1000))

    timeouts.push(setTimeout ((() =>{
    setCount( count === words.length-1 ? 0 : count + 1)
    }), typingDuration + deletingDuration + 1000))

    return () => { timeouts.forEach(timeout => clearTimeout(timeout)) }

  }
  
  ,[count])
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold">
        {text}<span>{blinker}</span>
      </h1>
    </div>
  );
}
