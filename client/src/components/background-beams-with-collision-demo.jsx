import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

export default function BackgroundBeamsWithCollisionDemo() {
    return (
        <BackgroundBeamsWithCollision className="h-full bg-transparent">
            {/* 
        This is a demo wrapper. 
        Note: The user likely wants to put their OWN content here (the woman image),
        not the "What's cooler than Beams?" text.
        But I'm sticking to the requested task of providing the component first.
        I will modify Home.jsx to use BackgroundBeamsWithCollision directly.
      */}
            <div className="relative z-20 font-bold text-center text-white font-sans tracking-tight">
                {/* Placeholder if used directly */}
            </div>
        </BackgroundBeamsWithCollision>
    );
}
