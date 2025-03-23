import { Shape } from "../../types/shapes";
import { IShapes } from "@/shapes/shapes";

export class Path implements IShapes {
  //to store path of mouse
  private points: Shape[] = [];

  constructor(statingPoint: Shape) {
    this.points.push(statingPoint);
  }

  public addPoint(point: Shape) {
    this.points.push(point);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (const point of this.points) {
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
  }
}