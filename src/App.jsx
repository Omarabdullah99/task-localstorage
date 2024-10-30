import React, { useState } from 'react'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './component/Home'
import UpdateForm from './component/UpdateForm'
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home tasks={tasks} setTasks={setTasks} />
    },

    {
      path:'/:id',
      element:<UpdateForm tasks={tasks} setTasks={setTasks}></UpdateForm>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  )
}

export default App