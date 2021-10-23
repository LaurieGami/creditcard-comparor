import { gql } from '@apollo/client';

export const GET_ALL_DATA = gql`
  query AllDataQuery {
    creditCards {
      id
      creditCardName
    }
    merchants {
      id
      merchantCodeId
      merchantName
    }
    merchantCategoryCodes {
      id
      merchantCategory
      merchantCategoryCode
    }
    benefits {
      benefitCashback
      name
      id
    }
    creditCardBenefits {
      benefitId
      creditCardId
    }
  }
`;

export const ADD_CREDIT_CARD = gql`
  mutation AddCreditCard($creditCardName: String!) {
    addCreditCard(creditCardName: $creditCardName) {
      creditCardName
    }
  }
`;

export const ADD_MERCHANT = gql`
  mutation AddMerchant($merchantName: String!, $merchantCategoryCode: Int!) {
    addMerchant(merchantName: $merchantName, merchantCategoryCode: $merchantCategoryCode) {
      merchantName
      merchantCodeId
    }
  }
`;

export const ADD_BENEFIT = gql`
  mutation AddBenefit($benefitName: String!, $benefitCashback: Float!, $merchantCodeId: Int!) {
    addBenefit(benefitName: $benefitName, benefitCashback: $benefitCashback, merchantCodeId: $merchantCodeId) {
      id
      name
      benefitCashback
    }
  }
`;

export const ADD_CREDIT_CARD_BENEFIT = gql`
  mutation AddCreditCardBenefit($benefitId: Int!, $creditCardId: Int!) {
    addCreditCardBenefit(benefitId: $benefitId, creditCardId: $creditCardId) {
      benefitId
      creditCardId
    }
  }
`;

export const ADD_MERCHANT_CATEGORY_CODE = gql`
  mutation AddMerchantCategoryCode($merchantCategoryCode: Int!, $merchantCategory: String!) {
    addMerchantCategoryCode(merchantCategoryCode: $merchantCategoryCode, merchantCategory: $merchantCategory) {
      id
      merchantCategory
      merchantCategoryCode
    }
  }
`;
