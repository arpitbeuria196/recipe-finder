import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addLoginData : (state,action)=>
        {
            return action.payload;
        },
        removeLoginData: (state,action) =>
        {
            return null;
        },
    }
})

export const{addLoginData,removeLoginData} = userSlice.actions;

export default userSlice.reducer;