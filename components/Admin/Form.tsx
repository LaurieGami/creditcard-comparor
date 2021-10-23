import React from 'react';

interface FormProps {
  formName: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  isLoading: boolean;
  error?: string;
}

const Form = ({ formName, onSubmit, error, isLoading, children }: FormProps) => {
  return (
    <section>
      <h3>{formName}</h3>
      <form onSubmit={onSubmit}>
        {children}
        <input type="submit" value="Submit" disabled={isLoading} />
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};

export default Form;
