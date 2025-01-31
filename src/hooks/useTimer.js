import { useEffect, useMemo, useState } from "react";

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

const getWorkouts = (partOfDay) => [
  {
    name: "Full-body workout",
    numExercises: partOfDay === "AM" ? 9 : 8,
  },
  {
    name: "Arms + Legs",
    numExercises: 6,
  },
  {
    name: "Arms only",
    numExercises: 3,
  },
  {
    name: "Legs only",
    numExercises: 4,
  },
  {
    name: "Core only",
    numExercises: partOfDay === "AM" ? 5 : 4,
  },
];

export default function useTimer() {
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => getWorkouts(partOfDay), [partOfDay]);

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return { time, workouts };
}
