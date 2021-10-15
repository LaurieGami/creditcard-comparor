import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query AllDataQuery {
    creditCards {
      id
      creditCardName
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
