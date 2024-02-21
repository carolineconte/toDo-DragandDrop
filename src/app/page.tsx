'use client'
import { Modal } from "@/components/Modal";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TasksList";
import { UrgentContainer } from "@/components/UrgentContainer";
import { ITask } from "@/interfaces/Task";
import { useEffect, useState } from "react";

export default function Home() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null)
  console.log(taskToEdit)

  const fetchTaskList = () => {
    const res = fetch('/api').then(res => {
      res.json().then(data => {
        setTaskList(data)
      })
    })
  }

  useEffect(() => {
    fetchTaskList()
  }, [taskToEdit])

  return (
    <>
      {taskToEdit && <Modal setTask={setTaskToEdit} task={taskToEdit} />}
      <main className="grow w-3/4 mx-auto">
        <TaskForm fetchTaskList={fetchTaskList} btnText={'Add task'} />
        <div>
          <UrgentContainer />
          <TaskList taskList={taskList} setTaskToEdit={setTaskToEdit} />
        </div>
      </main>
    </>
  );
}
