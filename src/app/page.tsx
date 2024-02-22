'use client'
import { useEffect, useContext } from "react";
import EditTaskContext from "@/context/EditTaskContext"

import { ITask } from "@/interfaces/Task";

import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TasksList";
import { Modal } from "@/components/Modal";
import { TaskListContext } from "@/context/TaskListContext";

export default function Home() {

  const { showModal, setShowModal, taskToEdit, setTaskToEdit } = useContext(EditTaskContext)
  const { loading, fetchTaskList } = useContext(TaskListContext)

  useEffect(() => {
    fetchTaskList()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-5 items-center text-center justify-center grow "> 
        <div className='h-10 w-10 animate-spin rounded-full border-b-4 border-slate-900'></div>
      <p className="">Loading...</p>
    </div>
    )
  }
  return (
    <>
      {showModal && <Modal />}
      <main className="grow w-3/4 mx-auto">
        <TaskForm btnText={'Add task'} />
        <TaskList />
      </main>
    </>
  );
}
