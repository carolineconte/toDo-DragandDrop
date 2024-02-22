'use client'
import React, { createContext, useState, ReactNode, FC } from "react";
import { ITask } from "@/interfaces/Task";

// Define the type for the context value
interface EditTaskContextType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskToEdit: ITask | null;
  setTaskToEdit: any;
}

// Create the context
const EditTaskContext = createContext<EditTaskContextType>({
  showModal: false,
  setShowModal: () => { }, // A dummy function
  taskToEdit: null,
  setTaskToEdit: () => { }
});

// Provider component
export const EditTaskContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [showModal, setShowModal] = useState(false); // Initialized to false
  const [taskToEdit, setTaskToEdit] = useState(null)

  return (
    <EditTaskContext.Provider value={{ showModal, setShowModal, taskToEdit, setTaskToEdit }}>
      {children}
    </EditTaskContext.Provider>
  );
};

// Export the context
export default EditTaskContext;

