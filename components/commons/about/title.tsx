type props = {
}
const Title : (props: props) => JSX.Element = (props: props) => {
    return (
            <div className="h-screen flex items-stretch p-3 md:p-8">
                <div className="self-center">
                    <h1
                        className="text-4xl font-extrabold md:text-6xl subpixel-antialiased leading-none "
                    >
                        About<span className="blink_me">_</span>
                    </h1>
                    <h1
                        className="text-4xl font-extrabold md:text-6xl subpixel-antialiased leading-none"
                    >
                        Params 1
                    </h1>

                    <h1
                        className="text-4xl font-extrabold md:text-6xl subpixel-antialiased leading-none"
                    >
                        Params 2
                    </h1>
                </div>
            </div>
    )
}
export default Title
