import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

type Plate = {
  id: number;
  answer: string;
  image: string;
};

// 🎯 Utility: random color variation
const varyColor = (hex: string) => {
  const amt = Math.floor(Math.random() * 60) - 30;
  const num = parseInt(hex.replace("#", ""), 16);

  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `rgb(${r},${g},${b})`;
};

// 🎯 Generate realistic Ishihara plate
const generatePlate = (number: string, bgColors: string[], numColors: string[]) => {
  const size = 320;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Create number mask
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = size;
  maskCanvas.height = size;
  const maskCtx = maskCanvas.getContext("2d")!;

  maskCtx.fillStyle = "white";
  maskCtx.font = "bold 140px Arial";
  maskCtx.textAlign = "center";
  maskCtx.textBaseline = "middle";
  maskCtx.fillText(number, size / 2, size / 2);

  const maskData = maskCtx.getImageData(0, 0, size, size);

  // Draw dots
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 6 + 2;

    const pixelIndex = (Math.floor(y) * size + Math.floor(x)) * 4;
    const isNumber = maskData.data[pixelIndex + 3] > 0;

    const colorSet = isNumber ? numColors : bgColors;
    const baseColor = colorSet[Math.floor(Math.random() * colorSet.length)];

    ctx.fillStyle = varyColor(baseColor);

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas.toDataURL();
};

// 🎯 Plates (realistic color combos)
const plates: Plate[] = [
  {
    id: 1,
    answer: "12",
    image: generatePlate("12", ["#f4a261", "#e9c46a", "#f1c27d"], ["#2a9d8f", "#2ec4b6"]),
  },
  {
    id: 2,
    answer: "8",
    image: generatePlate("8", ["#ffd166", "#f4a261", "#f7b267"], ["#06d6a0", "#118ab2"]),
  },
  {
    id: 3,
    answer: "29",
    image: generatePlate("29", ["#ffadad", "#ffd6a5", "#fdffb6"], ["#6a4c93", "#1982c4"]),
  },
];

export default function ColorTest() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<null | boolean>(null);

  const current = plates[index];

  const handleSubmit = () => {
    if (!input) return;

    const correct = input === current.answer;
    if (correct) setScore((s) => s + 1);

    setFeedback(correct);

    setTimeout(() => {
      setFeedback(null);
      setInput("");

      if (index + 1 < plates.length) {
        setIndex((i) => i + 1);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Result</h1>
        <p className="text-xl mb-6">
          {score} / {plates.length}
        </p>

        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-xl mb-4">
        Plate {index + 1} / {plates.length}
      </h2>

      <img
        src={current.image}
        alt="plate"
        className="w-72 h-72 rounded-full mb-6 shadow-xl border"
      />

      {feedback !== null && (
        <p
          className={`mb-4 font-semibold ${
            feedback ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback ? "Correct!" : `Wrong (Ans: ${current.answer})`}
        </p>
      )}

      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter number"
        className="border p-3 rounded mb-4 text-center text-lg w-40"
      />

      <Button onClick={handleSubmit}>Submit</Button>

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