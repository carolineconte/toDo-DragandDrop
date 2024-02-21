
import { ITask } from "@/interfaces/Task"
import { useState } from "react"

type Props = {
  task: ITask | null
  setTask: React.Dispatch<React.SetStateAction<ITask | null>>
}

export const Modal = ({ task, setTask }: Props) => {

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
      setTask(null)
    })
  }


  const closeModal = (): void => {
    const modal = document.querySelector('#modal')
    modal?.classList.add('hide')
  }

  return (
    <div id="modal" className={task ? '' : 'hidden'}>
      <div className="w-full h-screen absolute bg-black/30 z-10"></div>
      <div className="absolute rounded-2xl px-10 shadow-lg top-[10%] mx-auto left-0 right-0 w-[500px] h-[400px] z-20 bg-white flex flex-col justify-center items-center">
        <h2 className="mb-5">Edite esta tarefa</h2>
        <form className='w-full flex gap-4 ' onSubmit={handleAttTask}>
          <input name='title' placeholder='New task title' className='bg-slate-100 py-2 px-4 rounded-lg grow'
            value={title} onChange={e => setTitle(e.target.value)} />
          <input className='border px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-500' type="submit" value='Att' />
        </form>
      </div>
    </div>
  )
}