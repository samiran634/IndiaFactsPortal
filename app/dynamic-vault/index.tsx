"use client";
import RadialComponent from "../utils/ui/radial";
import { useState } from "react";
import TechNewsCards from "./tech";
import PolityMainContent from "./Polity&Economy";
import MiscellaneousMainContent from "./Miscellaneous";

const MainContent=()=>{
      const [selected,setSelected]=useState<number | null>(null);
      const [isButtonVisible,setIsButtonVisible]=useState<boolean>(false);
    return (

        <>
          <RadialComponent selected={selected} setSelected={setSelected} isButtonVisible={isButtonVisible} setIsButtonVisible={setIsButtonVisible}/>
          {
            selected===0 && isButtonVisible && <PolityMainContent/>
          }
          {
            selected===1 && isButtonVisible && <TechNewsCards/>
          }
           {
            selected===2 && isButtonVisible && <MiscellaneousMainContent/>
          }
        </>
    )
}
export default MainContent;