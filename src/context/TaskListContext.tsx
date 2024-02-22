'use client'
import React, { createContext, useState, ReactNode, FC, useContext } from "react";
import { ITask } from "@/interfaces/Task";

// Define the type for the context value
interface TaskListContextType {
  taskList: ITask[];
  setTaskList: any;
  loading: boolean;
  setLoading: any;
  fetchTaskList:any
}


export const TaskListContext = createContext<TaskListContextType>({
  taskList: [],
  setTaskList: () => { },
  loading: true,
  setLoading: () => { },
  fetchTaskList: () => {}
})

// Provider component
export const TaskListContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  
  const [taskList, setTaskList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTaskList = () => {
    const res = fetch('/api').then(res => {
      res.json().then(data => {
        setTaskList(data)
        setLoading(false)
      })
    })
  }

  return (
    <TaskListContext.Provider value={{ 
      taskList, setTaskList, loading, setLoading, fetchTaskList 
      }}>
      {children}
    </TaskListContext.Provider>
  );
};