import BigMinus from "../BigMinus";
const RightScrollUp = () => {
   

    return (

        <div className="flex flex-col items-center justify-center gap-0.5 animate-bounce opacity-60">
                {/*
                down arrow made with css:
                    this is the interior bxox i have to put two more boxes with bg black rotated 45 degrees to make an arrow
                    also down border of the up box and up border of the down box should be visible.
                */}
             <BigMinus className="rotate-240 animate-pulse" />
                <BigMinus className="rotate-240 animate-pulse" />
                <BigMinus className="rotate-240 animate-pulse" />
                <BigMinus className="rotate-240 animate-pulse" />
                <BigMinus className="rotate-240 animate-pulse" />
        </div>
    )
}
export default RightScrollUp;