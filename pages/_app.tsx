import '../styles/globals.scss'

import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import redux from '../redux'
import {Provider} from 'react-redux'
import Head from 'next/head'
import {PersistGate} from 'redux-persist/integration/react'
import LogRocket from 'logrocket';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    const logRocketAppId = process.env.LOGROCKET_APP_ID ?? ''
    LogRocket.init(logRocketAppId);
    return getLayout(
        <Provider store={redux.store}>

            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            </Head>
            <PersistGate loading={<></>}
                         persistor={redux.persistor}>
                <Component {...pageProps} />
            </PersistGate>

        </Provider>
    )
}
