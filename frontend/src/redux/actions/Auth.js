export const SET_LOADING = "SET_LOADING";
export const POST_AUTH = "POST_AUTH";
export const POST_AUTH_FAILED = "POST_AUTH_FAILED";

export const postAuthLogin = (data) => ({
    type: POST_AUTH,
    payload: data
})

export const setLoading = () => ({
    type: SET_LOADING
})

