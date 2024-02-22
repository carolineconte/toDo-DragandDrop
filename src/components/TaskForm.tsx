'use client'
import { TaskListContext } from '@/context/TaskListContext';
import React, { FormEvent, useState, useContext } from 'react';

type Props = {
  btnText: string;
}

export const TaskForm = ({ btnText }: Props) => {

  const [titleTask, setTitleTask] = useState<string>('')
  const { fetchTaskList } = useContext(TaskListContext)

  const handleNewTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTask = {
      title: titleTask
    };

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    if (!res.ok) {
      console.log(res)
    }
    fetchTaskList()
    setTitleTask('')
  }

  return (
    <form className='w-full flex my-10 gap-4' onSubmit={handleNewTask}>
      <input name='title' placeholder='New task title'
        className='bg-slate-50/50 text-lg py-2 px-4 grow rounded-lg border'
        value={titleTask} onChange={e => setTitleTask(e.target.value)}
      />
      <input className='border px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-500' type="submit" value={btnText} />
    </form>
  )
}
