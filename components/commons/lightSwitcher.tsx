import {useSyncExternalStore} from "react";
import {useTheme} from "next-themes";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function LightSwitcher() {
    const {resolvedTheme, setTheme} = useTheme();
    // theme is only known on the client; render a placeholder until mounted to avoid hydration mismatch
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

    const isDark = resolvedTheme === 'dark'

    return (
        <div className="m-5">
            {mounted &&
                <button type="button"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}>
                    <FontAwesomeIcon icon={isDark ? faMoon : faSun} size="lg" color={isDark ? 'yellow' : 'grey'}/>
                </button>}
        </div>
    )
}
