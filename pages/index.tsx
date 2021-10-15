import Head from "next/head";
import { useQuery } from "@apollo/client";
import query from "./CreditCardsQuery.graphql";

export default function Home() {
  const { data, loading, error } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Credit Card Comparator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <ul>
          {data.creditCards.map((card) => (
            <li key={card.id}>
              <div>
                <p>{card.creditCardName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
