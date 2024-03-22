// export const HOST = "http://localhost:8888";
export const HOST = "https://gapcure-server.pearpixels.com";

// Auth Routes
export const AUTH_ROUTE = `${HOST}/api/auth`;

export const LOGIN_ROUTE = "auth/login";
export const REGISTER_ROUTE = "auth/register";
export const VALIDATE_REFRESH_TOKEN_ROUTE = "validateRefreshToken";

// User Routes
export const ALL_USERS = "users";
export const UPDATE_PERSONNAL_INFO = "user/info";
export const UPDATE_EMAIL_ADDRESS = "user/email";
export const UPDATE_PASSWORD = "user/pass";

// Chat Routes
export const ALL_ROOMS = "rooms";
export const MY_ROOMS = "rooms/me";
export const CREATE_ROOM = "rooms";
export const DELETE_ROOM  = (id: any) => `rooms/${id}`;
export const ROOM_MESSAGES = (id: any) => `messages/${id}`;
export const SEND_MESSAGE = "messages";

// Patient Routes
export const ALL_PATIENTS = "patients";
export const MY_PATIENTS = "patients/me";
export const CREATE_PATIENT = "patients";
export const GET_PATIENT  = (id: any) => `patients/${id}`;
export const UPDATE_PATIENT  = (id: any) => `patients/${id}`;
export const DELETE_PATIENT  = (id: any) => `patients/${id}`;