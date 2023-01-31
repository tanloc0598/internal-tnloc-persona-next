import React from "react";
import {getPostData} from "../../lib/contents";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";

// import {getPostData} from '../lib/posts'


// @ts-ignore
export default function Post({postData}) {


    console.log(postData)
    return ( <>
        <Blank>
            <MainLayout>
                <div className={'tilt'}>
                    <div
                        className="m-5 md:m-4"
                        data-aos="fade-up"
                        data-aos-easing="fade-down"
                        data-aos-anchor-placement="center-bottom"
                    >
                        {/* eslint-disable-next-line react/no-danger-with-children */}
                        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
                    </div>
                </div>


            </MainLayout>
        </Blank>
    </>)
}

export async function getStaticPaths() {
    return {
        paths: [{params: {id: 'readme'}}, {params: {id: 'hello'}}],
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context:any) {
    // const allPostsData = getSortedPostsData()
    const post_id = await context.params.id
    console.log(context.params.id)
    const postData = await getPostData(post_id)
    console.log(postData)
    return {
        props: {
            postData
        }
    }
}

// export default Index
