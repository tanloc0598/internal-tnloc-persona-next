import type {NextPageWithLayout} from './_app'
import React from "react";

import type {ReactElement} from 'react'
import Blank from '../components/layouts/blank'
import MainLayout from '../components/layouts/mainLayout'
import Title from "../components/commons/about/title";
import List from "../components/commons/list";

const Index: NextPageWithLayout = () => {
    return <div className={'tilt'}>
        <div className="md:container md:mx-auto"
        >
            <Title/>

        </div>
        <div className="md:container md:mx-auto"
        >
            <p>
                hello world
            </p>
        </div>
        <div
            className="m-5 md:m-4"
            data-aos="fade-up"
            data-aos-easing="fade-down"
            data-aos-anchor-placement="center-bottom"
        >
            <List content ={{}}/>
        </div>

    </div>
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <Blank>
            <MainLayout>{page}</MainLayout>
        </Blank>
    )
}

export default Index
