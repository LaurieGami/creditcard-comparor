/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMerchant
// ====================================================

export interface AddMerchant_addMerchant {
  __typename: "Merchant";
  merchantName: string | null;
  merchantCodeId: number | null;
}

export interface AddMerchant {
  addMerchant: AddMerchant_addMerchant;
}

export interface AddMerchantVariables {
  merchantName: string;
  merchantCategoryCode: number;
}
