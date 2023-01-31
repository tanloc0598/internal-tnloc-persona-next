import React, {useEffect, useState} from "react";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";
import {getSortedPostsData} from "../../lib/contents";
import Link from "next/link";

// import {getPostData} from '../lib/posts'


// @ts-ignore
export default function PostIndex({postsData}) {

    const [postsElm, setPostsElm] = useState<JSX.Element[]>([])

    useEffect(() => {
        let _postsElm: JSX.Element[] = []
        postsData.map((post: any) => {
            _postsElm.push(
                <Link href={`/post/${post.id}`} >
                    {post.title ?? ""}
                </Link>)
        })
        setPostsElm(_postsElm)
    }, [postsData])

    return (

        <Blank>
            <MainLayout>
                <div className={'tilt'}>
                    {postsElm}
                </div>
            </MainLayout>
        </Blank>
    )
}

export async function getStaticProps() {
    // const allPostsData = getSortedPostsData()

    const postsData = getSortedPostsData()
    return {
        props: {
            postsData
        }
    }
}

// export default Index
