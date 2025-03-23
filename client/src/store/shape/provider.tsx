"use client";
import { ShapeContext } from "@/store/shape/context";
import { useState } from "react";
import { AvailableShapes } from "../../../types/shapes";

type Props = {
  children: React.ReactNode;
};
export default function ShapeContextProvider({ children }: Props) {
  //to choose shapes.ts
  const [shape, setShape] = useState<AvailableShapes>("path");
  const [strokeColor, setStrokeColor] = useState<string>("#ff0000");
  const [fillColor, setFillColor] = useState<string>("#ff0000");
  const [strokeSize, setStrokeSize] = useState<number>(2);

  const exposeObj = {
    shape,
    setShape,
    strokeSize,
    setStrokeSize,
    strokeColor,
    setStrokeColor,
    fillColor,
    setFillColor,
  };

  return (
    <ShapeContext.Provider value={exposeObj}>{children}</ShapeContext.Provider>
  );
}