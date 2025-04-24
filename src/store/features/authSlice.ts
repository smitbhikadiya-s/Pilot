import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInUser: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.isLoggedIn = true;
        state.user = {
          name: "Admin",
        };
      }
    },
    signOutUser: (state) => {
      (state.isLoggedIn = false), (state.user = null);
    },
  },
});

export const { signInUser, signOutUser } = authSlice.actions;

export default authSlice.reducer;
