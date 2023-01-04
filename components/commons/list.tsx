import {Obj} from "../../utils/type/Obj";
import isNil from "lodash/isNil"

type props = {
    content: Obj,
    title?: string
}
const List : (props: props) => JSX.Element = (props: props) => {
    const {title} = {...props};
    return (
        <div className="md:p-8 md:container md:mx-auto">
            <div v-if="title" className="mb-8">
                {!isNil(title) && <div>
        <span className="tracking-wider text-sm text-main-color"
        >
            {title}
        </span
        >
                    <br/>
                </div>}
                <h1 className="tracking-wider text-2xl">
        <span className="">
          {/*{{title | capitalize}}*/}
        </span>
                </h1>
            </div>
            <div>
                <div
                    className="grid grid-cols-4 gap-4 mb-8"
                    data-aos="fade-up"
                    data-aos-easing="fade-down"
                >
                    <div className="col-span-3">
                        <div className="grid gap-1">
                            <div className="col-span-2">
                                <div v-if="contents">
                                    <div className="col-span-2 text-sm">
                                        {/*<nuxt-content*/}
                                        {/*    v-for="acontent in contents"*/}
                                        {/*:key="acontent.slug"*/}
                                        {/*:document="acontent"*/}
                                        {/*/>*/}
                                    </div>
                                </div>
                                <div v-if="content">
                                    <div className="col-span-2 text-sm"></div>
                                    {/*<nuxt-content*/}
                                    {/*:document="content" />*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
