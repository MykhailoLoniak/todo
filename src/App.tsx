import { useEffect, useState } from 'react';
import { Input, } from './components/Input';
import { Main } from './components/Main';
import { storeType } from './types/type';
import './App.css';

function App() {
  const store = JSON.parse(localStorage.getItem('store') || '[]') as storeType[];
  const [stateStore, setStateStore] = useState<storeType[]>(store);
  const [err, setErr] = useState("");

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(stateStore));
  }, [stateStore])

  return (
    <div className="App">
      <Input  err={err}  setErr={setErr} stateStore={stateStore} setStateStore={setStateStore} />
      <Main stateStore={stateStore} setStateStore={setStateStore} />
    </div>
  );
}

export default App;
