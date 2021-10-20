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
