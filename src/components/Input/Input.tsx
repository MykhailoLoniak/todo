import React, { useState } from "react";
import { storeType } from "../../types/type";
import "./style.scss";

interface InputProps {
  stateStore: storeType[];
  setStateStore: React.Dispatch<React.SetStateAction<storeType[]>>;
  err: string;
  setErr: React.Dispatch<React.SetStateAction<string>>;
}

export const Input: React.FC<InputProps> = ({ err, setErr, stateStore, setStateStore }) => {
  const [input, setInput] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErr('');
    setInput(event.target.value);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput.length) {
      setErr('Input cannot be empty');
      return;
    }

    const isDuplicate = stateStore.some(e => e.title === trimmedInput);

    if (isDuplicate) {
      setErr('To do already exists');
      return;
    }

    const id = stateStore.length > 0 ? Math.max(...stateStore.map(item => item.id)) + 1 : 1;

    const newStor = [...stateStore, {
      status: 0,
      title: trimmedInput,
      id
    }]

    setStateStore(newStor)
    setInput('');
  }

  const styles = {
    wrapper: "w-full max-w-[1024px] mx-auto flex flex-wrap gap-4 p-4",
    form: "flex items-center gap-4 w-full",
    label: "text-2xl flex items-center w-full gap-2 text-sm font-medium text-gray-700",
    input: "h-[60px] flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    button: "h-[60px] text-2xl px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  };


  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          Add new todo
          <input
            type="text"
            placeholder="Enter the text..."
            value={input}
            onChange={onChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Add</button>
      </form>
      {err && <div className="text-red-500">{err}</div>}
    </div>
  );
};