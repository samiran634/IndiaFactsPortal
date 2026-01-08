import Link from "next/link";
import React from "react";

export const Card = (props) => {
  return (
    <div 
      className={`
    
        bg-zinc-900/80  
        border border-zinc-800 
        rounded-xl           
        p-6                
        text-zinc-100      
        shadow-xl     
      `}
    >
      {props.title && (
        <div className="mb-4 pb-2 border-b border-zinc-800">
          <h3 className="text-4xl font-bold tracking-tight text-white">
            {props.title}
          </h3>
        </div>
      )}
      
      {/* The main content */}
      <div className="text-2xl text-zinc-300">
        {props.description}
      </div>
       <Link href={props.link} className="text-amber-400 hover:underline mt-4 inline-block">
        Let's Explore More
      </Link>
      
    
    </div>
  );
};