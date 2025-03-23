"use client";
import { createContext, Dispatch, SetStateAction } from "react";
import { AvailableShapes } from "../../../types/shapes";

type InitialType = {
  shape: AvailableShapes;
  setShape: Dispatch<SetStateAction<AvailableShapes>>;
  strokeSize: number;
  setStrokeSize: Dispatch<SetStateAction<number>>;
  strokeColor: string;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  fillColor: string;
  setFillColor: Dispatch<SetStateAction<string>>;
};

const initialState = {} as InitialType;

export const ShapeContext = createContext<InitialType>(initialState);