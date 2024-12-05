import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo}: {
    todo: { id: string; title: string };
  }) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"
              className="btn px-2 ms-1 float-end btn-danger"> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"
              className="btn float-end btn-primary"> Edit </button>
      {todo.title}
    </li>
);}
