import { ReactElement } from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import Footer from "../commons/footer";
import Header from "../commons/header";

type LayoutProps = {
  children: ReactElement
  title?: string
  description?: string
  image?: string
}

const MainLayout = ({children, title, description, image}: LayoutProps) => {
    const {asPath} = useRouter()
    const site = (process.env.SITE ?? '').trim().replace(/\/$/, '')
    const fullTitle = `${title ?? 'Tnloc'}${process.env.SITE_TITLE ?? ''}`
    // absolute URLs only when SITE is configured; relative og:url/og:image are ignored by crawlers
    const url = site ? `${site}${process.env.BASE_PATH ?? ''}${asPath === '/' ? '' : asPath}` : undefined
    const imageUrl = site && image ? `${site}${process.env.BASE_PATH ?? ''}${image}` : undefined

    return (
      <>
        <Head>
          <title>{fullTitle}</title>
          <meta property="og:title" content={fullTitle}/>
          <meta property="og:type" content="website"/>
          {description && <meta name="description" content={description}/>}
          {description && <meta property="og:description" content={description}/>}
          {url && <link rel="canonical" href={url}/>}
          {url && <meta property="og:url" content={url}/>}
          {imageUrl && <meta property="og:image" content={imageUrl}/>}
        </Head>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
}

export default MainLayout
