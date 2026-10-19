import React from "react";
import {formatDate} from "../../utils/DateTime";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";
import {getAllPostIds, getPostData} from "../../lib/contents";
import Image from "next/image";
import {Obj} from "../../utils/type/Obj";

export default function Post({postData}: { postData: Obj }) {
    return (
        <Blank>
            <MainLayout title={postData.title} description={postData.description} image={postData.img}>

                <article className=" container px-5 mx-auto lg:px-16">
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
                            {postData.img &&
                                <Image src={postData.img} alt={postData.alt ?? ''} width={1200} height={800}
                                       className="w-full h-auto"/>}
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
                                Article last updated: <time dateTime={postData.updatedAt}>{formatDate(postData.updatedAt)}</time>
                            </p>
                        </div>
                    </div>
                </article>

            </MainLayout>
        </Blank>
    )
}
export async function getStaticPaths() {
    return {
        paths: getAllPostIds('/content/en/articles'),
        fallback: false,
    }
}

export async function getStaticProps(context: any) {
    const postData = await getPostData(context.params.id, '/content/en/articles/')
    return {props: {postData}}
}
