import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let todoStore = (set) => ({
  todos: [],
  getTodos: async () => {
    const response = await fetch("http://localhost:3100/data");
    set({ todos: await response.json() });
  },
  addTodo: async (payload) => {
    await fetch("http://localhost:3100/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    set((state) => ({
      todos: [...state.todos, payload],
    }));
  },
  removeTodo: async (id) => {
    await fetch(`http://localhost:3100/data/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  toggleTodo: async (id, completed) => {
    await fetch(`http://localhost:3100/data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });

    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  },
});

//todoStore = persist(todoStore, { name: "todos" });
todoStore = devtools(todoStore);

export const useTodoStore = create(todoStore);
