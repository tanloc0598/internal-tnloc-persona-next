export default function Header() {
    return (
        <div className="p-3 md:container md:mx-auto">
            <div className="space-x-5 flex justify-center md:justify-end">
            <div className="justify-items-center text-center">
                <a href="https://blog.tnloc.work"> Blog </a>
            </div>
            <div className="justify-items-center text-center">
                {/* <nuxt-link to="/stories"> */}
                    Stories 
                    {/* </nuxt-link> */}
            </div>

            <div className="justify-items-center text-center">
                {/* <nuxt-link to="/">  */}
                About
                {/* </nuxt-link> */}
            </div>
            {/* <!-- <div className="justify-items-center text-center">
                <nuxt-link to="/contacts"> Contact </nuxt-link>
            </div> --> */}
            <div className="justify-items-center text-center">
                {/* <img
                className="block mx-auto h-6 md:h-8 rounded-full sm:mx-0"
                src="https://s.gravatar.com/avatar/052b8e5a539ee4a6e4e7bbe6b1605458?s=80"
                alt="Loc's"
                /> */}
            </div>
            </div>
        </div>
    )
}
