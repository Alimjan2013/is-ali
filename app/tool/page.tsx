"use client";

import { useState } from "react";
import { diffChars } from "diff";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { get } from "http";


function CheckWord(){
  const getDifferences = (word1: string, word2: string) => {
    const differences = diffChars(word1, word2);
    return differences;
  };
  const [userInput, setUserInput] = useState("");
  const [accurateWord, setAccurateWord] = useState("");
  return (<div>
    <input className="border" type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)}  />

    <input className="border" type="text" value={accurateWord} onChange={(e)=>setAccurateWord(e.target.value)} />



    <p className="text-xl font-medium p-3">
      {getDifferences(userInput, accurateWord).map(
        (part: any, index: any) => (
          <span
            key={index}
            className={
              part.added
                ? "text-green-600"
                : part.removed
                ? "text-orange-600 bg-red-200 px-0.5 rounded"
                : ""
            }
          >
            {part.value}
          </span>
        )
      )}
    </p>
  </div>)
}

export default function Home() {
  const [text, setText] = useState("");
  const [writing, setWriting] = useState("");
  const [deffScript, setDeffScript] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleChangeWriting = (newText: any) => {
    // const newText = event.target.value;
    // setWriting(newText);
    const result = newText
      .split(/(【.*?】)|(\(.*?\))|<.*?>/)
      .filter((part: any) => part)
      .map((part: any) => {
        if (part.startsWith("(")) {
          return { type: "delete", context: part.slice(1, -1) };
        } else if (part.startsWith("【")) {
          return { type: "add", context: part.slice(1, -1) };
        } else if (part.startsWith("<")) {
          return { type: "delete", context: part.slice(1, -1) };
        } else {
          return { type: "normal", context: part };
        }
      });
    // console.log(script);
    console.log(result);
    setDeffScript(result);
  };



 

  async function getResult() {
    fetch("/api/checkGrammar", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleChangeWriting(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
    })


  
  }

  return (
    <main className=" space-y-4 container mx-auto px-4 pt-4">
      <h1 className="text-3xl font-bold text-center text-gray-600">
        Grammar check
      </h1>

      <div className="bg-slate-50 border border-slate-300 rounded-md p-2 mt-4 ">
        {deffScript.map((item: any, index: any) => (
          <p
            className={
              "inline rounded text-xl " +
              (item.type === "delete"
                ? "bg-red-50 px-1 text-red-400 italic"
                : "") +
              (item.type === "add" ? "bg-green-50  px-1 " : "")
            }
            key={index}
          >
            {item.context}
          </p>
        ))}
      </div>

      <textarea
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        value={text}
        onChange={(event) => setText(event?.target.value)}
      />
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => getResult()}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
        check
      </Button>

      
    </main>
  );
}
