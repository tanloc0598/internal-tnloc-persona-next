import {useEffect, useState} from "react";
import {isNil} from "lodash";
import {Obj} from "../../../utils/type/Obj";

type props = {
    content?: any,
    contents?: Obj,
    title?: string
    listTitle?: string
}
const ListItem: (props: props) => JSX.Element = (props: props) => {
    const {listTitle, title, content, contents} = {...props};

    const [contentElm, setContentElm] = useState<JSX.Element[]>([])

    useEffect(() => {
        let _contents: JSX.Element[] = []
        // multi itmes listing view
        if (contents?.allPostsData) {
            contents.allPostsData.forEach((post: Obj) => _contents.push(
                <div dangerouslySetInnerHTML={post.content}></div>
            ))
        } else
            //single item listing view
            _contents.push(
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            )
        setContentElm(_contents)
    }, [contents, content])

    return (
        <div className="md:p-8 md:container md:mx-auto">
            {!isNil(title) &&
                <div className="mb-8">
                    {!isNil(listTitle) &&
                        <div>
                            <span className="tracking-wider text-sm text-main-color">
                                {listTitle}.
                            </span>
                            <br/>
                        </div>
                    }
                    <h1 className="tracking-wider text-2xl">
                        <span className="">
                            {title}
                        </span>
                    </h1>
                </div>
            }
            <div>
                <div
                    className="grid grid-cols-4 gap-4 mb-8"
                    data-aos="fade-up"
                    data-aos-easing="fade-down"
                >
                    <div className="col-span-3">
                        <div className="grid gap-1">
                            <div className="col-span-2">
                                <div>
                                    <div className="col-span-2 text-sm">
                                        {
                                            contentElm
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem
