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

  const exposeObj = {
    shape,
    setShape,
  };

  return (
    <ShapeContext.Provider value={exposeObj}>{children}</ShapeContext.Provider>
  );
}