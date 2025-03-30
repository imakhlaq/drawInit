export type Shape = {
  x: number;
  y: number;
  isAlreadyDrawn?: boolean;
};

export type ShapeOptions = {
  fillColor: string;
  strokeColor: string;
  strokeSize: number;
};

export type AvailableShapes = "path" | "rect";