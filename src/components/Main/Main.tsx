import React from 'react'
import { storeType } from '../../types/type';
import { TodoList } from '../TodoList';

interface MainProps {
  stateStore: storeType[]
  setStateStore: React.Dispatch<React.SetStateAction<storeType[]>>
}

export const Main: React.FC<MainProps> = ({ stateStore, setStateStore }) => {
  const styles = {
    wrapper: "w-full max-w-[1024px] mx-auto flex flex-wrap gap-4 p-4",
  };

  return (
    <div className={styles.wrapper}>
      <TodoList
        title={'To do'}
        todos={stateStore.filter(e => e.status === 0)}
        stateStore={stateStore}
        setStateStore={setStateStore}
      />
      <TodoList
        title={'In progress'}
        todos={stateStore.filter(e => e.status === 1)}
        stateStore={stateStore}
        setStateStore={setStateStore}
      />
      <TodoList
        title={'Done'}
        todos={stateStore.filter(e => e.status === 2)}
        stateStore={stateStore}
        setStateStore={setStateStore}
      />
    </div>
  )
}
