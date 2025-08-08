import { create } from 'zustand';

type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

type Store = {
  rectangles: Rect[];
  addRectangle: (rect: Rect) => void;
  updateRectangle: (id: string, data: Partial<Rect>) => void;
  setRectangles: (rects: Rect[]) => void;
};

export const useStore = create<Store>((set) => ({
  rectangles: [],
  addRectangle: (rect) =>
    set((state) => ({ rectangles: [...state.rectangles, rect] })),
  updateRectangle: (id, data) =>
    set((state) => ({
      rectangles: state.rectangles.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    })),
  setRectangles: (rects) => set({ rectangles: rects }),
}));
