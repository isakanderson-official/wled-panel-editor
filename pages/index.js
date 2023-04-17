import Head from 'next/head';
import { Inter } from 'next/font/google';
import Led from '@/components/Led';
import FontDesigner from '@/components/FontDesigner';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>WLED Matrix Editor</title>
        <meta name='description' content='Edit a WLED Matrix Panel Over Http' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='text-3xl font-bold'>
        <p>WLED TEXT DISPLAY</p>
        <Led />
        <br className='mt-5' />
        <FontDesigner />
      </main>
    </>
  );
}
