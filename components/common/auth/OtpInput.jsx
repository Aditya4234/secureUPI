"use client";

import { useRef, useEffect } from "react";

export default function OtpInput({ value, onChange, length = 6 }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    if (val) {
      const newValue = value.split("").map((v, i) => (i === index ? val : v));
      if (newValue.length < length) {
        newValue.length = length;
        newValue.fill("", index + 1);
      }
      onChange(newValue.join("").slice(0, length));
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    if (pasted.length === length) {
      inputRefs.current[length - 1]?.focus();
    } else if (pasted.length > 0) {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded-lg border border-zinc-200 text-center text-lg font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
        />
      ))}
    </div>
  );
}

