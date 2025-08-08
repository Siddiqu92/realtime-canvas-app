
#  Real-time Canvas Application

A collaborative real-time canvas application built with **React (TypeScript)**, **Tailwind CSS**, **Zustand**, **React Konva**, and **Socket.io**.  
Multiple users can add and move rectangles on a shared canvas, and all changes sync instantly across clients.



##  Features

- **Real-time Collaboration** — All connected clients see live updates instantly.
- **Add Rectangles** — Click the "Add Rectangle" button to create new draggable shapes.
- **Drag & Drop** — Move rectangles around the canvas with smooth updates.
- **Multi-client Sync** — Open multiple browser tabs to see live changes.
- **WebSocket Backend** — Powered by Socket.io for low-latency updates.


##  Tech Stack

**Frontend**
- React.js (Vite) + TypeScript
- Tailwind CSS
- Zustand (state management)
- React Konva (canvas manipulation)
- Socket.io-client

**Backend**
- Node.js + TypeScript
- Socket.io (WebSocket communication)
- Express.js



##  Project Structure



realtime-canvas-app/
│
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── server/                # Node.js backend
│   ├── src/
│   │   └── index.ts
│   └── package.json
│
└── README.md




##  Installation & Setup

### 1️ Clone the repository
```bash
git clone https://github.com/Siddiqu92/realtime-canvas-app.git
cd realtime-canvas-app


###  Install dependencies

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

```bash
cd ../server
npm install
```



##  Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

* Backend will run on: `http://localhost:5000`
* Frontend will run on: `http://localhost:5173`



##  Deployment

* **Frontend:** Hosted on [Vercel](https://vercel.com)
* **Backend:** Can be deployed on Render, Railway, or any Node.js hosting service.




##  How It Works

1. **Adding a Rectangle**

   * Creates a rectangle in local state.
   * Emits `rectangle:add` event to the backend via Socket.io.
   * Backend broadcasts the new rectangle to all connected clients.

2. **Dragging a Rectangle**

   * `onDragMove` event captures the position change.
   * Emits `rectangle:move` event to backend.
   * Backend broadcasts position update to other clients.



##  Testing Real-time Sync

1. Open `http://localhost:5173` in two browser tabs.
2. Add a rectangle in one tab — it should instantly appear in the other.
3. Drag a rectangle — it should move in real-time in both tabs.



##  License

