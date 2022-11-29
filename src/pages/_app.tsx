import 'antd/dist/antd.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import NextNProgress from 'nextjs-progressbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <NextNProgress color="#F2E21E" height={3} />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          newestOnTop
          theme="light"
          pauseOnHover={false}
        />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
