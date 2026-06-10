import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.initialized = true;
    },
    initializAuth: (state) => {
      state.initialized = true;
    },

    logout: (state) => {
      state.user = null;
      state.initialized = true;
    },
  },
});

export const { setUser, logout , initializAuth } = authSlice.actions;

export default authSlice.reducer;
