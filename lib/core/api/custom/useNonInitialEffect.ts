import { EffectCallback, DependencyList, useRef, useEffect } from "react";

export const useNonInitialEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const initialRender = useRef(true);
  useEffect(() => {
    let effectReturns: void | (() => void | any) = () => {};
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }
    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
