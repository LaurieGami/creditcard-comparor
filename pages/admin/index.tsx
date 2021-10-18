import Head from 'next/head';
import AdminComponent from 'components/Admin/Admin';

export default function Admin() {
  return (
    <div>
      <Head>
        <title>Credit Card Comparator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminComponent />
    </div>
  );
}
