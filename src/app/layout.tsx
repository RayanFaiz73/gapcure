import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
// import Link from 'next/link';
// import Logout from './logout';
import Provider from './Provider';
import AppBar from './AppBar';
import SessionProvider from './components/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { StateProvider } from './contexts/StateContext';
import reducer, { initialState } from './contexts/StateReducers';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gapcure',
  description: 'This app is for medication and diagnostics',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>
    <html className="h-full bg-white" lang="en" suppressHydrationWarning={true}>

        <StateProvider initialState={initialState} reducer={reducer} >
    <Head>
      <title>Test</title>
    </Head>
      <body className="min-h-full">

        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: '',
              style: {
                padding: '16px',
                borderRadius: '50px',
                background: '#333',
                color: '#fff',
              },
            }}
        />

        <Provider>
          {session?.user && <AppBar children={children} />}
          {!session?.user && children}
        </Provider>
        <div id="photo-picker-element"></div>
      </body>
        </StateProvider>
    </html>
  )
}
