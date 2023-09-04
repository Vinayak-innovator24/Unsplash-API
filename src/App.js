import React, { useState } from "react";
import "./styles.css";
import EditingImage from "./components/EditingImage";

function App() {
  const [text, setText] = useState("");
  const [textBoxes, setTextBoxes] = useState([]);

  // Use the addTextBox prop to add a new text box
  const addNewTextBox = () => {
    const newTextBox = {
      text: text,
      position: { x: 20, y: 20 },
      size: { height: "50px", width: "50px" }
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  return (
    <div className="App">
      <h1>Image viewer</h1>
      <div className="text-input-container">
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNewTextBox}>Add Text Box</button>
      </div>
      <div className="flex justify-center w-full">
        <EditingImage props={{ textBoxes, setTextBoxes }} />
      </div>
    </div>
  );
}

export default App;
