// react-beautiful-dnd.d.ts

declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  // Type for draggable items
  interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided, snapshot: DraggableSnapshot) => React.ReactNode;
  }

  interface DraggableProvided {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: {
      'data-rbd-draggable-id': string;
      'data-rbd-draggable-context-id': string;
      style?: React.CSSProperties; // Inline style
    };
    dragHandleProps?: {
      onMouseDown: (event: React.MouseEvent) => void;
      onTouchStart: (event: React.TouchEvent) => void;
    };
  }

  interface DraggableSnapshot {
    isDragging: boolean; // Whether the item is currently being dragged
    isDropAnimating: boolean; // Whether the drop animation is occurring
    draggingOver: string | null; // ID of the droppable being dragged over (if any)
  }

  // Type for droppable areas
  interface DroppableProps {
    droppableId: string;
    direction?: 'horizontal' | 'vertical';
    children: (provided: DroppableProvided, snapshot: DroppableSnapshot) => React.ReactNode;
  }

  interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: {
      'data-rbd-droppable-id': string;
      'data-rbd-droppable-context-id': string;
    };
    placeholder: React.ReactNode; // Placeholder element for maintaining space
  }

  interface DroppableSnapshot {
    isDraggingOver: boolean; // Whether an item is currently being dragged over this droppable
    draggingFromThisWith: string | null; // ID of the draggable item being dragged
  }

  // Result of a drag event
  interface DropResult {
    draggableId: string; // ID of the dragged item
    type: string; // Type of the item (if using types)
    source: {
      droppableId: string; // ID of the source droppable
      index: number; // Index of the item in the source
    };
    destination?: {
      droppableId: string; // ID of the destination droppable
      index: number; // Index of the item in the destination
    } | null; // Can be null if dropped outside
  }

  // Type for the context
  interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    onDragStart?: (start: { draggableId: string; type: string; }) => void; // Optional: called when dragging starts
    onDragUpdate?: (update: { draggableId: string; type: string; }) => void; // Optional: called when dragging updates
    children: React.ReactNode;
  }

  // Main components
  export class DragDropContext extends React.Component<DragDropContextProps> {}
  export class Droppable extends React.Component<DroppableProps> {}
  export class Draggable extends React.Component<DraggableProps> {}
}
