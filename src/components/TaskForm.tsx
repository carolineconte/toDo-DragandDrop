'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { CalendarPlus2 } from 'lucide-react'
import { ITask } from '@/interfaces/Task';

type Props = {
  btnText: string;
  fetchTaskList: () => void;
}

export const TaskForm = ({ btnText, fetchTaskList }: Props) => {

  const [titleTask, setTitleTask] = useState<string>('')

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
    <form className='w-full flex p-5 gap-4' onSubmit={handleNewTask}>
      <input name='title' placeholder='New task title' className='bg-slate-100 py-2 px-4 grow rounded-lg'
        value={titleTask} onChange={e => setTitleTask(e.target.value)}
      />
      <input className='border px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-500' type="submit" value={btnText} />
    </form>
  )
}