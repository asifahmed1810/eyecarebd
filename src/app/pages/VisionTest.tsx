import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";


type Level = {
  size: number;
  label: string;
  passScore: number;
  attempts: number;
  correct: number;
};

const initialLevels: Level[] = [
  { size: 120, label: "20/200", passScore: 2, attempts: 0, correct: 0 },
  { size: 80, label: "20/100", passScore: 2, attempts: 0, correct: 0 },
  { size: 60, label: "20/70", passScore: 3, attempts: 0, correct: 0 },
  { size: 40, label: "20/50", passScore: 3, attempts: 0, correct: 0 },
  { size: 30, label: "20/40", passScore: 3, attempts: 0, correct: 0 },
  { size: 20, label: "20/30", passScore: 4, attempts: 0, correct: 0 },
  { size: 15, label: "20/20", passScore: 4, attempts: 0, correct: 0 },
];

const directions = ["up", "down", "left", "right"] as const;

export default function VisionTest() {
  const navigate = useNavigate();

  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [levelIndex, setLevelIndex] = useState(0);
  const [direction, setDirection] = useState<typeof directions[number]>("up");

  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [done, setDone] = useState(false);

  const current = levels[levelIndex];

  const getRandomDirection = () =>
    directions[Math.floor(Math.random() * directions.length)];

  useEffect(() => {
    setDirection(getRandomDirection());
  }, []);

  const handleClick = (choice: typeof directions[number]) => {
    if (feedback !== null || done) return;

    const correct = choice === direction;

    setAttempts((a) => a + 1);

    setLevels((prev) =>
      prev.map((lvl, i) =>
        i === levelIndex
          ? {
              ...lvl,
              attempts: lvl.attempts + 1,
              correct: correct ? lvl.correct + 1 : lvl.correct,
            }
          : lvl
      )
    );

    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setFeedback(correct);

    setTimeout(() => {
      setFeedback(null);
      processNext();
    }, 700);
  };

  const processNext = () => {
    const lvl = levels[levelIndex];

    if (lvl.correct >= lvl.passScore) {
      if (levelIndex < levels.length - 1) {
        setLevelIndex((i) => i + 1);
      } else {
        setDone(true);
      }
    } else if (lvl.attempts >= 5) {
      setDone(true);
    }

    setDirection(getRandomDirection());
  };

  const restart = () => {
    setLevels(initialLevels);
    setLevelIndex(0);
    setScore(0);
    setAttempts(0);
    setStreak(0);
    setMaxStreak(0);
    setDone(false);
    setDirection(getRandomDirection());
  };

  const rotations: Record<string, number> = {
    up: 270,
    down: 90,
    left: 180,
    right: 0,
  };

  if (done) {
    const accuracy = ((score / attempts) * 100 || 0).toFixed(0);

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Test Complete 🎉</h1>

        <p className="text-xl mb-2">Vision: {levels[levelIndex].label}</p>
        <p className="mb-2">Accuracy: {accuracy}%</p>
        <p className="mb-6">Best Streak: {maxStreak}</p>

        <div className="flex gap-4">
          <Button onClick={restart}>Retake</Button>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="mb-2 font-semibold">
        Level: {current.label} ({current.correct}/{current.passScore})
      </h2>

      <p className="text-sm text-white mb-4">
        Look at the "E" and choose direction
      </p>

      {/* E Letter */}
      <div
        className="font-bold mb-8"
        style={{
          fontSize: current.size,
          transform: `rotate(${rotations[direction]}deg)`,
        }}
      >
        E
      </div>

      {/* Feedback */}
      {feedback !== null && (
        <p
          className={`mb-4 text-lg ${
            feedback ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback ? "Correct!" : "Wrong!"}
        </p>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <div />
        <Button onClick={() => handleClick("up")}>↑</Button>
        <div />

        <Button onClick={() => handleClick("left")}>←</Button>
        <div />
        <Button onClick={() => handleClick("right")}>→</Button>

        <div />
        <Button onClick={() => handleClick("down")}>↓</Button>
        <div />
      </div>

      {/* Stats */}
      <div className="mt-6 text-sm text-white">
        Score: {score}/{attempts} | Streak: {streak}
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