import {useState ,useCallback} from 'react'

function StableFunctionReference() {
  const [count, setCount] = useState(0);

  // this function will not create a new reference on every render
  const increment = useCallback(() => {
    console.log('Increment function called');
    setCount((c) => c + 1);
  }, []); // no dependencies, function reference never changes

  return (
    <div>
      <p>Count : {count}</p>
       <button onClick={increment}>Increment</button>
    </div>
  );
}

export default StableFunctionReference
