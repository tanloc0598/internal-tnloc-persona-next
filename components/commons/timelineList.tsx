import {Obj} from "../../utils/type/Obj";
import {useEffect, useState} from "react";

type props = {
    content?: any,
    contents?: Obj,
    title?: string
    listTitle?: string
}
const TimelineList: (props: props) => JSX.Element = (props: props) => {
    const {listTitle, title, content, contents} = {...props};

    const [contentElm, setContentElm] = useState<JSX.Element[]>([])
    const [listItems, setListItems ] = useState<JSX.Element[]>([])
    useEffect(() => {
        let _contents: JSX.Element[] = []
        // // multi itmes listing view
        if (contents) {
            contents.forEach((post: Obj) => {
                try {

                    _contents.push(
                        <div
                            key={`${post.id}`}
                            className="grid grid-cols-4 gap-4 mb-8"
                            data-aos="fade-up"
                            data-aos-easing="fade-down"
                        >
                            <div>
                            <span>
                                {post.date}
                            </span>
                            </div>
                            <div className="col-span-3">
                                <div className="grid gap-1">
                                    <div className="col-span-2">
                                        <div className="col-span-2">
                                        <span className="text-sm" >
                                            {/*{{item.title}}*/}
                                            {post.title}
                                        </span>
                                        </div>
                                        <div dangerouslySetInnerHTML={{
                                            __html: post.contentHtml
                                        }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } catch (e) {
                    console.log(e)
                }
            })
        }
        setListItems(_contents)

    }, [contents])

    return (
        <>
            <div className="md:p-8 md:container md:mx-auto">
                <div className="mb-8">
                    {
                        listTitle && (
                            <div>
                                <span className="tracking-wider text-sm text-main-color">{listTitle}.</span>
                                <br/>
                            </div>
                        )
                    }
                    <h1 className="tracking-wider text-2xl">
                        <span className="">
                          {title}
                        </span>
                    </h1>
                </div>
                <div>
                    { listItems }
                </div>
            </div>
        </>
    )
}

export default TimelineList
