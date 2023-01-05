import type {NextPageWithLayout} from './_app'
import React from "react";

import type {ReactElement} from 'react'
import Blank from '../components/layouts/blank'
import MainLayout from '../components/layouts/mainLayout'
import Title from "../components/commons/about/title";
import List from "../components/commons/list";
import {getPostData} from '../lib/contents'
// import {getPostData} from '../lib/posts'


// @ts-ignore
export default function Index({ allPostsData, shortIntro }) {

    console.log(allPostsData,shortIntro)
    return (

        <Blank>
            <MainLayout>
                <div className={'tilt'}>
                    <div className="md:container md:mx-auto"
                    >
                        <Title/>
                    </div>
                    <div className="md:container md:mx-auto"
                    >
                        <List content={shortIntro.contentHtml} title={shortIntro.title}/>
                    </div>
                    <div
                        className="m-5 md:m-4"
                        data-aos="fade-up"
                        data-aos-easing="fade-down"
                        data-aos-anchor-placement="center-bottom"
                    >
                        {/*<List contents ={shortIntro}/>*/}
                    </div>

                </div>
            </MainLayout>
        </Blank>
    )
}

export async function getStaticProps() {
    // const allPostsData = getSortedPostsData()

    const shortIntro = await getPostData('/en/text/shortIntro')
    return {
        props: {
            shortIntro
        }
    }
}

// export default Index
