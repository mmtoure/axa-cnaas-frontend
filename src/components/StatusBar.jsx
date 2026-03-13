const StatusBar = ({ status }) => {
  const getSteps = (status) => {
    if (status === "REJETE") {
      return ["EN_COURS", "REJETE"];
    }
    return [
      "EN_COURS",
      "ACCEPTE",
      "PAYE",
    ];
  };

  const steps = getSteps(status);
  const currentStep =
    status === "REJETE"
      ? 1
      : steps.indexOf(status);

  const progressColor =
    status === "REJETE" ? "bg-red-500" : "bg-blue-900";

  return (
    <div className="relative w-full">

      {/* barre fond */}
      <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 rounded"></div>

      {/* progression */}
      <div
        className={`absolute top-4 left-0 h-1 ${progressColor} rounded transition-all`}
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />
      <div className="relative flex justify-between items-center -ml-4">
        {steps.map((step, index) => {

          const stepColor =
            status === "REJETE"
              ? index <= currentStep
                ? "bg-red-500 text-white"
                : "bg-gray-300"
              : index <= currentStep
                ? "bg-blue-900 text-white"
                : "bg-gray-300";

            const stepContent =
            status === "REJETE" && step === "REJETE"
              ? "✕"
              : index < currentStep
              ? "✓"
              : index === currentStep
              ? "✓"
              : "";

          return (
            <div key={step} className="flex flex-col items-center -mr-4">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${stepColor}`}
              >
                {stepContent}
              </div>

              <span className="text-xs mt-2">
                {step.replace("_", " ")}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default StatusBar;