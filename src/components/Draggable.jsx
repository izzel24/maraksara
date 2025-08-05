import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';

export default function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id ,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        padding: '10px 30px',
        background: '#640101',
        cursor: 'grab',
        color: 'white',
    };

    return (
        <div className='flex justify-center items-center font-inter' ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {props.name}
        </div>
    );
}
