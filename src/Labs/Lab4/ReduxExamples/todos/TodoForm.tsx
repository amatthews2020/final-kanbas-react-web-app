import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item">
      <button onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"
              className="btn btn-success float-end px-3 ms-1"> Add </button>
      <button onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"
              className="btn px-2 float-end btn-warning"> Update </button>
      <input
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
    </li>
);}
