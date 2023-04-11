import {useTheme} from "next-themes";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function LightSwitcher() {
    const {systemTheme, theme, setTheme} = useTheme();

    const dark = false // TODO: check light here
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (<>
        <div className="m-5">
            {(theme == 'dark') ? <div>
                <FontAwesomeIcon icon={faMoon} size="lg" color="yellow"  onClick={() => {
                    setTheme('light')
                }}
                />
            </div> :
                <div>
                    <FontAwesomeIcon icon={faSun} size="lg" color="grey" onClick={() => {
                        setTheme('dark')
                    }} />
                </div>}
        </div>
    </>)
}
