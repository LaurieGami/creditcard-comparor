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

export interface AllDataQuery_merchants {
  __typename: "Merchant";
  id: number | null;
  merchantCodeId: number | null;
  merchantName: string | null;
}

export interface AllDataQuery_merchantCategoryCodes {
  __typename: "MerchantCategoryCode";
  id: number | null;
  merchantCategory: string | null;
  merchantCategoryCode: number | null;
}

export interface AllDataQuery {
  creditCards: (AllDataQuery_creditCards | null)[];
  merchants: (AllDataQuery_merchants | null)[];
  merchantCategoryCodes: (AllDataQuery_merchantCategoryCodes | null)[];
}
