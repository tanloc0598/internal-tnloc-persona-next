import Link from "next/link";
import {isEmpty, isNil} from "lodash";

export default function Header() {
    return (
        <div className="p-3 md:container md:mx-auto">
            <div className="space-x-5 flex justify-center md:justify-end">
                { !isNil(process.env.CV_URL) && !isEmpty(process.env.CV_URL) &&
                    <div className="justify-items-center text-center">
                        <a href={process.env.CV_URL} target={'_blank'}> Blog </a>
                    </div>
                }
                { !isNil(process.env.BLOG_URL) && !isEmpty(process.env.BLOG_URL) &&
                    <div className="justify-items-center text-center">
                        <a href={process.env.BLOG_URL}> Blog </a>
                    </div>
                }
                {/* <div className="justify-items-center text-center">
                    <Link href={"/post"}>
                        Stories
                    </Link>
                </div> */}

                <div className="justify-items-center text-center">
                    <Link href={`${!isNil(process.env.BASE_PATH) && !isEmpty(process.env.BASE_PATH) ? process.env.BASE_PATH: '/'}`}>
                        About
                    </Link>
                </div>
                {/* <!-- <div className="justify-items-center text-center">
                <nuxt-link to="/contacts"> Contact </nuxt-link>
            </div> --> */}
                <div className="justify-items-center text-center">
                    <img
                        className="block mx-auto h-6 md:h-8 rounded-full sm:mx-0"
                        src="https://s.gravatar.com/avatar/052b8e5a539ee4a6e4e7bbe6b1605458?s=80"
                        alt="Loc's"
                    />
                </div>
            </div>
        </div>
    )
}
