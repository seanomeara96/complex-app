export const signIn = (payload) => {
    // Payload should be a user id
    return {
        type: "SIGN_IN"
    }
};
export const signOut = () => {
    return {
        type: "SIGN_OUT"
    }
}
// This may need to be renamed in the future
export const posts = (payload) => {
    // Payload should be an array of posts
    return {
        type: "POSTS",
        payload
    }
}
export const flashErrors = (payload) => {
    // Payload should be an array if errors
    return {
        type: "PUSH_ERRORS",
        payload
    }
}
export const flashSuccesses = (payload) => {
    // Payload should be an array of successes
    return {
        type: "PUSH_SUCCESSES",
        payload
    }
}
export const openChatBox = () => {
    return {
        type:"OPEN_BOX"
    }
}
export const closeChatBox = () => {
    return {
        type:"CLOSE_BOX"
    }
}