/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreditCardQuery
// ====================================================

export interface CreditCardQuery_creditCards {
  __typename: "CreditCard";
  id: number | null;
  creditCardName: string | null;
}

export interface CreditCardQuery {
  creditCards: (CreditCardQuery_creditCards | null)[];
}
