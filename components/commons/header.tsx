import Link from "next/link";
import Image from "next/image";
import {isEmpty, isNil} from "lodash";

export default function Header() {
    return (
        <header className="p-3 md:container md:mx-auto">
            <nav className="space-x-5 flex justify-center md:justify-end">
                { !isNil(process.env.CV_LINK) && !isEmpty(process.env.CV_LINK) &&
                    <div className="justify-items-center text-center">
                        <a href={process.env.CV_LINK} target={'_blank'} rel="noreferrer"> CV </a>
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
                    <Link href="/">
                        About
                    </Link>
                </div>
                {/* <!-- <div className="justify-items-center text-center">
                <nuxt-link to="/contacts"> Contact </nuxt-link>
            </div> --> */}
                <div className="justify-items-center text-center">
                    <Image
                        className="block mx-auto h-6 w-6 md:h-8 md:w-8 rounded-full sm:mx-0"
                        src="https://s.gravatar.com/avatar/052b8e5a539ee4a6e4e7bbe6b1605458?s=80"
                        alt="Tnloc avatar"
                        width={80}
                        height={80}
                    />
                </div>
            </nav>
        </header>
    )
}
