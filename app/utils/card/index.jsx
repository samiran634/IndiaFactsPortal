import React from "react";

export const Card = ({ title, children, className = "" }) => {
  return (
    <div 
      className={`
        bg-zinc-900/80      
        backdrop-blur-sm    
        border border-zinc-800 
        rounded-xl           
        p-6                
        text-zinc-100      
        shadow-xl           
        ${className}         
      `}
    >
      {/* Only render the title if one is passed */}
      {title && (
        <div className="mb-4 pb-2 border-b border-zinc-800">
          <h3 className="text-xl font-bold tracking-tight text-white">
            {title}
          </h3>
        </div>
      )}
      
      {/* The main content */}
      <div className="text-base text-zinc-300">
        {children}
      </div>
    </div>
  );
};