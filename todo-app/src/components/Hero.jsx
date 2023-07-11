import React, {useState, useEffect} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import {db} from '../firebase';
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore';

const style = {
  bg: `h-screen w-full p-4 bg-gradient-to-r from-[#808080] to-[#FFFFFF]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 my-24`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-gray-500 text-slate-100`,
  count: `text-center p-2`,
}

function Hero() {
const[todos, setTodos] = useState([])
const[input, setInput] = useState('')
console.log(input);


//Create todo
const creatTodo = async (e) => {
  e.preventDefault(e)
  if(input === '') {
    alert('Please enter a todo')
    return
  }
  await addDoc(collection(db, "todos"), {
    text: input,
    completed: false,
  })
  setInput('')
}

//Read todo from firebase
useEffect(() => {
  const q = query(collection(db, "todos"))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = []
    querySnapshot.forEach((doc) => {
      todosArr.push({...doc.data(), id: doc.id})
});
setTodos(todosArr)
  })
  return () => unsubscribe()
}, [])

//Update todo in firebase
const toggleComplete = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id), {
    completed: !todo.completed
  })
}

//Delete todo from firebase
const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todos', id), {
    deleted: true
  })
}

  return (
    <div className={style.bg}>
      <div className={style.container}>
      <h3 className={style.heading}>Todo App</h3>
      <form onSubmit={creatTodo} className={style.form}>
        <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add Todo'></input>
        <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index)=> (
          <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length <1 ? null : (
        <p className={style.count}>{`You have ${todos.length} todos`}</p>)}
      </div>
    </div>
  );
}

export default Hero;
