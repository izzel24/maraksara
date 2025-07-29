import React from 'react'

export default function ProggressBar({ current, total }) {

    return (
        <div className="flex gap-1 mb-6">
            {[...Array(total)].map((_, index) => (
                <div
                    key={index}
                    className={`h-2 flex-1  ${index === current - 1  ? 'bg-[#640101]' : 'bg-gray-300'
                        }`}
                ></div>
            ))}
        </div>
    );
}
