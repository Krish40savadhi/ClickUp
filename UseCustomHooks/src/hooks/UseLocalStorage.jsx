import { useState } from "react";

function useLocalStorage(key, initialValue) { 
  const [stored, setStored] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStored(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue];
}

export default function UseLocalStorage() {
  const [name, setName] = useLocalStorage("name", "Guest");

  return (
    <>
      <p>UseLocalStorage Custom hook:</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Don't forget to check local storage </p>
    </>
  );
}
