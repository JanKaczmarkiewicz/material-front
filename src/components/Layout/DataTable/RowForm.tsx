import React, { useState } from "react";

import RawRowForm from "./RawRowForm";

interface Props {
  onSubmit(data: Object): void;
  values: any;
  controlled?: boolean;
}

const RowForm: React.FC<Props> = ({ onSubmit, values }) => {
  const [input, setInput] = useState(values);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    onSubmit(input);
  };

  return (
    <RawRowForm onChange={handleChange} onSubmit={handleSubmit} input={input} />
  );
};

export default RowForm;
