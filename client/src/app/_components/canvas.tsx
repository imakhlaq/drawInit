"use client";
import { RefObject, useContext, useEffect, useRef } from "react";
import { useMounted } from "@/hooks/useMounted";
import { ShapeContext } from "@/store/shape/context";
import { IShapes } from "@/shapes/shapes";
import { Rect } from "@/shapes/rect";
import { Path } from "@/shapes/path";
import { CanvasProperties, StageProperties } from "../../../types/shapes";

type Props = {};
export default function Canvas({}: Props) {
  //to fix window is undefined;
  const mounted = useMounted();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rcCtx = useContext(ShapeContext);

  //2D context for the canvas
  let ctx: CanvasRenderingContext2D | null = null;

  //to determine the size of outer and inner canvas
  let canvasProperties: CanvasProperties | null = null;
  let stageProperties: StageProperties | null = null;

  //to store all the shapes
  let shapes: IShapes[] | null = null;

  // Define the callback functions outside the useEffect hooks
  const downCallbackForPath = (e: PointerEvent) => {
    console.log("ATTACHING PATH EVENT");
    downCallbackForPathHandler(
      e,
      ctx!,
      shapes,
      canvasProperties,
      stageProperties,
      canvasRef,
    );
  };

  const downCallbackForRect = (e: PointerEvent) => {
    console.log("ATTACHING RECT EVENT");
    downCallbackForRectHandler(
      e,
      ctx!,
      shapes,
      canvasProperties,
      stageProperties,
      canvasRef,
    );
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    //clearing adding internal canvas
    clearCanvas(ctx, canvasProperties, stageProperties);

    //each path represents a single shape
    shapes = [];

    canvasRef.current.addEventListener("pointerdown", downCallbackForPath);
  }, [mounted]);

  useEffect(() => {
    console.log(12);
    console.log(canvasRef.current);
    if (!canvasRef.current) return;

    canvasRef.current.removeEventListener("pointerdown", downCallbackForPath);
    canvasRef.current.removeEventListener("pointerdown", downCallbackForRect);

    if (rcCtx.shape === "path") {
      canvasRef.current.addEventListener("pointerdown", downCallbackForPath);
    }

    if (rcCtx.shape === "rect") {
      canvasRef.current.addEventListener("pointerdown", downCallbackForRect);
    }
  }, [rcCtx.shape]);

  if (!mounted) return null;

  //when component is mounted checking, determining the size of the canvas
  canvasProperties = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
  };

  stageProperties = {
    width: 600,
    height: 480,
    left: canvasProperties.center.x - 600 / 2,
    top: canvasProperties.center.y - 480 / 2,
  };

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
}

function drawShapes(ctx: CanvasRenderingContext2D, shapes: (IShapes | null)[]) {
  if (!ctx) return;
  for (const s of shapes) {
    s?.draw(ctx);
  }
}

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvasProperties: CanvasProperties | null,
  stageProperties: StageProperties | null,
) {
  if (!ctx) return;

  //outer canvas
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvasProperties!.width, canvasProperties!.height);

  //inner canvas
  ctx.fillStyle = "white";
  ctx.fillRect(
    stageProperties!.left,
    stageProperties!.top,
    stageProperties!.width,
    stageProperties!.height,
  );
}

// for drawing the path
function downCallbackForPathHandler(
  e: PointerEvent,
  ctx: CanvasRenderingContext2D,
  shapes: IShapes[] | null,
  canvasProperties: CanvasProperties | null,
  stageProperties: StageProperties | null,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const mousePosition = {
    x: e.offsetX,
    y: e.offsetY,
  };

  const currentShape = new Path(mousePosition);

  const moveCallback = function (e: PointerEvent) {
    const mousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    currentShape.addPoint(mousePosition);

    if (!ctx) return;
    //we have to clear the context before drawing on the canvas.
    // if not lines will be drawn over the other line every time
    //TODO change the implementation by adding a drawn property the the path and before drawing check if its been drawn before
    clearCanvas(ctx, canvasProperties, stageProperties);

    drawShapes(ctx, [...shapes!, currentShape]);
  };

  const upCallback = function (e: PointerEvent) {
    if (!canvasRef.current) return;
    //removing event listener after mouse is up
    canvasRef.current.removeEventListener("pointermove", moveCallback);
    canvasRef.current.removeEventListener("pointerup", upCallback);

    shapes?.push(currentShape);
  };

  if (!canvasRef.current) return;
  canvasRef.current.addEventListener("pointermove", moveCallback);
  canvasRef.current.addEventListener("pointerup", upCallback);
}

//to draw a rectangle
function downCallbackForRectHandler(
  e: PointerEvent,
  ctx: CanvasRenderingContext2D,
  shapes: IShapes[] | null,
  canvasProperties: CanvasProperties | null,
  stageProperties: StageProperties | null,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const mousePosition = {
    x: e.offsetX,
    y: e.offsetY,
  };
  const currentShape = new Rect(mousePosition); //TODO add fill and stroke

  const moveCallback = function (e: PointerEvent) {
    const mousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    currentShape.setCorner2(mousePosition);

    if (!ctx) return;

    clearCanvas(ctx, canvasProperties, stageProperties);
    drawShapes(ctx, [...shapes!, currentShape]);
  };

  const upCallback = function (e: PointerEvent) {
    if (!canvasRef.current) return;

    canvasRef.current.removeEventListener("pointermove", moveCallback);
    canvasRef.current.removeEventListener("pointerup", upCallback);

    shapes?.push(currentShape);
  };

  if (!canvasRef.current) return;
  canvasRef.current.addEventListener("pointermove", moveCallback);
  canvasRef.current.addEventListener("pointerup", upCallback);
}