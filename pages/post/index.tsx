import React, {useEffect, useState} from "react";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";
import {getPostData, getSortedPostsData} from "../../lib/contents";
import Link from "next/link";
import {isNil} from "lodash";
import {formatDate} from "../../utils/DateTime";
// import {getPostData} from '../lib/posts'


// @ts-ignore
export default function PostIndex({allPostsData, intro}) {
    const [postsElm, setPostsElm] = useState<JSX.Element[]>([])
    const [introElm, setIntroElm] = useState<JSX.Element>()

    //TODO: change this to useMemo
    useEffect(() => {

        if (!isNil(intro)) {
            setIntroElm(
                <div
                    className="md:p-8 md:pt-2 md:container md:mx-auto"
                >
                    <div dangerouslySetInnerHTML={{__html: intro.contentHtml}}></div>
                </div>
            )
        }
    }, [
        intro
    ])

    useEffect(() => {
        let _postsElm: JSX.Element[] = []
        allPostsData.forEach((post: any) => {
            console.log(post)
            _postsElm.push(
                <Link key={`/post/${post.id}`} href={`/post/${post.id}`}>

                <div key={post.id}
                    className="text-justify mb-6"
                    data-aos="fade-up"
                    data-aos-easing="fade-down"
                    data-aos-duration="900"
                >
                        <div
                            className="md:grid md:grid-rows-3 md:grid-cols-4 md:gap-2 mb-12"
                        >
                            <>
                                <div className="md:row-span-3">
                                    { formatDate(post.createdAt) }
                                </div>
                                <div className="md:col-span-3">{post.title ?? ""}</div>
                                <div className="md:row-span-2 md:col-span-3">
                                    { post.description }
                                </div>
                            </>
                        </div>


                </div>
                </Link>

            )
        })
        if (_postsElm.length > 0) {
            setPostsElm(_postsElm)
        } else {

            setPostsElm([(<div key={'no-post'}>nothing here, yet! : (</div>)])
        }
    }, [allPostsData])

    return (

        <Blank>
            <MainLayout key={'post-page-layout'}>

                <div
                    className="p-3 md:container md:mx-auto"
                    data-aos="fade-up"
                    data-aos-easing="fade-down"
                >
                    <div className="mb-16">


                        <img
                            src="/img/articles/upgraded-my-first-custom-keyboard/cable_keycap/IMG_0894.jpg"
                            className="object-cover rounded-lg"
                        />
                        <h1
                            className="md:p-8 md:pb-2 text-4xl font-bold md:text-6xl subpixel-antialiased"
                        >
                            Stories<span className="blink_me">_</span>
                        </h1>
                        {introElm}

                    </div>

                    <div className="md:p-8">
                        {postsElm}
                    </div>
                    {/*// <!-- <div className="md:container md:mx-auto">*/}
                    {/*//     <div className="grid grid-cols-2 gap-2">*/}
                    {/*//         <div className="grid grid-cols-2">*/}
                    {/*//             <light-switcher /><language-switcher />*/}
                    {/*//         </div>*/}
                    {/*//         <div><social /></div>*/}
                    {/*//     </div>*/}
                    {/*// </div> -->*/}

                </div>
            </MainLayout>
        </Blank>
    )
}

export async function getStaticProps() {
    let storiesIntro = await getPostData('storiesIntro', '/content/en/text/')

    const allPostsData = await getSortedPostsData('/content/en/articles')
    return Promise.all([allPostsData, storiesIntro]).then((PostsData) => {
        console.log(PostsData[1])
        return {
            props: {
                intro: PostsData[1],
                allPostsData: PostsData[0]
            }
        }
    }).catch(err => console.log(err))
}
