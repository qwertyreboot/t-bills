export default function StepStatusIndicator({ currentStep, totalSteps, goto }) {
  return (
    <nav className="flex items-center justify-center">
      <p className="text-sm">
        Step {currentStep + 1} of {totalSteps}
      </p>

      <ol className="ml-8 flex items-center space-x-5">
        {Array(totalSteps)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              {i < currentStep ? (
                <button
                  onClick={() => goto(i)}
                  className="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900"
                ></button>
              ) : i === currentStep ? (
                <button className="relative flex items-center justify-center">
                  <span className="absolute flex h-5 w-5">
                    <span className="h-full w-full rounded-full bg-blue-200" />
                  </span>
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-blue-600" />
                </button>
              ) : (
                <button
                  onClick={() => goto(i)}
                  className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
                ></button>
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
}
