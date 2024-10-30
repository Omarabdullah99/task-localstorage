import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateForm = ({ tasks, setTasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const findTask = savedTasks.filter((task) => task.id === Number(id));
  const singelObject = findTask[0];
  
  const [name, setName] = useState(singelObject ? singelObject.name : '');



  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...singelObject, name};
    
    const updatedTasks = savedTasks.map((task) =>
      task.id === Number(id) ? updatedTask : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate('/'); // সাবমিট করার পর হোম পেজে ফিরিয়ে দেয়
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
