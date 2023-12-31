import Image from "next/image";
import Todo from "../../models/todo";
import dbConnect from "../../utils/dbconnect";
import { redirect } from "next/navigation";

const mongoose = require("mongoose");
export default async function Home() {
  async function newTodo(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let todo = data.get("todo")?.valueOf();
    try {
      dbConnect();
      let newTodo = new Todo({ title, todo });
      await newTodo.save();
      console.log(newTodo);

    } catch (error) {
      console.error(error);
    } finally{
        redirect('/show')       
    }
   
  }
  return (
    <main className="m-10 apsce-y-5">
      <h1 className="text-xl font-bold">Create Todo</h1>
      <form action={newTodo}>
        <div className="">
          <label htmlFor="title" className="text-lg">
            Title
          </label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            className="w-[100%] bg-slate-200 h-10 p-3 text-slate-900"
          />
        </div>
        <div className="">
          <label htmlFor="Todo" className="text-lg">
            Todo
          </label>
          <br />
          <input
            type="text"
            name="todo"
            id="todo"
            className="w-[100%] bg-slate-200 h-10 p-3 text-slate-900"
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-yellow-400 m-3 font-bold hover:bg-orange-400 hover:text-white"
        >
          SUBMIT
        </button>
      </form>
    </main>
  );
}
