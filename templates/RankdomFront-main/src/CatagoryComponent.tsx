import { useState } from 'react';

function CatagoryComponent() {
  const [count, setCount] = useState(0);
  //const catagoryList = [1-8];

  return (
    <>
      <div className="content">
        <div className="card">

          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default CatagoryComponent;
