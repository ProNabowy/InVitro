import React, { useState, useRef, useEffect } from "react";
import { Angle } from "@/assets/icons";
import useClickOutside from "@/hooks/useClickOutside";

export default function Dropdown({
  options = [],
  placeholder = "",
  selectedOption = null,
  setSelectedOption = () => {},
  className = "",
}) {
  const [visible, setVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const headerRef = useRef(null);
  const optionsRef = useRef([]);

  const allOptions = [placeholder, ...options];

  useClickOutside({ setState: setVisible });

  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, allOptions.length);
  }, [allOptions.length]);

  useEffect(() => {
    if (visible) {
      const startIdx = selectedOption ? allOptions.indexOf(selectedOption) : 0;
      const idx = startIdx >= 0 ? startIdx : 0;
      setHighlightedIndex(idx);
      optionsRef.current[idx]?.focus();
    } else {
      headerRef.current?.focus();
    }
  }, [visible, selectedOption, allOptions]);

  const handleHeaderKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setVisible(true);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setVisible((v) => !v);
        break;
      default:
        break;
    }
  };

  const handleSelect = (option) => {
    setVisible(false);
    setSelectedOption(option);
  };

  const handleOptionKeyDown = (e, idx) => {
    let next;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        next = (idx + 1) % allOptions.length;
        setHighlightedIndex(next);
        optionsRef.current[next]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        next = (idx - 1 + allOptions.length) % allOptions.length;
        setHighlightedIndex(next);
        optionsRef.current[next]?.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleSelect(allOptions[idx]);
        break;
      case "Escape":
        e.preventDefault();
        setVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`border border-[#ced7de] relative rounded-md cursor-pointer ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={headerRef}
        role="combobox"
        aria-controls="dropdown-list"
        aria-expanded={visible}
        aria-haspopup="listbox"
        aria-labelledby="dropdown-label"
        tabIndex={0}
        onClick={() => setVisible((v) => !v)}
        onKeyDown={handleHeaderKeyDown}
        className="py-2 px-3 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span
          id="dropdown-label"
          className="text-[#111623] text-sm font-normal select-none"
        >
          {selectedOption ?? placeholder}
        </span>
        <Angle
          className={`w-4 text-[#111623] ${
            visible ? "rotate-[180deg]" : ""
          } transition`}
        />
      </div>

      <ul
        id="dropdown-list"
        role="listbox"
        tabIndex={-1}
        className={`transition absolute left-0 z-[100] ${
          visible ? "visible opacity-100" : "invisible opacity-0"
        } top-[105%] border border-[#ced7de] w-full max-h-[300px] bg-white shadow-lg rounded-b-lg overflow-auto`}
      >
        {allOptions.map((option, idx) => (
          <li key={idx} role="none">
            <div
              id={`dropdown-option-${idx}`}
              role="option"
              aria-selected={selectedOption === option}
              ref={(el) => (optionsRef.current[idx] = el)}
              tabIndex={-1}
              className={`px-3 py-2 font-medium transition  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                highlightedIndex === idx
                  ? "bg-primary text-white"
                  : "hover:text-primary"
              }`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleOptionKeyDown(e, idx)}
            >
              {option}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
