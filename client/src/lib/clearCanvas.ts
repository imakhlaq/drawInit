export default function clearCanvas(ctx: CanvasRenderingContext2D) {
  if (!ctx) return;

  // Initialize canvasProperties and stageProperties
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