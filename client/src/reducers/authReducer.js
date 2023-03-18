import { SIGN_IN, SIGN_OUT } from '../actions/types.js';

const INITIAL_STATE = {
    isSignedIn: false,
    mid: null,
    uid: null,
    email: null,
    name: null,
    avatarURL: null,
    username: null,
    grievances: null,
    comments: null,
    organizations: null,
    socialLinks: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            window.localStorage.setItem(
                'healthApp',
                JSON.stringify({ dnd: action.payload.token, isSignedIn: true })
            );
            return {
                ...state,
                isSignedIn: true,
                mid: action.payload._id,
                uid: action.payload.uid,
                email: action.payload.email,
                name: action.payload.name,
                avatarURL: action.payload.avatarURL,
                username: action.payload.username,
                grievances: action.payload.grievances,
                comments: action.payload.comments,
                organizations: action.payload.organizations,
                socialLinks: action.payload.socialLinks,
            };

        case SIGN_OUT:
            window.localStorage.removeItem('healthApp');
            return {
                ...state,
                isSignedIn: false,
                mid: null,
                uid: null,
                email: null,
                name: null,
                avatarURL: null,
                username: null,
                grievances: null,
                comments: null,
                organizations: null,
                socialLinks: null,
            };

        default:
            return state;
    }
};

export default authReducer;
