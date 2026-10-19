import React from "react";
import Blank from "../../components/layouts/blank";
import MainLayout from "../../components/layouts/mainLayout";
import {getPostData, getSortedPostsData} from "../../lib/contents";
import Link from "next/link";
import Image from "next/image";
import {formatDate} from "../../utils/DateTime";
import {Obj} from "../../utils/type/Obj";

const heroImg = '/img/articles/upgraded-my-first-custom-keyboard/cable_keycap/IMG_0894.jpg'

export default function PostIndex({allPostsData, intro}: { allPostsData: Obj[], intro: Obj }) {
    return (
        <Blank>
            <MainLayout title="Stories" description="Stories and notes by Tnloc." image={heroImg}>
                <div className="p-3 md:container md:mx-auto">
                    <div className="mb-16">
                        <Image
                            src={`${process.env.BASE_PATH ?? ''}${heroImg}`}
                            alt="Custom keyboard with cable and keycaps"
                            className="object-cover rounded-lg w-full h-auto"
                            width={1200}
                            height={800}
                            priority
                        />
                        <h1 className="md:p-8 md:pb-2 text-4xl font-bold md:text-6xl subpixel-antialiased">
                            Stories<span className="blink_me">_</span>
                        </h1>
                        <div className="md:p-8 md:pt-2 md:container md:mx-auto"
                             dangerouslySetInnerHTML={{__html: intro.contentHtml}}/>
                    </div>

                    <div className="md:p-8">
                        {allPostsData.length === 0 && <div>nothing here, yet! : (</div>}
                        {allPostsData.map((post) => (
                            <article key={post.id} className="text-justify mb-6">
                                <Link href={`/post/${post.id}`}
                                      className="block md:grid md:grid-rows-3 md:grid-cols-4 md:gap-2 mb-12">
                                    <time dateTime={post.createdAt} className="md:row-span-3">
                                        {formatDate(post.createdAt)}
                                    </time>
                                    <h2 className="md:col-span-3">{post.title ?? ""}</h2>
                                    <p className="md:row-span-2 md:col-span-3">{post.description}</p>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </MainLayout>
        </Blank>
    )
}

export async function getStaticProps() {
    const [allPostsData, intro] = await Promise.all([
        getSortedPostsData('/content/en/articles'),
        getPostData('storiesIntro', '/content/en/text/'),
    ])
    return {props: {intro, allPostsData}}
}
