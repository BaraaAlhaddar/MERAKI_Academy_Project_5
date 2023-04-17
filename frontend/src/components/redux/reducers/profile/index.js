import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        UserData: {},
        UserPosts:[],
        RandomNumber: false,
        following :[],
        allFollowing:[],
        allFollower:[],
    },
    reducers: {
        setUserData: (state, action) => {
            state.UserData = action.payload;
        }, 
        updateUserImage: (state, action) => {
            state.UserData.img = action.payload;
        },
        setRandomNumber: (state, action) => {
            state.RandomNumber = action.payload;
        },
        setUserPosts: (state, action) => {
            state.UserPosts = action.payload;
        },
        setFollowing: (state, action) => {
            state.following = action.payload;
        },
        setFollowing_plus1: (state, action) => {
            state.UserData.followers_count = state.UserData.followers_count*1+1;
        },setFollowing_minus1: (state, action) => {
            state.UserData.followers_count = state.UserData.followers_count*1-1;
        },
        setFollowingData: (state, action) => {
            state.allFollowing =action.payload;
        },setFollowerData: (state, action) => {
            state.allFollower= action.payload;
        },

    },
    
});

export const {
    setUserData,
    setUserPosts,
    updateUserImage,
    setRandomNumber,
    setFollowing,
    setFollowing_plus1,
    setFollowing_minus1,
    setFollowingData,
    setFollowerData,
} = profileSlice.actions;
export default profileSlice.reducer;
