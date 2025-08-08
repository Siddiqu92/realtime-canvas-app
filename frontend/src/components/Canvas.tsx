import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { useStore } from '../store';

interface CanvasProps {
  onDrag: (id: string, x: number, y: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onDrag }) => {
  const rectangles = useStore((state) => state.rectangles);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight - 80}>
      <Layer>
        {rectangles.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill={rect.fill}
            draggable
            onDragMove={(e) => {
              const id = e.target.id();
              const { x, y } = e.target.position();
              onDrag(id, x, y);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
