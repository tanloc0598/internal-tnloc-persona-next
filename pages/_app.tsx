import '../styles/globals.scss'

import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import LogRocket from 'logrocket';
import { ThemeProvider } from "next-themes";
import React, {useEffect} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    useEffect(() => {
        const logRocketAppId = process.env.LOGROCKET_APP_ID
        if (logRocketAppId) LogRocket.init(logRocketAppId)
    }, [])

    return getLayout(
        <>
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0"/>
            </Head>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
