import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ tasks, setTasks }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false); // নতুন স্টেট ভেরিয়েবল
  console.log(hasLoaded)

  // localStorage থেকে tasks লোড
  useEffect(() => {
    if (!hasLoaded) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log("Loaded from localStorage:", savedTasks);
      setTasks(savedTasks);
      setId(
        savedTasks.length > 0 ? savedTasks[savedTasks.length - 1].id + 1 : 0
      );
      setHasLoaded(true); // একবার লোড করার পর hasLoaded true সেট করছি
    }
  }, [hasLoaded]);

  // tasks আপডেট হলে localStorage এ সংরক্ষণ
  useEffect(() => {
    if (hasLoaded) {
      console.log("Saving to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  function handleTask(e) {
    e.preventDefault();
    if (name) {
      const newTask = { id: id, name: name, status: "false" };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setId(id + 1);
      setName("");
    } else {
      alert("set name");
    }
  }

  function handleDelete(id){
    const removeItem= tasks.filter((task)=> task.id !== id)
    // console.log("removeItem",removeItem)
    setTasks(removeItem)
  }

  function handeCompleted(id){
    const updateTask= tasks.map((task)=> task.id === id ? {...task, status:true}: task)
    setTasks(updateTask)
  }

  return (
    <div>
      <form onSubmit={handleTask}>
        <input
          type="text"
          value={name}
          placeholder="Add Task"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <div key={task.id} className="items">
            <Link to={`/${task.id}`}><button >Edit</button></Link>
            <h1 className={task.status === true ? "line-through": ''}>  {task.name}</h1>
            <button onClick={()=>handleDelete(task.id)}>Delete</button>
            <button onClick={()=>handeCompleted(task.id)}>Completed Task</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
