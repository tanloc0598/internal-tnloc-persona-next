import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LightSwitcher() {
    const dark = false // TODO: check light here
    return (<>
        <div className="m-5">
            {!dark ? <div>
                <FontAwesomeIcon icon={faMoon} size="lg" color="yellow" />
            </div> :
                <div>
                    <FontAwesomeIcon icon={faSun} size="lg" color="grey" />
                </div>}
        </div>
    </>)
}