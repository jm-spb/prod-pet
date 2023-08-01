import { useState } from 'react';
import './Counter.scss';

function Counter() {
  const [count, setCount] = useState(0);
  const handleOnClick = () => setCount((c) => c + 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleOnClick}>CLICK</button>
    </div>
  );
}

export default Counter;
