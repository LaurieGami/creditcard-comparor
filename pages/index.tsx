import Head from 'next/head';

import CreditCardSelector from '../components/CreditCardSelector';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Credit Card Comparator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreditCardSelector />
    </div>
  );
}
