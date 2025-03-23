"use client";
import { useContext, useEffect, useRef } from "react";
import { useMounted } from "@/hooks/useMounted";
import { ShapeContext } from "@/store/shape/context";

type Props = {};
export default function Canvas({}: Props) {
  //to fix window is undefined;
  const mounted = useMounted();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rcCtx = useContext(ShapeContext);

  console.log(rcCtx.shape);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasProperties = {
      width: window.innerWidth,
      height: window.innerHeight,
      center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    };

    const stageProperties = {
      width: 600,
      height: 480,
      left: canvasProperties.center.x - 600 / 2,
      top: canvasProperties.center.y - 480 / 2,
    };

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    //clearing adding internal canvas
    clearCanvas();

    //to store path of mouse
    let path: { x: number; y: number }[] = [];

    //each path represents a single shape
    const shapes: { x: number; y: number }[][] = [];

    // for recording mouse location and lines
    canvasRef.current.addEventListener("pointerdown", function (e) {
      const mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
      };

      path.push(mousePosition);

      if (!canvasRef.current) return;

      const mouseMoveCallback = function (e: PointerEvent) {
        const mousePosition = {
          x: e.offsetX,
          y: e.offsetY,
        };
        path.push(mousePosition);

        //we have to clear the context before drawing on the canvas.
        // if not lines will be drawn over the other line every time
        //TODO change the implementation by adding a drawn property the the path and before drawing check if its been drawn before
        clearCanvas();

        //start drawing when mouse moves
        for (const shape of [...shapes, path]) {
          ctx.beginPath();
          ctx.moveTo(shape[0].x, shape[0].y);

          for (const iShape of shape) {
            ctx.lineTo(iShape.x, iShape.y);
          }
          ctx.stroke();
        }
      };

      const upCallback = function (e: PointerEvent) {
        if (!canvasRef.current) return;
        //removing event listener after mouse is up
        canvasRef.current.removeEventListener("pointermove", mouseMoveCallback);
        canvasRef.current.removeEventListener("pointerup", upCallback);

        shapes.push(path);
        path = [];
      };

      canvasRef.current.addEventListener("pointermove", mouseMoveCallback);
      canvasRef.current.addEventListener("pointerup", upCallback);
    });

    function clearCanvas() {
      if (!ctx) return;

      //outer canvas
      ctx.fillStyle = "gray";
      ctx.fillRect(0, 0, canvasProperties.width, canvasProperties.height);

      //inner canvas
      ctx.fillStyle = "white";
      ctx.fillRect(
        stageProperties.left,
        stageProperties.top,
        stageProperties.width,
        stageProperties.height,
      );
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
}