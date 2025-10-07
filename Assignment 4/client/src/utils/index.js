export const HOST = import.meta.env.VITE_SERVER_URL;

const USER_ROUTE = `${HOST}/api/users`;
export const REGISTER_ROUTE = `${USER_ROUTE}/register`;
export const LOGIN_ROUTE = `${USER_ROUTE}/login`;
export const GET_USER_DATA_ROUTE = `${USER_ROUTE}/get-user-data`;
export const LOGOUT_ROUTE = `${USER_ROUTE}/logout`;
export const GET_ALL_USERS_ROUTE = `${USER_ROUTE}/`;

const POSTS_ROUTE = `${HOST}/api/posts`;
export const ADD_POST_ROUTE = `${POSTS_ROUTE}/`;
export const GET_ALL_POSTS_ROUTE = `${POSTS_ROUTE}/`;
export const ADD_COMMENT_ROUTE = `${POSTS_ROUTE}/comment`;