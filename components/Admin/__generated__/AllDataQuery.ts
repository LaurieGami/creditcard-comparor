/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllDataQuery
// ====================================================

export interface AllDataQuery_creditCards {
  __typename: "CreditCard";
  id: number | null;
  creditCardName: string | null;
}

export interface AllDataQuery {
  creditCards: (AllDataQuery_creditCards | null)[];
}
