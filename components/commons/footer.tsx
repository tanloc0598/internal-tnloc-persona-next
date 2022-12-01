export default function Footer() {
    return (<div className="mt-10">
    <div
      className="md:container md:mx-auto"
      data-aos="fade-up"
      data-aos-easing="fade-up"
    >
      <hr className="mt-24" />
      <div className="flex items-stretch p-3 md:p-8 mt-24 mb-16">
        <div className="self-center">
          <p
            className="text-4xl font-extrabold md:text-6xl subpixel-antialiased leading-none shadow-md"
          >
            <span>Let</span><span className="blink_me">'</span><span>s</span>
          </p>
          <p
            className="text-4xl font-extrabold md:text-6xl subpixel-antialiased leading-none shadow-md"
          >
            <span>keep</span>
          </p>
          <p
            className="text-4xl font-extrabold md:text-6xl subpixel-antialiased leading-none shadow-md"
          >
            <span className="">in touch</span><span className="blink_me">_</span>
          </p>
          <p className="subpixel-antialiased leading-none">
            {/* <Social /> */}
          </p>
        </div>
      </div>
      <hr className="mt-12 mb-12" />

      <div className="md:container md:mx-auto pl-3 md:pl-8">
        <div className="md:grid md:grid-cols-2 md:gap-2 grid-flow-row">
          <div className="grid grid-cols-2 md:grid-cols-12">
            {/* <div className="">
              <light-switcher />
            </div>
            <div className="md:col-span-3">
              <language-switcher />
            </div> */}
          </div>
          <div
            className="m-5 text-sm align-middle text-center md:text-right"
          >
            <span
              ><a href="https://github.com/tanloc0598/tnloc-persona">
                {/* {{$config.footer}} */} footer notes
              </a></span
            >
          </div>
        </div>
      </div>

      <hr className="mt-12 mb-12" />
    </div>
  </div>
    )
}
