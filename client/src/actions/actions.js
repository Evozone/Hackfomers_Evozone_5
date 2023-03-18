import { SIGN_IN, SIGN_OUT, START_LOADING, STOP_LOADING } from './types';

export const signInAction = (
    _id,
    uid,
    email,
    name,
    avatarURL,
    username,
    grievances,
    comments,
    organizations,
    socialLinks,
    token
) => {
    return {
        type: SIGN_IN,
        payload: {
            _id,
            uid,
            email,
            name,
            avatarURL,
            username,
            grievances,
            comments,
            organizations,
            socialLinks,
            token,
        },
    };
};

export const signOutAction = () => {
    return {
        type: SIGN_OUT,
    };
};

export const startLoadingAction = () => {
    return {
        type: START_LOADING,
    };
};

export const stopLoadingAction = () => {
    return {
        type: STOP_LOADING,
    };
};
