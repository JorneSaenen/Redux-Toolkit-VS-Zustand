import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  isLoading: false,
};

const url = "http://localhost:3100/data";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch(url);
  return await response.json();
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

export const addTodo = createAsyncThunk("todos/addTodo", async (payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
});

export const toggle = createAsyncThunk("todos/toggle", async ({ id, completed }) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  return await response.json();
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [getTodos.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.meta.arg);
    },
    [addTodo.fulfilled]: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    [toggle.fulfilled]: (state, action) => {
      state.todos = state.todos.map((todo) => (todo.id === action.meta.arg.id ? { ...todo, completed: action.payload.completed } : todo));
    },
  },
});

// Action creators are generated for each case reducer function
//export const {} = todoSlice.actions;
export default todoSlice.reducer;
