import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';

export default function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id ,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        padding: '10px 20px',
        background: 'lightblue',
        cursor: 'grab',
        marginBottom: '10px',
    };

    return (
        <button className='max-w-[250px]' ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {props.name}
        </button>
    );
}
