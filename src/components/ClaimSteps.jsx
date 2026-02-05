const CLAIM_STEPS = [
  "EN_COURS",
  "ACCEPTE",
  "PAYE",
];

const ClaimSteps = ({ status }) => (
  <div className="flex items-center gap-4 mb-6">
    {CLAIM_STEPS.map((step, index) => {
      const active = CLAIM_STEPS.indexOf(status) >= index;
      return (
        <div key={step} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center
            ${active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}>
            {index + 1}
          </div>
          <span className="text-sm text-gray-600">{step}</span>
        </div>
      );
    })}
  </div>
);

export default ClaimSteps