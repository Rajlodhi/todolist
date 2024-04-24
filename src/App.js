import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import About from "./About";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  // State to store todo items
  const [todos, setTodos] = useState([]);
  // State to store new todo input
  const [newTodo, setNewTodo] = useState("");

  // Fetch todo items from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  // Function to handle adding new todo
  const handleAddTodo = () => {
    // Create a new todo object
    const newTodoObj = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };

    // Update the UI optimistically
    setTodos([...todos, newTodoObj]);

    // Make a POST request to the API
    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTodoObj)
      .then((response) => {
        console.log("New todo added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding new todo:", error);
      });

    // Clear the input field
    setNewTodo("");
  };

  return (
    <div>
       <Router>
     <Routes>
       <Route path="/home" element={<Home />} />
       <Route path="/about" element={<About />} />
     </Routes>
   </Router>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
    
  );
};

export default App;
