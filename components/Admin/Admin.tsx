import Head from 'next/head';
import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AddCreditCard, AddCreditCardVariables } from './__generated__/AddCreditCard';
import { AddMerchant, AddMerchantVariables } from './__generated__/AddMerchant';
import { AllDataQuery } from './__generated__/AllDataQuery';
import { ADD_CREDIT_CARD, ADD_MERCHANT, GET_ALL_DATA } from './AdminQueries';

enum InputType {
  MERCHANT = 'MERCHANT',
  CREDIT_CARD = 'CREDIT_CARD',
}

export default function Admin() {
  const { data, loading, error, refetch } = useQuery<AllDataQuery>(GET_ALL_DATA);
  const [addCreditCard, { data: addCreditCardData, loading: addCreditCardLoading, error: addCreditCardError }] = useMutation<
    AddCreditCard,
    AddCreditCardVariables
  >(ADD_CREDIT_CARD);
  const [addMerchant, { data: addMerchantData, loading: addMerchantLoading, error: addMerchantError }] = useMutation<AddMerchant, AddMerchantVariables>(
    ADD_MERCHANT
  );

  const [creditCardName, setCreditCardName] = useState<string>('');
  const [merchantName, setMerchantName] = useState<string>('');
  const [merchantCategoryCode, setMerchantCategoryCode] = useState<string>('');

  useEffect(() => {
    if (addCreditCardData || addMerchantData) {
      setCreditCardName('');
      setMerchantName('');
      setMerchantCategoryCode('');
      refetch();
    }
  }, [addCreditCardData, addMerchantData]);

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

  const onMerchantCategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setMerchantCategoryCode(event.target.value);
  }, []);

  const onChange = useCallback((input: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = input.target.getAttribute('data-input');

    if (inputType === InputType.MERCHANT) {
      setMerchantName(input.target.value);
    } else if (inputType === InputType.CREDIT_CARD) {
      setCreditCardName(input.target.value);
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

      <div>
        <h2>Credit Cards</h2>
        <ul>
          {data.creditCards.map((card) => (
            <li key={card.id}>
              <div>
                <p>{card.creditCardName}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3>Add Credit Card</h3>
        <form onSubmit={onSubmit}>
          <label>
            Name:{' '}
            <input type="text" data-input={InputType.CREDIT_CARD} value={creditCardName} onChange={onChange} disabled={!!loading || !!addCreditCardLoading} />
          </label>{' '}
          <input type="submit" value="Submit" disabled={!!loading || !!addCreditCardLoading} />
          {addCreditCardError && <p>Unable to add credit card, please try again later.</p>}
        </form>
        <hr />
        <h2>Merchants</h2>
        <ul>
          {data.merchants.map((merchant) => (
            <li key={merchant.id}>
              <p>{merchant.merchantName}</p>
            </li>
          ))}
        </ul>
        <h2>Add Merchant</h2>
        <form onSubmit={onMerchantSubmit}>
          <label>
            Merchant Name:{' '}
            <input type="text" data-input={InputType.MERCHANT} value={merchantName} onChange={onChange} disabled={!!loading || !!addMerchantLoading} />
          </label>{' '}
          <br />
          <label htmlFor="merchantsCategoryCodes">Merchant Category Code</label>{' '}
          <select value={merchantCategoryCode} id="merchantsCategoryCodes" onChange={onMerchantCategoryChange}>
            <option>-</option>
            {data.merchantCategoryCodes.map((merchantCategoryCode) => {
              return (
                <option key={merchantCategoryCode.id} value={merchantCategoryCode.id}>
                  {merchantCategoryCode.merchantCategory}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Submit" disabled={!!loading || !!addMerchantLoading} />
          {addMerchantError && <p>Unable to add merchant, please try again later.</p>}
        </form>
      </div>
    </div>
  );
}
