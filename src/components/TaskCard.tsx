'use client'
import { ITask } from "@/interfaces/Task"
//Styles
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import EditTaskContext from "@/context/EditTaskContext"
import { useContext } from "react";

import { Draggable } from '@hello-pangea/dnd'
import { TaskListContext } from "@/context/TaskListContext";

type Props = {
  task: ITask;
  index: number;
}

export const TaskCard = ({ task, index }: Props) => {

  const { setShowModal, setTaskToEdit } = useContext(EditTaskContext)
  const { taskList, setTaskList} = useContext(TaskListContext)

  const handleDelete = async (e: any, _id: string) => {
    e.preventDefault();

    await fetch('/api?_id=' + _id, {
      method: 'DELETE',
    }).then(res => {
      if (!res.ok) {
        throw new Error(`Error on delete. Response: ${JSON.stringify(res)}`);
      }
    })

    const attList = taskList.filter(task => task._id !== _id)
    setTaskList(attList)
  }

  return (
    <Draggable draggableId={task._id} index={index} key={task._id}>
      {
        (provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex items-center gap-2 justify-between m-4 border p-3 rounded-xl bg-slate-200/50" >
            <h4 className="text-xl capitalize">{task.title}</h4>
            <div className="flex items-center gap-1">
              <button className="btnTask"
                onClick={(e) => {
                  setTaskToEdit(task)
                  setShowModal(true)
                }}>
                <FaPencil />
              </button>
              <button className="btnTask"
                onClick={(e) => handleDelete(e, task._id)}>
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        )
      }
    </Draggable>
  )
}