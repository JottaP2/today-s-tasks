"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import deleteIcon from "../app/excluir.svg";
import { Lightbulb } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === "undefined") return [];
    const salvas = localStorage.getItem("tasks");
    return salvas ? JSON.parse(salvas) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [concluida, setConcluida] = useState(false);

  const adicionarTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const removerTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const concluirtask = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, concluida: !task.concluida} : task));
    setConcluida(!concluida);
  }


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-5 sm:px-10 bg-[#F9F5F4] text-gray-900 font-poppins">
      <main className="w-full max-w-2xl flex-1 flex flex-col">
        <section className="flex flex-col gap-5 w-full flex-1">
          <h1 className="text-3xl font-bold">Today</h1>
          <div className="flex items-center gap-2 justify-center p-3 bg-zinc-200 rounded-md">
            <Lightbulb />
            <p>Adicione suas tarefas do dia e organize-as facilmente!</p>
          </div>
          <article className="w-full">
            <ul className="flex flex-col gap-5 list-none mb-5 w-full">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex gap-5 items-center p-2.5 bg-[#eee9e8] rounded-md ${task.concluida ? "bg-green-200" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 min-w-[20px] rounded-full cursor-pointer accent-[#9F9F9F]"
                    id={`check-${task.id}`}
                    checked={task.concluida}
                    onChange={() => concluirtask(task.id)}
                  />
                  <span className={`flex-1 font-medium transition-all ${task.concluida ? "line-through text-gray-600" : ""}`}>{task.text}</span>
                  <button
                    className="flex flex-1 justify-end w-fit bg-transparent border-none cursor-pointer"
                    onClick={() => removerTask(task.id)}
                  >
                    <Image
                      src={deleteIcon}
                      alt="icon de apagar"
                      className="w-6 h-6 hover:opacity-75 transition-opacity"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <div className="flex justify-center items-center w-full gap-2.5 mt-auto mb-5">
          <input
            type="text"
            placeholder="Nova tarefa..."
            className="bg-[#e7e3e2] p-2.5 w-full rounded-lg border-none outline-none text-gray-800 placeholder-gray-500 font-poppins"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                adicionarTask();
              }
            }}
          />
          <button
            type="button"
            className="py-2.5 px-4 rounded-lg border-none bg-[#393433] text-white cursor-pointer font-medium hover:bg-black transition-colors font-poppins"
            onClick={adicionarTask}
          >
            Add
          </button>

        </div>
      </main>
    </div>
  );
}
