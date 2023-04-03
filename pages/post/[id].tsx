import React, {useEffect} from "react";
import {getPostData} from "../../lib/contents";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";
import path from "path";
import fs from "fs";

// import {getPostData} from '../lib/posts'


// @ts-ignore
export default function Post({postData}) {

    useEffect(()=>{
        console.log(postData);
    },postData)
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
    const _postsDirectory = '/content/en/articles'
    const postsDirectory = path.join(process.cwd(), _postsDirectory)
    const fileNames = fs.readdirSync(postsDirectory)

    console.log(_postsDirectory, postsDirectory, fileNames)
    const paths:any = []
    fileNames.map((fileName) => {
        console.log(fileName)
        const id = fileName.replace(/\.md$/, '')
        paths.push({params: {id: id}})
    })

    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context:any) {
    const postsDirectory = '/content/en/articles/'
    const post_id = await context.params.id
    const postData = await getPostData(post_id,postsDirectory)
    console.log(postData)
    return await Promise.all([
        postData
    ]).then((data) => {
        return {
            props: {
                postData: data[0]
            }
        }
    }).catch(err => console.log(err))

}
