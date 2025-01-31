import { memo, useEffect, useReducer, useState } from "react";
import clickSound from "./ClickSound.m4a";

function reducer(state, action) {
  switch (action.type) {
    case "number":
      return { ...state, number: action.payload };
    case "sets":
      return { ...state, sets: action.payload };
    case "speed":
      return { ...state, speed: action.payload };
    case "durationBreak":
      return { ...state, durationBreak: action.payload };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

function Calculator({ workouts, allowSound }) {
  const initialState = {
    number: workouts.at(0).numExercises,
    sets: 3,
    speed: 90,
    durationBreak: 5,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { number, sets, speed, durationBreak } = state;
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const [duration, setDuration] = useState(0);
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    return () => {};
  }, [durationBreak, number, sets, speed]);

  useEffect(
    function () {
      function playSound() {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      }
      playSound();
    },
    [allowSound, duration]
  );

  function handleIncDuration() {
    setDuration((duration) => Math.floor(duration) + 1);
  }
  function handleDecDuration() {
    setDuration((duration) => {
      if (duration <= 0) return 0;
      return Math.floor(duration) - 1;
    });
  }

  function handleNumberOfWorkouts(e) {
    e.preventDefault();
    dispatch({ type: "number", payload: e.target.value });
  }
  function handleSets(e) {
    e.preventDefault();
    dispatch({ type: "sets", payload: e.target.value });
  }
  function handleSpeed(e) {
    e.preventDefault();
    dispatch({ type: "speed", payload: e.target.value });
  }
  function handleDurationBreak(e) {
    e.preventDefault();
    dispatch({ type: "durationBreak", payload: e.target.value });
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={handleNumberOfWorkouts}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={handleSets}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={handleSpeed}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={handleDurationBreak}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDecDuration}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleIncDuration}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
