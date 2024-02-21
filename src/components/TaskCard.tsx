'use client'
import { ITask } from "@/interfaces/Task"
//Styles
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

import { Draggable } from '@hello-pangea/dnd'

type Props = {
  task: ITask;
  setTaskToEdit: React.Dispatch<React.SetStateAction<ITask | null>>;
  index: number;
}

export const TaskCard = ({ task, setTaskToEdit, index }: Props) => {

  const handleDelete = async (e: any, _id: string) => {
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
    <Draggable draggableId={task._id} index={index}> 
      {
        (provided) => (
          <div 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
            className="flex items-center gap-2 justify-between m-4 border p-3 rounded-xl bg-slate-200/50" key={task._id}>
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
      }
    </Draggable>
  )
}