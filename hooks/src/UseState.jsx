import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function UseState() {     
  //  State Hooks
  const [count, setCount] = useState(0);
  const [freq, setFreq] = useState(0);
  const [radi, setRadi] = useState(0);
  const [area, setArea] = useState(0);
  const [name, setName] = useState("user");
  const [userData, setUserData] = useState({ name: "", age: "" });
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [color,setColor]=useState("pink");
  const [color1,setColor1]=useState("blue");

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodo([...todo, task]);
    setTask("");
  };
  return (
    <>
      <div className="card">
        (1)count increment on Click
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="card">
        <p>(2)Enter Radius below to calculae area of circle</p>
        <textarea
          onChange={(e) => {
            setRadi(e.target.value);
          }}
        />
        <button onClick={() => setArea((3.14 * radi * radi).toFixed(2))}>
          Click to calculate :{area}
        </button>
      </div>

      <div className="card">
        <p>(3)Enter Name below:</p>
        <textarea
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>Hello : {name}</p>
      </div>

      <div className="card">
        <p>(4) Enter Your Tasks below:</p>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todo.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <p>(5)Boolean UseState</p>
        <button onClick={() => setIsOn((prev) => !prev)}>
          is {isOn ? "ON" : "OFF"}
        </button>
      </div>

      <div className="card">
        <p>(6)Enter Your Detils below:</p>
        <input
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter Name"
        />
        <input
          type="text"
          value={userData.age}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, age: e.target.value }))
          }
          placeholder="Enter Age"
        />
        <button
          disabled={!userData.name || !userData.age}
          onClick={() => {
            alert(
              `Your Name is ${userData.name} and you're ${userData.age} old.`
            );
          }}
        >
          Show Message
        </button>
      </div>

      <div className="card">
        <p>(7)Set/Reset</p>
        <button onClick={() => setFreq((freq) => freq + 1)}>
          count is {freq}
        </button>
        <button onClick={() => setFreq(0)}>Reset</button>
      </div>

      <div className="card">
        <p style={{color:color}}>(8) Style changes</p>
        <button
        onClick={()=>{
          setColor('orange');
        }}>change color</button>
      </div>

        <div className="card">
        <p style={{color:color1}}>(9) Style changes</p>
        <button
        onClick={()=>{
          setColor1('red');
        }}>change color</button>
        <button
        onClick={()=>{
          setColor1('blue');
        }}>Reset color</button>
      </div>
      
        <div className="card">
        <p>(10)</p>
        
      </div>

    </>
  );
}

export default UseState;
