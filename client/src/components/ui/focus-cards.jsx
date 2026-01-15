import React, { useState } from "react";
import { cn } from "../../lib/utils";

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-3xl relative bg-zinc-900 overflow-hidden w-full md:w-[380px] transition-all duration-300 ease-out flex flex-col shadow-2xl border border-zinc-800 group h-[500px]",
                hovered !== null && hovered !== index ? "blur-[2px] scale-[0.98] opacity-50" : "hover:border-emerald-500/50 hover:shadow-emerald-500/40"
            )}
        >
            <div className="relative w-full h-48 overflow-hidden shrink-0">
                <img
                    src={card.src}
                    alt={card.title}
                    className={cn(
                        "object-cover w-full h-full transition-all duration-700 ease-out",
                        hovered !== null && hovered !== index ? "grayscale-[80%]" : "hover:scale-105"
                    )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
            </div>

            <div className="flex-1 flex flex-col p-8 bg-zinc-900 relative z-20">

                <h3 className="text-2xl font-bold text-white text-left leading-tight mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                    {card.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed text-left line-clamp-4 mb-6">
                    {card.description}
                </p>

                <div className="mt-auto pt-5 border-t border-zinc-800 flex flex-row items-center justify-between w-full">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                        Course Fee
                    </span>
                    <span className="text-2xl font-bold text-emerald-400">
                        {card.price}
                    </span>
                </div>
            </div>
        </div>
    )
);

Card.displayName = "Card";

export function FocusCards({ cards }) {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto w-full px-4 md:px-0">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}
