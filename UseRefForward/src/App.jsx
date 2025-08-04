import { useState } from "react";
import "./App.css";
import ForwardRef from "./ForwardRef";
import Modal from "./Modal";
import Tooltip from "./Tooltip";


function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ForwardRef />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        (2)Open Modal
      </button>
      {open && (
        <Modal>
          <h2>Hello From the Modal</h2>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            x Close
          </button>
        </Modal>
      )}
       <br />
      <br />
      <br />
      <Tooltip/>
    </>
  );
}

export default App;
