"use client";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMounted } from "@/hooks/useMounted";
import { ShapeContext } from "@/store/shape/context";
import { IShapes } from "@/shapes/shapes";
import { Rect } from "@/shapes/rect";
import { Path } from "@/shapes/path";
import clearCanvas from "@/lib/clearCanvas";

type Props = {};
export default function Canvas({}: Props) {
  //to fix window is undefined;
  const isMounted = useMounted();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rcCtx = useContext(ShapeContext);
  //to store all the shapes
  const [shapes, setShapes] = useState<IShapes[]>([]);
  const isCanvasRendered = useRef<boolean>(true);

  //2D context for the canvas
  let ctx: CanvasRenderingContext2D | null = null;

  const downCallbackForPath = (e: PointerEvent) => {
    downCallbackForPathHandler(e, ctx!, shapes, setShapes, canvasRef);
  };

  const downCallbackForRect = (e: PointerEvent) => {
    downCallbackForRectHandler(e, ctx!, shapes, setShapes, canvasRef);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (isCanvasRendered.current) {
      clearCanvas(ctx);
      isCanvasRendered.current = false;
    }

    if (rcCtx.shape === "path") {
      canvasRef.current.addEventListener("pointerdown", downCallbackForPath);
    }

    if (rcCtx.shape === "rect") {
      console.log("RECT SELECTED");
      canvasRef.current.addEventListener("pointerdown", downCallbackForRect);
    }

    //before running the effect we have to remove the previous event listener
    return () => {
      canvasRef.current?.removeEventListener(
        "pointerdown",
        downCallbackForPath,
      );

      canvasRef.current?.removeEventListener(
        "pointerdown",
        downCallbackForRect,
      );
    };
  }, [isMounted, rcCtx.shape]);

  if (!isMounted) return null;

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

// for drawing the path
function downCallbackForPathHandler(
  e: PointerEvent,
  ctx: CanvasRenderingContext2D,
  shapes: IShapes[],
  setShapes: Dispatch<SetStateAction<IShapes[]>>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const mousePosition = {
    x: e.offsetX,
    y: e.offsetY,
  };

  const currentShape = new Path(mousePosition);

  if (!canvasRef.current) return;
  canvasRef.current.addEventListener("pointermove", moveCallback);
  canvasRef.current.addEventListener("pointerup", upCallback);

  function moveCallback(e: PointerEvent) {
    const mousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    currentShape.addPoint(mousePosition);

    if (!ctx) return;
    //we have to clear the context before drawing on the canvas.
    // if not lines will be drawn over the other line every time
    //TODO change the implementation by adding a drawn property the the path and before drawing check if its been drawn before
    clearCanvas(ctx);

    drawShapes(ctx, [...shapes, currentShape]);
  }

  function upCallback(e: PointerEvent) {
    if (!canvasRef.current) return;
    // //removing event listener after mouse is up
    canvasRef.current.removeEventListener("pointermove", moveCallback);
    canvasRef.current.removeEventListener("pointerup", upCallback);

    shapes.push(currentShape);
  }
}

// to draw a rectangle
function downCallbackForRectHandler(
  e: PointerEvent,
  ctx: CanvasRenderingContext2D,
  shapes: IShapes[],
  setShapes: Dispatch<SetStateAction<IShapes[]>>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const mousePosition = {
    x: e.offsetX,
    y: e.offsetY,
  };
  const currentShape = new Rect(mousePosition); //TODO add fill and stroke

  if (!canvasRef.current) return;
  canvasRef.current.addEventListener("pointermove", moveCallback);
  canvasRef.current.addEventListener("pointerup", upCallback);

  function moveCallback(e: PointerEvent) {
    const mousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    currentShape.setCorner2(mousePosition);

    if (!ctx) return;

    clearCanvas(ctx);
    drawShapes(ctx, [...shapes, currentShape]);
  }

  function upCallback(e: PointerEvent) {
    if (!canvasRef.current) return;

    canvasRef.current.removeEventListener("pointermove", moveCallback);
    canvasRef.current.removeEventListener("pointerup", upCallback);

    shapes.push(currentShape);
  }
}