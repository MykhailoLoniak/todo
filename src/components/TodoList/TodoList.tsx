import React from 'react'
import { MdCheckCircle, MdOutlineArrowCircleRight, MdOutlineCheckCircleOutline } from 'react-icons/md'
import { HiMiniArrowUturnLeft, HiOutlineXCircle } from "react-icons/hi2";
import { storeType } from '../../types/type';

interface TodoListProps {
  title: string;
  todos: storeType[];
  stateStore: storeType[];
  setStateStore: React.Dispatch<React.SetStateAction<storeType[]>>
}

export const TodoList: React.FC<TodoListProps> = ({ todos, title, stateStore, setStateStore }) => {
  const styles = {
    wrapper: "w-[1024px] m-auto flex flex-wrap gap-4 p-4 border-box justify-center",
    block: " block w-full md:w-[calc(33.333%-1rem)] bg-slate-100 rounded-md min-h-fit",
    listItem: "bg-white m-2 p-2 pe-4 rounded-md relative min-h-[60px]",
    iconNavigate: " cursor-pointer text-[20px]",
    navigate: "absolute right-2 top-2 flex flex-col space-y-1",
    iconCheck: "inline m-[5px] cursor-pointer text-[20px]",
    title: "inline-block m-4 text-gray-400 flex justify-center",
  };

  const handleToggle = (id: number) => {
    setStateStore(stateStore
      .map(item =>
      item.id === id ? { ...item, status: item.status === 1 ? 0 : 1 } : item
    ));
  };

  const handleCheck = (id: number) => {
    setStateStore(stateStore
      .map(item =>
        item.id === id ? { ...item, status: item.status === 2 ? 0 : 2 } : item
      ));
  };

  const handleDel = (id: number) => {
    setStateStore([...stateStore].filter(item => item.id !== id));
  };

  return (
    <div className={styles.block}>
      <h1 className='flex justify-center m-2 font-bold'>{title}</h1>
      {todos.length
        ? <ul className='bg-slate-100'>
          {todos.map(todo => (
            <li className={styles.listItem} key={todo.id}>
              {todo.status !== 2
                ? <MdOutlineCheckCircleOutline className={styles.iconCheck} onClick={() => handleCheck(todo.id)} />
                : <MdCheckCircle className={`text-green-400 ${styles.iconCheck}`} onClick={() => handleCheck(todo.id)} />
              }
              {todo.title}
              <div className={styles.navigate}>
                <HiOutlineXCircle className=' text-[20px]' onClick={() => handleDel(todo.id)} />
                {todo.status === 2 ? '' : todo.status === 1
                  ? <HiMiniArrowUturnLeft className={styles.iconNavigate} onClick={() => handleToggle(todo.id)} />
                  : <MdOutlineArrowCircleRight className={styles.iconNavigate} onClick={() => handleToggle(todo.id)} />
                }
              </div>
            </li>
          ))}
        </ul>
        : <>
          {title === "Done" && <h3 className={styles.title}>Completed tasks will appear here.</h3>
            || title === "In progress" && <h3 className={styles.title}>The tasks you are currently working on are displayed here.</h3>
            || title === "To do" && <h3 className={styles.title}>No tasks yet? Add a new one using the form above.</h3>}
        </>
      }
    </div>
  )
}
