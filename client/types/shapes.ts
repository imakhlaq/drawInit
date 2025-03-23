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

export type StageProperties = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export type CanvasProperties = {
  width: number;
  height: number;
  center: {
    x: number;
    y: number;
  };
};

export type AvailableShapes = "path" | "rect";