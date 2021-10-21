/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddBenefit
// ====================================================

export interface AddBenefit_addBenefit {
  __typename: "Benefit";
  id: number | null;
  name: string | null;
  benefitCashback: number | null;
}

export interface AddBenefit {
  addBenefit: AddBenefit_addBenefit;
}

export interface AddBenefitVariables {
  benefitName: string;
  benefitCashback: number;
  merchantCodeId: number;
}
