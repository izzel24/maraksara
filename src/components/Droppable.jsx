import { useDroppable } from '@dnd-kit/core';
import React from 'react'

export default function Droppable( { id , children , name }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef}>
            <div className='aspect-video shadow-s flex flex-col justify-between items-center p-4'>
                <div className='flex-grow flex items-center justify-center'>
                    <h1 className='font-aksara lg:text-7xl md:text-6xl text-4xl select-none'>{name}</h1>
                </div>
                <div className='text-center p-2 bg-gray-200 sm:h-20 h-14 w-full shadow-inner flex justify-center items-center'>
                    {children}
                </div>
            </div>
        </div>
    );
}
4