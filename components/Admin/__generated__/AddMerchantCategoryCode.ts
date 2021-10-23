/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMerchantCategoryCode
// ====================================================

export interface AddMerchantCategoryCode_addMerchantCategoryCode {
  __typename: "MerchantCategoryCode";
  id: number | null;
  merchantCategory: string | null;
  merchantCategoryCode: number | null;
}

export interface AddMerchantCategoryCode {
  addMerchantCategoryCode: AddMerchantCategoryCode_addMerchantCategoryCode;
}

export interface AddMerchantCategoryCodeVariables {
  merchantCategoryCode: number;
  merchantCategory: string;
}
