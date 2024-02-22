import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "api";

const initialState = {
  letters: [],
  isLoading: true,
  isError: false,
  error: null,
};

export const __editLetter = createAsyncThunk(
  "editLetter",
  async ({ id, editingText }, thunkAPI) => {
    try {
      await jsonApi.patch(`/letters/${id}`, { content: editingText });
      const { data } = await jsonApi.get("/letters");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (id, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${id}`);
      const { data } = await jsonApi.get("/letters");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await jsonApi.get("/letters");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (newLetter, thunkAPI) => {
    try {
      await jsonApi.post("/letters", newLetter);
      const { data } = await jsonApi.get("/letters");
      console.log("data : ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__addLetter.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__addLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__addLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(__getLetters.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__getLetters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__getLetters.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(__deleteLetter.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__deleteLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__deleteLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(__editLetter.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__editLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__editLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

// export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
