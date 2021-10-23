import Head from 'next/head';
import { useState, useCallback, useEffect, useReducer } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AddCreditCard, AddCreditCardVariables } from './__generated__/AddCreditCard';
import { AddMerchant, AddMerchantVariables } from './__generated__/AddMerchant';
import { AddCreditCardBenefit, AddCreditCardBenefitVariables } from './__generated__/AddCreditCardBenefit';
import { AddBenefit, AddBenefitVariables } from './__generated__/AddBenefit';
import { AllDataQuery } from './__generated__/AllDataQuery';
import { AddMerchantCategoryCode, AddMerchantCategoryCodeVariables } from './__generated__/AddMerchantCategoryCode';
import { ADD_CREDIT_CARD, ADD_MERCHANT, ADD_BENEFIT, ADD_CREDIT_CARD_BENEFIT, GET_ALL_DATA, ADD_MERCHANT_CATEGORY_CODE } from './AdminQueries';
import SelectComponent, { SelectType } from './SelectComponent';
import Form from './Form';

enum InputType {
  MERCHANT = 'MERCHANT',
  CREDIT_CARD = 'CREDIT_CARD',
  BENEFIT_NAME = 'BENEFIT_NAME',
  BENEFIT_CASHBACK = 'BENEFIT_CASHBACK',
  MERCHANT_CATEGORY = 'MERCHANT_CATEGORY',
  MERCHANT_CATEGORY_CODE = 'MERCHANT_CATEGORY_CODE',
}

enum BenefitAction {
  UPDATE_BENEFIT_NAME = 'UPDATE_MERCHANT_NAME',
  UPDATE_BENEFIT_CASHBACK = 'UPDATE_MERCHANT_CASHBACK',
  UPDATE_BENEFIT_MERCHANT = 'UPDATE_BENEFIT_MERCHANT',
  RESET = 'RESET',
}

interface AddBenefitState {
  benefitCashback?: number;
  benefitName?: string;
  merchantCodeId?: number;
}

const initialBenefitState: AddBenefitState = {
  benefitCashback: undefined,
  benefitName: '',
  merchantCodeId: undefined,
};

const reducer = (state: AddBenefitState = initialBenefitState, action: { type: BenefitAction; data?: any }) => {
  switch (action.type) {
    case BenefitAction.UPDATE_BENEFIT_NAME:
      return {
        ...state,
        benefitName: action.data,
      };
    case BenefitAction.UPDATE_BENEFIT_MERCHANT:
      return {
        ...state,
        merchantCodeId: action.data,
      };
    case BenefitAction.UPDATE_BENEFIT_CASHBACK:
      return {
        ...state,
        benefitCashback: action.data,
      };
    case BenefitAction.RESET:
      return { ...initialBenefitState };
    default:
      return state;
  }
};

