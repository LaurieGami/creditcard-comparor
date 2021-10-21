import React from 'react';

export enum SelectType {
  MERCHANT_ID = 'MERCHANT_ID',
  MERCHANT_CATEGORY_CODE = 'MERCHANT_CATEGORY_CODE',
  CREDIT_CARD = 'CREDIT_CARD',
  BENEFIT = 'BENEFIT',
}

interface SelectComponentProps<S = string> {
  label: string;
  value: S;
  formId: string;
  identifier: SelectType;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: JSX.Element;
}

const SelectComponent = ({ label, formId, value, identifier, onChange, children }: SelectComponentProps) => {
  return (
    <div>
      <label htmlFor={formId}>{label}</label>{' '}
      <select data-input={identifier} value={value} id={formId} onChange={onChange}>
        <option>-</option>
        {children}
      </select>
    </div>
  );
};

export default SelectComponent;
