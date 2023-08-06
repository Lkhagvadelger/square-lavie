import { useMemo, Children, ReactNode } from "react";
import { StepConnector } from "./StepConnector";
import { StepContext } from "./StepContext";

type Props = {
  activeStep: number;
  children?: ReactNode;
};

export const Steps = (props: Props) => {
  const { activeStep, children } = props;
  const steps = useMemo(
    () =>
      Children.toArray(children).map((step, i, arr) => (
        <StepContext.Provider
          key={i}
          value={{
            isActive: activeStep === i,
            isCompleted: activeStep > i,
            isLastStep: arr.length !== i + 1,
            step: i + 1,
          }}
        >
          {step}
          {arr.length !== i + 1 && <StepConnector />}
        </StepContext.Provider>
      )),
    [activeStep, children]
  );
  return <>{steps}</>;
};
