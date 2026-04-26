import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export default function AmslerGridTest() {
  const navigate = useNavigate();

  const [step, setStep] = useState<"intro" | "test" | "result">("intro");
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setAnswer(value);
    setTimeout(() => setStep("result"), 800);
  };

  // ✅ RESULT SCREEN
  if (step === "result") {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Result</h1>

        <p className="text-lg mb-4 max-w-md">
          {answer === "normal"
            ? "No distortion detected. Your central vision appears normal."
            : "Distortion or missing areas detected. This may indicate macular issues."}
        </p>

        {/* medical disclaimer */}
        <p className="text-sm text-gray-500 max-w-md mb-6">
          ⚠️ This is a screening tool only and not a medical diagnosis. 
          Please consult a qualified eye specialist for proper evaluation.
        </p>

        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // ✅ INTRO SCREEN (MEDICAL STYLE)
  if (step === "intro") {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Amsler Grid Test</h1>

        <div className="max-w-md text-sm text-white mb-6 space-y-2">
          <p>• Sit about 30–40 cm away from the screen</p>
          <p>• Wear your reading glasses if you use them</p>
          <p>• Cover one eye and focus on the center dot</p>
          <p>• Keep your gaze fixed and observe the grid</p>
          <p>• Repeat the test for the other eye</p>
        </div>

        <Button onClick={() => setStep("test")}>
          Start Test
        </Button>

        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
    );
  }

  // ✅ TEST SCREEN
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-lg font-semibold mb-2">Focus on the center dot</h2>
      <p className="text-sm text-white mb-4 text-center">
        Do not move your eyes. Are any lines wavy, blurred, or missing?
      </p>

      {/* Grid */}
      <div className="w-80 h-80 bg-white relative border-2 border-black mb-6">
        {/* horizontal lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute bg-black"
            style={{
              width: "100%",
              height: "1px",
              top: `${(i / 20) * 100}%`,
              opacity: 0.6,
            }}
          />
        ))}

        {/* vertical lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute bg-black"
            style={{
              height: "100%",
              width: "1px",
              left: `${(i / 20) * 100}%`,
              opacity: 0.6,
            }}
          />
        ))}

        {/* center fixation point */}
        <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Answer buttons */}
      <div className="flex gap-4">
        <Button onClick={() => handleAnswer("normal")}>
          Lines are normal
        </Button>

        <Button variant="destructive" onClick={() => handleAnswer("distorted")}>
          Distorted / Missing
        </Button>
      </div>

      <Button
        variant="ghost"
        className="mt-4"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}