import { createContext } from "react";

export type Context = {
  step: number;
  isActive: boolean;
  isCompleted: boolean;
  isLastStep: boolean;
};

export const StepContext = createContext<Context | null>(null);