export default function Admin() {
  const { data, loading, error, refetch } = useQuery<AllDataQuery>(GET_ALL_DATA);
  const [addCreditCard, { data: addCreditCardData, loading: addCreditCardLoading, error: addCreditCardError }] = useMutation<
    AddCreditCard,
    AddCreditCardVariables
  >(ADD_CREDIT_CARD);
  const [addMerchant, { data: addMerchantData, loading: addMerchantLoading, error: addMerchantError }] = useMutation<AddMerchant, AddMerchantVariables>(
    ADD_MERCHANT
  );
  const [addMerchantCategoryCode, { data: addMerchantCategoryData, loading: addMerchantCategoryLoading, error: addMerchantCategoryError }] = useMutation<
    AddMerchantCategoryCode,
    AddMerchantCategoryCodeVariables
  >(ADD_MERCHANT_CATEGORY_CODE);
  const [addBenefit, { data: addBenefitData, loading: addBenefitLoading, error: addBenefitError }] = useMutation<AddBenefit, AddBenefitVariables>(ADD_BENEFIT);
  const [addCreditCardBenefit, { data: addCreditCardBenefitData, loading: addCreditCardBenefitLoading, error: addCreditCardBenefitError }] = useMutation<
    AddCreditCardBenefit,
    AddCreditCardBenefitVariables
  >(ADD_CREDIT_CARD_BENEFIT);

  const [onSuccessfulApiResponse, setOnSuccessfulApiResponse] = useState<boolean>(false);
  const [creditCardName, setCreditCardName] = useState<string>('');
  const [merchantName, setMerchantName] = useState<string>('');
  const [merchantCategoryCode, setMerchantCategoryCode] = useState<string>('');
  const [creditCardSelection, setCreditCardSelection] = useState<string>('');
  const [benefitSelection, setBenefitSelection] = useState<string>('');
  const [merchantCategory, setMerchantCategory] = useState<string>('');
  const [newMerchantCategoryCode, setNewMerchantCategoryCode] = useState<number | undefined>();
  const [state, dispatch] = useReducer(reducer, initialBenefitState);

  useEffect(() => {
    if (addCreditCardData || addMerchantData || addCreditCardBenefitData || addBenefitData) {
      setCreditCardName('');
      setMerchantName('');
      setMerchantCategoryCode('');
      setCreditCardSelection('');
      setBenefitSelection('');
      setMerchantCategory('');
      setNewMerchantCategoryCode(undefined);
      refetch();
      setOnSuccessfulApiResponse(true);
      dispatch({
        type: BenefitAction.RESET,
      });
    }
  }, [addCreditCardData, addMerchantData, addCreditCardBenefitData, addBenefitData, addMerchantCategoryData]);

  useEffect(() => {
    if (onSuccessfulApiResponse) {
      setTimeout(() => {
        setOnSuccessfulApiResponse(false);
      }, 3000);
    }
  }, [onSuccessfulApiResponse]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      addCreditCard({
        variables: {
          creditCardName,
        },
      });
    },
    [creditCardName]
  );

  const onMerchantSubmit = useCallback(
    (event) => {
      event.preventDefault();
      addMerchant({
        variables: {
          merchantName,
          merchantCategoryCode: +merchantCategoryCode,
        },
      });
    },
    [merchantName, merchantCategoryCode]
  );

  const onMerchantCategoryCodeSubmit = useCallback(
    (event) => {
      event.preventDefault();
      addMerchantCategoryCode({
        variables: {
          merchantCategoryCode: +newMerchantCategoryCode,
          merchantCategory: merchantCategory,
        },
      });
    },
    [newMerchantCategoryCode, merchantCategory]
  );

  const onBenefitSubmit = useCallback(
    (event) => {
      event.preventDefault();

      addBenefit({
        variables: {
          benefitCashback: +state.benefitCashback,
          benefitName: state.benefitName,
          merchantCodeId: +state.merchantCodeId,
        },
      });
    },
    [state]
  );

  const onCreditCardBenefitSubmit = useCallback(
    (event) => {
      event.preventDefault();

      addCreditCardBenefit({
        variables: {
          creditCardId: +creditCardSelection,
          benefitId: +benefitSelection,
        },
      });
    },
    [creditCardSelection, benefitSelection]
  );

  const onSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputType = event.target.getAttribute('data-input');
    const val = event.target.value;

    if (inputType === SelectType.MERCHANT_CATEGORY_CODE) {
      setMerchantCategoryCode(val);
    } else if (inputType === SelectType.CREDIT_CARD) {
      setCreditCardSelection(val);
    } else if (inputType === SelectType.BENEFIT) {
      setBenefitSelection(val);
    } else if (inputType === SelectType.MERCHANT_ID) {
      dispatch({
        type: BenefitAction.UPDATE_BENEFIT_MERCHANT,
        data: val,
      });
    }
  }, []);

  const onChange = useCallback((input: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = input.target.getAttribute('data-input');
    const val = input.target.value;

    if (inputType === InputType.MERCHANT) {
      setMerchantName(val);
    } else if (inputType === InputType.CREDIT_CARD) {
      setCreditCardName(input.target.value);
    } else if (inputType === InputType.BENEFIT_NAME) {
      dispatch({
        type: BenefitAction.UPDATE_BENEFIT_NAME,
        data: val,
      });
    } else if (inputType === InputType.BENEFIT_CASHBACK) {
      dispatch({
        type: BenefitAction.UPDATE_BENEFIT_CASHBACK,
        data: val,
      });
    } else if (inputType === InputType.MERCHANT_CATEGORY) {
      setMerchantCategory(val);
    } else if (inputType === InputType.MERCHANT_CATEGORY_CODE) {
      setNewMerchantCategoryCode(+val);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Credit Card Comparator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '16px' }}>
        <h2>Credit Cards</h2>
        <ul>
          {data.creditCards.map((card) => {
            const benefits = data.creditCardBenefits.reduce((acc, creditCardBenefit) => {
              if (creditCardBenefit.creditCardId === card.id) {
                const currentBenefit = data.benefits.find((benefit) => benefit.id === creditCardBenefit.benefitId);

                return [
                  ...acc,
                  {
                    name: currentBenefit.name,
                  },
                ];
              }
              return acc;
            }, []);
            return (
              <li key={card.id}>
                <div>
                  <p>
                    {card.creditCardName} <sup>{card.id}</sup>
                  </p>
                  {Array.isArray(benefits) && benefits.length ? (
                    <ul>
                      {benefits.map((benefit) => {
                        return <li key={benefit.name}>{benefit.name}</li>;
                      })}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
        <Form
          isLoading={!!loading || !!addCreditCardLoading}
          onSubmit={onSubmit}
          formName="Add Credit Card"
          error={addCreditCardError ? 'Unable to add credit card, please try again later.' : undefined}
        >
          <label>Name: </label>
          <input
            type="text"
            data-input={InputType.CREDIT_CARD}
            value={creditCardName}
            onChange={onChange}
            disabled={!!loading || !!addCreditCardLoading}
            placeholder="Citi Double Cash"
          />
        </Form>

        <Form
          isLoading={!!loading || !!addMerchantCategoryLoading}
          onSubmit={onMerchantCategoryCodeSubmit}
          formName="Add Merchant Category Code"
          error={addMerchantCategoryError ? 'Unable to add merchant category code, please try again later.' : undefined}
        >
          <label>Category Code: </label>
          <input
            type="number"
            data-input={InputType.MERCHANT_CATEGORY_CODE}
            value={newMerchantCategoryCode}
            onChange={onChange}
            disabled={!!loading || !!addMerchantCategoryLoading}
            placeholder="8849"
          />
          <br />

          <label>Merchant Category Name: </label>
          <input
            type="text"
            data-input={InputType.MERCHANT_CATEGORY}
            value={merchantCategory}
            onChange={onChange}
            disabled={!!loading || !!addMerchantCategoryLoading}
            placeholder="Restaurants"
          />
        </Form>

        <h2>Merchants</h2>
        <ul>
          {data.merchants.map((merchant) => {
            const merchantCategoryCodeData = data.merchantCategoryCodes.find((code) => code.id === merchant.merchantCodeId);
            return (
              <li key={merchant.id}>
                <p>
                  {merchant.merchantName} ({merchantCategoryCodeData.merchantCategory} - {merchantCategoryCodeData.merchantCategoryCode})
                  <sup>{merchant.id}</sup>
                </p>
              </li>
            );
          })}
        </ul>

        <Form
          isLoading={!!loading || !!addMerchantLoading}
          onSubmit={onMerchantSubmit}
          formName="Add Merchant"
          error={addMerchantError ? 'Unable to add merchant, please try again later.' : undefined}
        >
          <input
            type="text"
            data-input={InputType.MERCHANT}
            value={merchantName}
            onChange={onChange}
            disabled={!!loading || !!addMerchantLoading}
            placeholder="Starbucks"
          />
          <br />
          <SelectComponent
            label="Merchant Category Code"
            value={merchantCategoryCode}
            formId={'merchantsCategoryCodes'}
            identifier={SelectType.MERCHANT_CATEGORY_CODE}
            onChange={onSelectChange}
          >
            <>
              {data.merchantCategoryCodes.map((merchantCategoryCode) => {
                return (
                  <option key={merchantCategoryCode.id} value={merchantCategoryCode.id}>
                    {merchantCategoryCode.merchantCategory} ({merchantCategoryCode.merchantCategoryCode})
                  </option>
                );
              })}
            </>
          </SelectComponent>
        </Form>
        <hr />
        <h2>Add Benefit</h2>
        <form onSubmit={onBenefitSubmit}>
          <label>Benefit Name: </label>{' '}
          <input
            type="text"
            data-input={InputType.BENEFIT_NAME}
            value={state.benefitName}
            onChange={onChange}
            disabled={!!loading || !!addBenefitLoading}
            placeholder="5% restaurant cashback"
          />
          <br />
          <label>Benefit Cashback Percentage: </label>{' '}
          <input
            type="number"
            data-input={InputType.BENEFIT_CASHBACK}
            value={state.benefitCashback}
            onChange={onChange}
            disabled={!!loading || !!addBenefitLoading}
            placeholder="0.05"
          />
          <SelectComponent label="Merchant" value={state.merchantCodeId} formId={'merchantId'} identifier={SelectType.MERCHANT_ID} onChange={onSelectChange}>
            <>
              {data.merchantCategoryCodes.map((merchantCategoryCode) => {
                return (
                  <option key={merchantCategoryCode.id} value={merchantCategoryCode.id}>
                    {merchantCategoryCode.merchantCategory}
                  </option>
                );
              })}
            </>
          </SelectComponent>
          <input type="submit" value="Submit" disabled={!!loading || !!addBenefitError} />
          {addBenefitError && <p>Unable to add benefit, please try again later.</p>}
        </form>

        <hr />
        <h2>Add Benefit Association</h2>
        <form onSubmit={onCreditCardBenefitSubmit}>
          <SelectComponent label="Benefit Name" value={benefitSelection} formId={'benefits'} identifier={SelectType.BENEFIT} onChange={onSelectChange}>
            <>
              {data.benefits.map((benefit) => {
                return (
                  <option key={benefit.id} value={benefit.id}>
                    {benefit.name}
                  </option>
                );
              })}
            </>
          </SelectComponent>

          <SelectComponent label="Credit Card" value={creditCardSelection} formId={'creditCard'} identifier={SelectType.CREDIT_CARD} onChange={onSelectChange}>
            <>
              {data.creditCards.map((creditCard) => {
                return (
                  <option key={creditCard.id} value={creditCard.id}>
                    {creditCard.creditCardName}
                  </option>
                );
              })}
            </>
          </SelectComponent>
          <input type="submit" value="Submit" disabled={!!loading || !!addCreditCardBenefitLoading} />
          {addCreditCardBenefitError && <p>Unable to add credit card benefit, please try again later.</p>}
        </form>

        {onSuccessfulApiResponse && (
          <div style={{ color: 'green', fontSize: '30px', textAlign: 'center', margin: '16px' }}>
            <p>Successfully updated!</p>
          </div>
        )}
      </main>
    </div>
  );
}
