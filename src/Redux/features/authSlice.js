// src/Redux/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5454';

// Thunk: Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Step 1: Login to get token
      const res = await axios.post(`${API_BASE_URL}/auth/signin`, credentials);
      const token = res.data.jwt;

      if (!token) {
        return thunkAPI.rejectWithValue('No token returned from login');
      }

      localStorage.setItem('jwt', token);

      // Step 2: Use token to fetch user info
      const userRes = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userRes.data;

      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk: Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      const user = res.data;

      // You can trigger OTP here if needed separately
      return { user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk: Get user from stored token (for page reload)
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error('No token found');

      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('jwt') || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("LOGIN SUCCESS", action.payload);  
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("LOGIN FAILED", action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        // Token is not provided during register until OTP verified
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;

        // Optionally auto-logout on unauthorized
        if (action.payload === 'Unauthorized') {
          state.user = null;
          state.token = null;
          localStorage.removeItem('jwt');
        }
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
