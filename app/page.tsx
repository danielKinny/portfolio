"use client";
import { useState,useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [blinker, setBlinker] = useState("|");
  const [count, setCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const words : string[] = ["daniel is the goat", "Welcome to Next.js", "This is a blinker effect", "Enjoy coding!"];

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
    
    setIsTyping(true);

      for (let i = 0; i < words[count].length; i++) {
        timeouts.push
        (setTimeout( () => setText(words[count].slice(0, i + 1)), 100*i))
    }

    const typingDuration = 100* words[count].length + 500

    timeouts.push(setTimeout(() => setIsTyping(false), typingDuration + 2000))
    for (let i = words[count].length-1; i>=0; i--) {
      timeouts.push
        (setTimeout( () => setText(words[count].slice(0, i)), typingDuration + 100*(words[count].length - i)))
    }
    
    const deletingDuration = 100 * words[count].length + 500

    timeouts.push(setTimeout(() => setIsTyping(false), typingDuration + deletingDuration + 2000))

    timeouts.push(setTimeout ((() =>{
    setCount( count === words.length-1 ? 0 : count + 1)
    }), typingDuration + deletingDuration + 2000))

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
