import {Obj} from "../../utils/type/Obj";

type props = {
    contents?: Obj[],
    title?: string
    listTitle?: string
}
const TimelineList: (props: props) => JSX.Element = ({listTitle, title, contents}: props) => {
    return (
        <section className="md:p-8 md:container md:mx-auto">
            <div className="mb-8">
                {
                    listTitle && (
                        <div>
                            <span className="tracking-wider text-sm text-main-color">{listTitle}.</span>
                            <br/>
                        </div>
                    )
                }
                <h2 className="tracking-wider text-2xl">
                    {title}
                </h2>
            </div>
            <div>
                {contents?.map((post) => (
                    <div key={post.id} className="grid grid-cols-4 gap-4 mb-8">
                        <div>
                            <span>{post.date}</span>
                        </div>
                        <div className="col-span-3">
                            {post.title && <h3 className="text-sm">{post.title}</h3>}
                            <div dangerouslySetInnerHTML={{__html: post.contentHtml}}/>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TimelineList
