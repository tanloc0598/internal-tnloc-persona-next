type props = {
    content?: string,
    title?: string
    listTitle?: string
}
const List = ({listTitle, title, content}: props) => {
    return (
        <section className="md:p-8 md:container md:mx-auto">
            {title &&
                <div className="mb-8">
                    {listTitle &&
                        <div>
                            <span className="tracking-wider text-sm text-main-color">
                                {listTitle}.
                            </span>
                            <br/>
                        </div>
                    }
                    <h2 className="tracking-wider text-2xl">
                        {title}
                    </h2>
                </div>
            }
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="col-span-3 text-sm" dangerouslySetInnerHTML={{__html: content ?? ''}}/>
            </div>
        </section>
    )
}

export default List
