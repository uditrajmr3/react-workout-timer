import { useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import useTimer from "./hooks/useTimer";

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const { workouts } = useTimer();

  return (
    <main>
      <h1>Workout timer</h1>
      <Time />
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

function Time() {
  const { time } = useTimer();

  return <time>For your workout on {time}</time>;
}

export default App;
