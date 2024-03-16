import { useEffect, useRef, useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

export default function MyRangeSlider({ min, max, value, onChange }) {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  useEffect(() => {
    if (value) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
    }
  }, [value]);

  return (
    <>
      <div className="mb-2 d-flex justify-content-between">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>
      <Slider
        range
        className="customRCSlider"
        min={min ? min : 0}
        max={max ? max : 1000}
        value={[minValue, maxValue]}
        onChange={(e) => {
          setMinValue(e[0]);
          setMaxValue(e[1]);
        }}
        onChangeComplete={(e) => {
          onChange({ min: e[0], max: e[1] });
        }}
      />
    </>
  );
}
