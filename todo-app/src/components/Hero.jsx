import React, {useState, useEffect} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { UserAuth } from '../context/AuthContext';
import {db} from '../firebase';
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc, arrayUnion} from 'firebase/firestore';

const style = {
  bg: `h-screen w-full p-4 bg-gradient-to-r from-[#808080] to-[#FFFFFF]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 my-24`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-gray-500 text-slate-100`,
  count: `text-center p-2`,
}

//make a function that give a random id with a length of 12 characters to each todo
const randomId = () => {
  return Math.random().toString(36).substr(2, 12);
};

function Hero() {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
const[todos, setTodos] = useState([])
const[input, setInput] = useState('')
const { user} = UserAuth();

const userTodo = doc(db, 'users', `${user?.email}`); // user?.email is the user's email address

//Create todo
const createTodo = async (e) => {
  e.preventDefault(e)
  if (user?.email) {
    try{
    setLike(!like);
    setSaved(true);
    await updateDoc(userTodo, {
      todos: arrayUnion({
        text: input,
        completed: false,
        id: randomId(),
      }),
    });
    setInput('')
  }catch(error){
    console.log(error)
  }} else {
    alert('Please log in to add');
  }
};

// Read todo from firebase
useEffect(() => {
  if (user?.email) {
    const unsubscribe = onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
      const data = doc.data();
      console.log('Fetched data:', data);
      setTodos(data?.todos);
    });

    return () => {
      // Cleanup the subscription when the component unmounts or when the user changes
      unsubscribe();
    };
  } else {
    // User has logged out, clear the todos state
    setTodos([]);
  }
}, [user?.email]);

// Update todo in firebase
const toggleComplete = async (todo) => {
  try {
    const todoRef = doc(db, 'users', `${user?.email}`);
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    await updateDoc(todoRef, {
      todos: updatedTodos,
    });
  } catch (error) {
    console.log(error);
  }
};


//Delete todo from firebase
 const todoRef = doc(db, 'users', `${user?.email}`)
  const deleteTodo = async (id) => {
      try {
        const result = todos.filter((item) => item.id !== id)
        await updateDoc(todoRef, {
            todos: result
        })
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
      <h3 className={style.heading}>Todo App</h3>
      <form onSubmit={createTodo} className={style.form}>
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
