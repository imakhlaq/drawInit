"use client";
import { useContext } from "react";
import { ShapeContext } from "@/store/shape/context";
import { AvailableShapes } from "../../../types/shapes";

type Props = {};
export default function ToolBox({}: Props) {
  const rcCtx = useContext(ShapeContext);

  return (
    <select
      id="toolBox"
      className="absolute top-[10px] left-4 bg-white  py-1 px-2"
      defaultValue="path"
      onChange={(e) => {
        rcCtx.setShape(e.currentTarget.value as AvailableShapes);
      }}
    >
      <option value="path">Path</option>
      <option value="rect">Rect</option>
    </select>
  );
}