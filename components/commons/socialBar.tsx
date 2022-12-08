import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const SocialBar = ()=>  {

    return (
        <>
            {/* <div
    className="flex justify-around m-5 md:grid-flow-row md:justify-end gap-4"
  > */}
  <div
    className="flex justify-around m-5 md:grid-flow-row md:justify-end gap-4"
  >

    <div>
      <a href="mailto:tnloc@outlook.com" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faEnvelope} size="lg" color="grey" />
      </a>
    </div>
    <div>
      <a href="/contact" rel="noreferrer">
        <FontAwesomeIcon
            icon={faAddressBook}
            size="lg"
            color="grey"
        />
      </a>
    </div>
    <div>
      <a href="https://github.com/tanloc0598" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="lg" color="grey"
      />
      </a>
    </div>
    <div>
      <a href="https://www.facebook.com/ngtnloc/" target="_blank" rel="noreferrer">
        {/* <FontAwesomeIcon icon="['fab', 'facebook']" size="lg" color="grey" /> */}3
      </a>
    </div>
    <div>
      <a href="https://www.instagram.com/tnloc/" target="_blank" rel="noreferrer">
        {/* <FontAwesomeIcon icon="['fab', 'instagram']" size="lg" color="grey"
      /> */}
      </a>
    </div>
    <div>
      <a
        href="https://www.linkedin.com/in/nguyen-tan-loc-46862a125/" rel="noreferrer"
        target="_blank"
      >
        {/* <FontAwesomeIcon icon="['fab', 'linkedin']" size="lg" color="grey"
      /> */}4
      </a>
    </div>
    {/* <div>
      <a href="/pgp/tnloc.txt" target="_blank">
        <FontAwesomeIcon icon="['fab', 'linkedin']" size="lg" color="grey"
      />5</a>
    </div> */}
  </div>
        </>
    )
}

export default SocialBar
