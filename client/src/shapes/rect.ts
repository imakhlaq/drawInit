import { Shape } from "../../types/shapes";
import { IShapes } from "@/shapes/shapes";

export class Rect implements IShapes {
  private corner1: Shape;
  private corner2: Shape;

  constructor(corner1: Shape) {
    this.corner1 = corner1;
    this.corner2 = corner1;
  }

  public setCorner2(corner2: Shape) {
    this.corner2 = corner2;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const minX = Math.min(this.corner1.x, this.corner2.x);
    const minY = Math.min(this.corner1.y, this.corner2.y);
    const width = Math.abs(this.corner2.x - this.corner1.x);
    const height = Math.abs(this.corner2.y - this.corner1.y);
    ctx.strokeRect(minX, minY, width, height);
    ctx.beginPath();
  }
}