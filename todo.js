import React, { useEffect, useState } from "react";
import "./style.css";

// get local storage data
const getLocalData = () =>{
   const lists = localStorage.getItem("mytodolist");

   if (lists){
    return JSON.parse(lists);
   } else {
    return [];
   }
};

const Todo = () =>{
  const [inputdata, setInputData] = useState();
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

// add item function
  const addItem = () =>{
    if(!inputdata){
      alert("Pls fill the data")
    }else if(inputdata && toggleButton){
      setItems(
        items.map((curElem)=>{
        if (curElem.id=== isEditItem){
            return{ ...curElem, name:inputdata}
        }
        return curElem;
      })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData={
        id:new Date().getTime().toString(),
        name:inputdata,
      };
      setItems([...items,myNewInputData]);
      setInputData("");
    }
  };

  //edit items

  const editItem = (index) =>{
    const item_todo_edited = items.find((curElem) =>{
      return curElem.id === index;
    });
    
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);

  };

  //how to delete Item
  const deleteItem = (index) =>{
    const updatedItems = items.filter((curElem)=>{
      return curElem.id !== index;
    });
    setItems(updatedItems);

  };
  // remove all

  const removeAll = () =>{
    setItems([]);
  };

  useEffect(() =>{
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

    return(
        <>
        <div className="main-div"></div>
          <div className="child-div">
            <figure>
                <img src="./images/todo.jpg" alt="todologo"></img>
                <figcaption>Add Your List Here ✌</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder="✍ Add Items" 
                className="form-control"
                value={inputdata}
                onChange={(e)=> setInputData(e.target.value)}
                />
                {toggleButton?
                  (<i className="fa fa-edit add-btn" onClick={addItem}></i>)
                  :(<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                }
            </div>

           {/*show our items*/}
           <div className="showItems">
             {
              items.map((curElem)=>{
                  return (
                    <div className="eachItem" key={curElem.id}>
              <h3>{curElem.name}</h3>
              <div className="todo-btn">
              <i className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
              <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
              </div>
            </div>

                  );
              })
             }
            
           </div>
           {/*Remove All Button*/}


            <div className="showItems">
              <button className="btn effect04" data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> Check List</span></button></div>
          </div>
        </>
    );
};
export default Todo;