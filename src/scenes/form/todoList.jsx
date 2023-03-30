import React, { Component, useState } from "react";
const TodoList = () => {
  const[input,setInput] = useState("")
  const[inputList,setInputList] = useState([])
  const saveInput = (e) => {
    setInput(e.target.value)
  };
  
  const addNewItem = () => {
    const inputLists = {
      id:Math.floor(Math.random() * 10000) ,
      text:input
    }
    inputList.push(inputLists); 
    setInput("")
    if(inputLists.text === input)
      {
        alert("Already Exists")
      }
  };
  const handleDelete = (id) => {
    const filterList = inputList.filter((orderList) => orderList.id !== id)
    setInputList(filterList)
  }
  console.log(inputList)
    return (
      <div>
        <input
          type="text"
          onChange={saveInput}
          value={input}
        />
        <button onClick={addNewItem}> Add Item </button>
        {inputList.map((inputList) => {
          return(
            <li>
              {inputList.text}
              <button onClick={() => handleDelete(inputList.id)}>Delete</button>
              </li>
          )
        })}
      </div>
    );
  }
  export default TodoList