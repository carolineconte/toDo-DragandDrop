import { useState, useContext } from "react"
import EditTaskContext from "@/context/EditTaskContext"
import { TaskListContext } from "@/context/TaskListContext"

export const Modal = () => {

  const { fetchTaskList } = useContext(TaskListContext)
  const { showModal, setShowModal,  taskToEdit :task, setTaskToEdit:setTask } = useContext(EditTaskContext)
  const [title, setTitle] = useState(task?.title)

  const handleAttTask = async (e: any) => {
    e.preventDefault()

    await fetch('/api?_id=' + task?._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    }).then(res => {
      if (!res.ok) {
        throw new Error(`Error on delete. Response: ${JSON.stringify(res)}`);
      }
      fetchTaskList()
      setTask(null)
      setShowModal(false)
    })
  }

  return (
    <div id="modal" className={task ? '' : 'hidden'}>
      <div onClick={() => {setShowModal(false); console.log(showModal)}}
        className="w-full h-screen absolute bg-black/30 z-10">
      </div>

      <div className="absolute rounded-2xl px-10 shadow-lg top-[20%] mx-auto left-0 right-0 w-[500px] h-[400px] z-20 bg-white flex flex-col justify-center items-center">
        <h2 className="mb-5 text-2xl">Edit this task</h2>
        <form className='w-full' onSubmit={handleAttTask}>
          <input name='title' placeholder='New task title' className='bg-slate-100 py-2 px-4 rounded-lg w-full mb-3'
            value={title} onChange={e => setTitle(e.target.value)} />
          <input className='border mx-auto block px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-500 uppercase font-bold bg-slate-200'
          type="submit" value='Update' />
        </form>
      </div>
    </div>
  )
}