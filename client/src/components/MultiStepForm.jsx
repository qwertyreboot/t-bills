import StepStatusIndicator from "./StepStatusIndicator";
import { useState } from "react";

const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const goto = (index) => {
    setCurrentStepIndex(index);
  };

  const next = () => {
    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  };

  const prev = () => {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  };

  return {
    steps,
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    goto,
    next,
    prev,
  };
};

export default function MultiStepForm({ steps }) {
  const { currentStep, currentStepIndex, prev, next, goto } =
    useMultiStepForm(steps);
  return (
    <div className="flex flex-col items-center justify-center">
      {currentStep}
      <div className="w-full mt-6 flex items-center justify-around">
        <button onClick={prev} className="text-gray-500">
          Prev
        </button>
        <StepStatusIndicator
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          goto={goto}
        />
        <button onClick={next} className="text-gray-500">
          Next
        </button>
      </div>
    </div>
  );
}
