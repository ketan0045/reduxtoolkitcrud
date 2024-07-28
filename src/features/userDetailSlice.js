import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://6643345a3c01a059ea21f062.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://6643345a3c01a059ea21f062.mockapi.io/crud"
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://6643345a3c01a059ea21f062.mockapi.io/crud/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://6643345a3c01a059ea21f062.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        // state.error = action.payload.message;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.loading = false;
        state.users = state.users.filter((ele) => ele.id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;

// axios

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const createUser = createAsyncThunk(
//   "createUser",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("https://6643345a3c01a059ea21f062.mockapi.io/crud", data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         return rejectWithValue(error.response.data);
//       } else if (error.request) {
//         return rejectWithValue("Network error, please try again later.");
//       } else {
//         return rejectWithValue("An unexpected error occurred.");
//       }
//     }
//   }
// );
// export const showUser = createAsyncThunk(
//   "showUser",
//   async (args, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("https://6643345a3c01a059ea21f062.mockapi.io/crud");
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         return rejectWithValue(error.response.data);
//       } else if (error.request) {
//         return rejectWithValue("Network error, please try again later.");
//       } else {
//         return rejectWithValue("An unexpected error occurred.");
//       }
//     }
//   }
// );

// export const deleteUser = createAsyncThunk(
//   "deleteUser",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`https://6643345a3c01a059ea21f062.mockapi.io/crud/${id}`);
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         return rejectWithValue(error.response.data);
//       } else if (error.request) {
//         return rejectWithValue("Network error, please try again later.");
//       } else {
//         return rejectWithValue("An unexpected error occurred.");
//       }
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "updateUser",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`https://6643345a3c01a059ea21f062.mockapi.io/crud/${data.id}`, data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         return rejectWithValue(error.response.data);
//       } else if (error.request) {
//         return rejectWithValue("Network error, please try again later.");
//       } else {
//         return rejectWithValue("An unexpected error occurred.");
//       }
//     }
//   }
// );

// export const userDetail = createSlice({
//   name: "userDetail",
//   initialState: {
//     users: [],
//     loading: false,
//     error: null,
//     searchData: [],
//   },
//   reducers: {
//     searchUser: (state, action) => {
//       state.searchData = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users.push(action.payload);
//       })
//       .addCase(createUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(showUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(showUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(showUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         const { id } = action.payload;
//         state.loading = false;
//         state.users = state.users.filter((ele) => ele.id !== id);
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = state.users.map((ele) =>
//           ele.id === action.payload.id ? action.payload : ele
//         );
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userDetail.reducer;
// export const { searchUser } = userDetail.actions;

// axios
