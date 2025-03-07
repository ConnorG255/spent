"use client";

import OpenAI from "openai";
import { useState } from "react";
//import {Items} from "../components/items.jsx";



const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_APTKEY,
  dangerouslyAllowBrowser: true });

  //const Einput = document.getElementById('text');


export default function Home() {
  const [finished, setfinished] = useState([]);
  const [input, setinput] = useState("");
  const [response, setresponse] = useState("");

  const handleInputChange = (e) => {
    /*if(e && e.keyCode == 13){
      handleSubmit
    } */
    setinput(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", 
    store: true,
    messages: [{ role: "user", content: "you are a chatbot that is going to give a list of random items to buy based off of a customers budget. Each item will be different."
      + "The items will be random and preferably seen as useless or a waste of money. You will format the response as an array, listing of the item then link to that item."
      + " Use the format in the parenthases as guidance: (ITEM1: LINK1, ITEM2: LINK2). Do not add anything else in your response other than the array of items."
       +  "Do not add brackets and a quotation mark at the start and end of the response"
       + "add quotation marks between each object."
       + "Your customers budget is "
      + input
     }],
    });
   

    const ogitems = completion.choices[0]?.message?.content.split(',"').map((item) => item.replace(/(^"|"$)/g, ""));
    setfinished(ogitems);
   // console.log(response);
   // console.log(finished);
   
  }
  
  


  return (
    <div className="">
      <div className="text-center text-xl">Spentbutworking</div>

      <div className="0">
      
      <form onSubmit={handleSubmit}>
        <textarea value={input}
          onChange={handleInputChange}
          placeholder="Budget"
          className="bg-slate-900 w-max" 
        />
        <br />
        <button type="submit" className=" p-2 bg-slate-700 focus: bg-slate-600">
          send</button>
      </form>
      
      
      <div className="flex flex-col gap-2 pt-2 w-full h-full bg-red-600 text-white">
      {finished.map((itema, index) => (
        <div key={index}
        className="text-white p-5 bg-slate-700"> {itema} </div>
      ))}
        </div>
    </div>

    </div>
  );

}