import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

const EditingImage = ({ props }) => {
  const [image, setImage] = useState("");

  const { textBoxes , setTextBoxes} = props;
  useEffect(() => {
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}`;
      fetch(apiUrl)
      .then((response) => response.json())
          .then((data) => {
        setImage(data.urls.regular);
      })
      .catch((error) => {
        console.log("Error fetching image:", error);
      });
  }, []);

  const handleDrag = (e, ui, index) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index].position.x = (ui.x / window.innerWidth) * 100;
    updatedTextBoxes[index].position.y = (ui.y / window.innerHeight) * 100;
    setTextBoxes(updatedTextBoxes);
  };

function resizeTextarea(event) {
  const textarea = event.target;
  console.log({slope: textarea.style})
  textarea.style.height = `${textarea.scrollHeight}px`;
}
  return (
    <div
      // className="image-editor"
      style={{
        backgroundImage: `url(${image})`,
        height: "600px",
        width: "80%",
        backgroundSize: "cover",
        backgroundRepeat: "none"
      }}
    >
      {textBoxes.map((textBox, index) => (
        <Draggable
          key={index}
          bounds="parent"
          onDrag={(e, ui) => handleDrag(e, ui, index)}
        >
           <div>
            <textarea
  className="resize-none rounded-md bg-black bg-opacity-50 text-white p-2 text-3xl"
  value={textBox.text}
  onChange={(e) => {
    const newTextBox = textBoxes.map((t, idx) => {
      if(index == idx) return {...t, text: e.target.value};
      return t;
    })
    setTextBoxes(newTextBox);
    resizeTextarea(e)
  }}
/>
           </div>
        </Draggable>
      ))}
    </div>
  );
};

export default EditingImage;
