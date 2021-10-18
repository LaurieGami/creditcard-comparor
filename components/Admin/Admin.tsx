import Head from 'next/head';
import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AddCreditCard, AddCreditCardVariables } from './__generated__/AddCreditCard';
import { AllDataQuery } from './__generated__/AllDataQuery';
import { ADD_CREDIT_CARD, GET_ALL_DATA } from './AdminQueries';

export default function Admin() {
  const { data, loading, error, refetch } = useQuery<AllDataQuery>(GET_ALL_DATA);
  const [addCreditCard, { data: addCreditCardData, loading: addCreditCardLoading, error: addCreditCardError }] = useMutation<
    AddCreditCard,
    AddCreditCardVariables
  >(ADD_CREDIT_CARD);

  const [creditCardName, setCreditCardName] = useState<string>('');

  useEffect(() => {
    if (addCreditCardData) {
      setCreditCardName('');
      refetch();
    }
  }, [addCreditCardData]);

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

  const onChange = useCallback((input: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCardName(input.target.value);
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
            Name: <input type="text" value={creditCardName} onChange={onChange} disabled={!!loading || !!addCreditCardLoading} />
          </label>{' '}
          <input type="submit" value="Submit" disabled={!!loading || !!addCreditCardLoading} />
          {addCreditCardError && <p>Unable to add credit card, please try again later.</p>}
        </form>
      </div>
    </div>
  );
}
