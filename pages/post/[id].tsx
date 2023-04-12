import React, {useEffect} from "react";
import {formatDate} from "../../utils/DateTime";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";
import path from "path";
import fs from "fs";
import {getPostData} from "../../lib/contents";

// import {getPostData} from '../lib/posts'


// @ts-ignore
export default function Post({postData}) {

    useEffect(() => {
        console.log(postData);
    }, postData)
    console.log(postData)


    return (
        <Blank>
            <MainLayout>

                <div className=" container px-5 mx-auto lg:px-16">
                    <div className="flex flex-col w-full mb-2 text-left">
                        <h1
                            className="mb-2 text-3xl font-black tracking-tighter light:text-black dark:text-white lg:text-7xl md:text-4xl"
                        >
                            {postData.title}
                        </h1>
                        <p
                            className="mt-4 text-lg leading-snug tracking-tight light:text-gray-500 dark:text-gray-100"
                        >
                            {postData.description}
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:space-x-12">
                        <div
                            className="w-full mt-12 text-lg leading-snug tracking-tight light:text-gray-800 dark:text-gray-100 lg:px-0 lg:w-3/4 text-base text-justify break-words">
                            <img src={postData.img} alt={postData.alt}/>
                            <div className="text-base text-justify break-words">
                            </div>
                            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>

                        </div>
                        <div
                            className="w-full max-w-screen-sm m-auto mt-12 lg:w-1/4"
                        >
                            {/*<CardVisit/>*/}
                            <p
                                className="mt-4 text-sm leading-snug tracking-tight text-gray-500"
                            >
                                Article last updated: {formatDate(postData.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>

            </MainLayout>
        </Blank>
    )
}
export async function getStaticPaths() {
    const _postsDirectory = '/content/en/articles'
    const postsDirectory = path.join(process.cwd(), _postsDirectory)
    const fileNames = fs.readdirSync(postsDirectory)

    console.log(_postsDirectory, postsDirectory, fileNames)
    const paths: any = []
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

    export async function getStaticProps(context: any) {
        const postsDirectory = '/content/en/articles/'
        const post_id = await context.params.id
        const postData = await getPostData(post_id, postsDirectory)
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
