import React, { useReducer } from "react";
import { Sub } from "../types";
import useNewSubForm from "../hooks/useNewSubForm";

interface FormProps {
  onNewSub: (newSub: Sub) => void;
}

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, dispatch] = useNewSubForm();
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNewSub(inputValues);
    handleClear();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  const handleClear = () => {
    dispatch({
      type: "clear",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValues.nick}
        onChange={handleChange}
        name="nick"
        placeholder="nick"
      />
      <input
        type="number"
        value={inputValues.subMonths}
        onChange={handleChange}
        name="subMonths"
        placeholder="subMonths"
      />
      <input
        type="text"
        value={inputValues.avatar}
        onChange={handleChange}
        name="avatar"
        placeholder="avatar"
      />
      <textarea
        value={inputValues.description}
        onChange={handleChange}
        name="description"
        placeholder="description"
      />
      <button type="button" onClick={handleClear}>
        clear inputs
      </button>
      <button type="submit">Save new sub</button>
    </form>
  );
};

export default Form;
