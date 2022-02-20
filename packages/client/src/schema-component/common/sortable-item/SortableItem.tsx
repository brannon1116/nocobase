import { useDraggable, useDroppable } from '@dnd-kit/core';
import { observer, useField, useFieldSchema } from '@formily/react';
import React, { createContext, useContext } from 'react';

export const DraggableContext = createContext(null);

export const Sortable = (props: any) => {
  const { id, data, style, children, ...others } = props;
  const draggable = useDraggable({
    id,
    data,
  });

  const { isOver, setNodeRef } = useDroppable({
    id,
    data,
  });

  const droppableStyle = { ...style };

  if (isOver) {
    droppableStyle['color'] = 'rgba(241, 139, 98, .1)';
  }

  return (
    <DraggableContext.Provider value={draggable}>
      <div {...others} ref={setNodeRef} style={droppableStyle}>
        {children}
      </div>
    </DraggableContext.Provider>
  );
};

export const SortableItem: React.FC<any> = observer((props) => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  return (
    <Sortable {...props} id={field.address.toString()} data={{ insertAdjacent: 'afterEnd', schema: fieldSchema }}>
      {props.children}
    </Sortable>
  );
});

export const DragHandler = (props) => {
  const { isDragging, attributes, listeners, setNodeRef, transform } = useContext(DraggableContext);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        lineHeight: '12px',
        textAlign: 'left',
      }}
    >
      <div
        ref={setNodeRef}
        style={{
          // ...style,
          position: 'relative',
          zIndex: 1,
          // backgroundColor: '#333',
          lineHeight: 0,
          height: 2,
          width: 2,
          fontSize: 0,
          display: 'inline-block',
        }}
        {...listeners}
        {...attributes}
      >
        <span style={{ cursor: 'move', fontSize: 12 }}>{props.children}</span>
      </div>
    </div>
  );
};
