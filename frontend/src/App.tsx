import { useEffect } from 'react';
import { useStore } from './store';
import { socket } from './socket';
import Canvas from './components/Canvas';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { addRectangle, updateRectangle } = useStore();

  useEffect(() => {
    // Incoming: new rectangle added by others
    socket.on('rectangle:add', (rect) => {
      addRectangle(rect);
    });

    // Incoming: drag updates from others
    socket.on('rectangle:move', ({ id, x, y }) => {
      updateRectangle(id, { x, y });
    });

    return () => {
      socket.off('rectangle:add');
      socket.off('rectangle:move');
    };
  }, []);

  const handleAdd = () => {
    const newRect = {
      id: uuidv4(),
      x: Math.random() * 400,
      y: Math.random() * 400,
      width: 100,
      height: 100,
      fill: '#'+Math.floor(Math.random()*16777215).toString(16), // random color
    };

    addRectangle(newRect);
    socket.emit('rectangle:add', newRect);
  };

  const handleDrag = (id: string, x: number, y: number) => {
    updateRectangle(id, { x, y });
    socket.emit('rectangle:move', { id, x, y });
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAdd}
      >
        ➕ Add Rectangle
      </button>

      <Canvas onDrag={handleDrag} />
    </div>
  );
}

export default App;
