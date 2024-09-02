import React from "react";
import "./HoverButton.css"

function HoverButton({type,text}){
    return(
        <div>
            <button type={type} className="Hoverbtn">{text}</button>
        </div>
    );
}

export default HoverButton;