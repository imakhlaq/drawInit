"use client";
import { useContext } from "react";
import { ShapeContext } from "@/store/shape/context";
import { AvailableShapes } from "../../../types/shapes";

type Props = {};
export default function ToolBox({}: Props) {
  const rcCtx = useContext(ShapeContext);

  return (
    <div className="absolute top-[10px] left-4">
      <select
        id="toolBox"
        className=" bg-white  py-1 px-2"
        defaultValue="path"
        onChange={(e) => {
          rcCtx.setShape(e.currentTarget.value as AvailableShapes);
        }}
      >
        <option value="path">Path</option>
        <option value="rect">Rect</option>
      </select>
      <div>
        <input
          type="color"
          id="fillColor"
          value={rcCtx.fillColor}
          onChange={(e) => rcCtx.setFillColor(e.currentTarget.value)}
          title="Fill Color"
        />
        <input
          type="color"
          id="strokeColor"
          onChange={(e) => rcCtx.setStrokeColor(e.currentTarget.value)}
          value={rcCtx.strokeColor}
          title="Stroke Color"
        />
        <input
          type="range"
          onChange={(e) => rcCtx.setStrokeSize(+e.currentTarget.value)}
          value={rcCtx.strokeSize}
          min="1"
          max="10"
          title="Stoke Size"
        />
      </div>
    </div>
  );
}