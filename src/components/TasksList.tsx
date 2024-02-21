//Interfaces
import { ITask } from "@/interfaces/Task"
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { TaskCard } from "./TaskCard";

type Props = {
  taskList: ITask[];
  setTaskToEdit: React.Dispatch<React.SetStateAction<ITask | null>>;
  setTaskList:any;
}

export const TaskList = ({ taskList, setTaskToEdit, setTaskList}: Props) => {

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    //cria uma lista nova
    const result = Array.from(list);
    //remove o item da posicao inicial
    const [removed] = result.splice(startIndex, 1);
    //soltar na posicao q foi deixada
    result.splice(endIndex, 0, removed)
    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const items = reorder(taskList, result.source.index, result.destination.index)
    setTaskList(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" type="list" direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}
            className="mt-1 border rounded-xl p-1 mx-auto"
          >
            {
              taskList.length > 0 ? (
                taskList.map((task, index) =>
                  <TaskCard index={index} setTaskToEdit={setTaskToEdit} task={task} key={task._id} />

                )
              ) : <p>Nada ainda</p>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  )
}