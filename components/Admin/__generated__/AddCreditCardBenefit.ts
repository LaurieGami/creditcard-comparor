/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCreditCardBenefit
// ====================================================

export interface AddCreditCardBenefit_addCreditCardBenefit {
  __typename: "CreditCardBenefit";
  benefitId: number | null;
  creditCardId: number | null;
}

export interface AddCreditCardBenefit {
  addCreditCardBenefit: AddCreditCardBenefit_addCreditCardBenefit;
}

export interface AddCreditCardBenefitVariables {
  benefitId: number;
  creditCardId: number;
}
