import { createContext, Dispatch, SetStateAction } from "react";
import { AvailableShapes } from "../../../types/shapes";

type InitialType = {
  shape: AvailableShapes;
  setShape: Dispatch<SetStateAction<AvailableShapes>>;
};

const initialState = {} as InitialType;

export const ShapeContext = createContext<InitialType>(initialState);