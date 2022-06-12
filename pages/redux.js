import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { addTodo, toggle, getTodos, removeTodo } from "../states/redux/TodoSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const Redux = () => {
  const [input, setInput] = useState("");
  const { todos, isLoading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
    console.log("Redux useEffect triggered");
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text: input, id: nanoid(4), completed: false }));
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggle = (id, completed) => {
    dispatch(toggle({ id, completed }));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Redux</title>
        <meta name='description' content='Redux' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1>Redux</h1>
        <Link href={"/"}>
          <a className={styles.link}>Home</a>
        </Link>
        <h2>{todos.length} todos.</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={(e) => setInput(e.target.value)} value={input} style={{ marginRight: "10px" }} />
          <button className={styles.btn}>add</button>
        </form>
        {isLoading && <p>LOADING...</p>}
        <div className={styles.todosWrapper}>
          {!isLoading &&
            todos?.map((todo) => (
              <div key={todo.id} className={styles.todo}>
                <p style={{ textDecoration: `${todo.completed ? "line-through" : ""}` }}>
                  {todo.text} - {todo.id}
                </p>
                <button className={styles.btn} style={{ marginRight: "10px" }} onClick={() => handleToggle(todo.id, !todo.completed)}>
                  {todo.completed ? "undo" : "check"}
                </button>
                <button className={styles.btn} onClick={() => handleDelete(todo.id)}>
                  delete
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Redux;
