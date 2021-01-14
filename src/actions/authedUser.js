export const AT_SET_AUTHED_USER = "AT_SET_AUTHED_USER";

export function setAuthedUser(id) {
    return {
        type: AT_SET_AUTHED_USER,
        id,
    }
}