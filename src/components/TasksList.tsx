'use client'
//Styles
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
//Interfaces
import { ITask } from "@/interfaces/Task"
import { MouseEvent, useEffect, useState } from "react";

type Props = {
  taskList: ITask[];
  setTaskToEdit: React.Dispatch<React.SetStateAction<ITask | null>>
}


export const TaskList = ({ taskList, setTaskToEdit }: Props) => {

  const [loading, setLoading] = useState<boolean>(true)

  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, _id: string) => {
    e.preventDefault();

    await fetch('/api?_id=' + _id, {
      method: 'DELETE',
    }).then(res => {
      if (!res.ok) {
        throw new Error(`Error on delete. Response: ${JSON.stringify(res)}`);
      }
    })
  }

  return (
    <div className="mt-1 border rounded-xl p-1 mx-auto">
      {
        taskList.length > 0 ? (
          taskList.map(task =>
            <div className="flex items-center gap-2 justify-between m-4 border p-3 rounded-xl bg-slate-200/50" key={task._id}>
              <h4 className="text-xl capitalize">{task.title}</h4>
              <div className="flex items-center gap-1">
                <button className="btnTask"
                onClick={() => setTaskToEdit(task)}>
                  <FaPencil />
                </button>
                <button className="btnTask"
                  onClick={(e) => handleDelete(e, task._id)}>
                  <FaRegTrashCan />
                </button>
              </div>
            </div>
          )
        ) : (
          <p>Nao ha tarefas cadastradas</p>
        )
      }
    </div>
  )
}