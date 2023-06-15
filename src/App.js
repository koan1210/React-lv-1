import React, { useState } from "react";
import "App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todos.length,
      title: title,
      body: body,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setBody("");
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const workingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <div className="list">
      <header className="list-header">
        <h1>Todo list</h1>
        <form onSubmit={onSubmitHandler}>
          <label>
            제목
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChangeHandler}
            />
          </label>
          <label>
            내용
            <input
              type="text"
              name="body"
              value={body}
              onChange={onChangeHandler}
            />
          </label>
          <button type="submit">추가하기</button>
        </form>
      </header>
      <main>
        <div className="working-todos">
          <h2>Working.... 🔥</h2>
          {workingTodos.map((todo) => (
            <div
              className={`todo ${todo.isDone ? "green-border" : "red-border"}`}
              key={todo.id}
            >
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
              <button onClick={() => toggleDone(todo.id)}>
                {todo.isDone ? "취소" : "완료"}
              </button>
              <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
            </div>
          ))}
        </div>
        <div className="done-todos">
          <h2>Done...! 🎉</h2>
          {doneTodos.map((todo) => (
            <div className="todo green-border" key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
              <button onClick={() => toggleDone(todo.id)}>
                {todo.isDone ? "취소" : "완료"}
              </button>
              <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
