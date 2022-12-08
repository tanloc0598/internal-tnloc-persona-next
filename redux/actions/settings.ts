import Types from "../types"

const settings = () => {
    return {
        type: Types.SETTINGS
    }
}

const securityHash = (security_hash: string) => {
    return {
        type: Types.SECURITYHASH,
        payload: security_hash
    }
}


let actions = {
    settings,
    securityHash,
}
export default actions
