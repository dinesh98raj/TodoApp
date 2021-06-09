import { useState, useRef, useEffect } from 'react';
import Del from './delete.png';
import Edit from './edit.png';
import './App.css';

function App() {
 
  const inputRef = useRef();
  const [list, setlist] = useState([]);
  let editname;

  useEffect(()=>{
    //localStorage.setItem('listOfTask', JSON.stringify(list));
    console.log("useeffect called");
    updateFromLS();
  }, []);

  useEffect(()=>{
    console.log("useeffect 2");
    localStorage.setItem('listOfTask', JSON.stringify(list));
  },[list]);

  const updateFromLS = () =>{
    console.log("updateFromLS called");
    let stringtsk = localStorage.getItem('listOfTask');
    let objtsk = JSON.parse(stringtsk);
    console.log(objtsk);
    if(objtsk)
      setlist(objtsk);
  }

  const updateList = () =>{
    console.log("from updatelist");
    console.log(inputRef.current.value);
    console.log(list.length);
    let regexOnlyWhiteSpace = new RegExp(/^\s+$/);
    let regexTrailingWhiteSpace = new RegExp(/^\s+.*/);

    if(regexTrailingWhiteSpace.test(inputRef.current.value)){
      if(regexOnlyWhiteSpace.test(inputRef.current.value))
        alert("you cant enter only space");
      else{
        alert("trailing spaces are not allowed");
        inputRef.current.value = inputRef.current.value.trim();
      } 
    }else{
      if(inputRef.current.value){
        console.log("from if of update");
        let temp={id:Math.random()*6, value:inputRef.current.value.trim(), status:false, toedit:false};
        console.log(temp);
        setlist([...list].concat(temp));
        inputRef.current.value = "";
        //localStorage.setItem('listOfTask', JSON.stringify(list));
      }
      else{
      alert("enter something!");
    }
  }
    /*let inputfield = document.getElementById("input");
    let value = inputfield.value;
    setlist(list.concat(value));
    inputfield.value = "";*/
  }
  
  function handleDelete(id){
    console.log("from delete handle");
    console.log(id);
    let confirmation = window.confirm("Are you sure want to delete?");
    if(confirmation)
      setlist([...list].filter(item => item.id !== id));
    console.log(list);
  }

  function handleEdit(item){
    console.log("from edit handle");
    console.log(item);
    setlist([...list].map( i => { if(i.id === item){
                                    console.log("match found");
                                    return {...i,toedit:true}
                                  }
                                else{
                                    return i
                                  }}));
  }
 
  function handleStatus(item){
    console.log("from status handle");
    console.log(item);
    setlist([...list].map( i => { if(i.id === item){
                                      console.log("match found");
                                      return {...i,status:true}
                                    }
                                  else{
                                    return i
                                  }}));
  }

  function handleEditOk(item){
    console.log("from Edit ok handle");
    console.log(item);
    setlist([...list].map( i => { if(i.id === item){
                                      console.log("match found");
                                      return {...i, value:editname, toedit:false}
                                    }
                                  else{
                                    return i
                                  }}));
  }

  function handleEditCancel(item){
    console.log("from Edit Cancel handle");
    console.log(item);
    setlist([...list].map( i => { if(i.id === item){
                                      console.log("match found");
                                      return {...i, toedit:false}
                                    }
                                  else{
                                    return i
                                  }}));
  }

  function handleEditName(e, id){
    console.log("from edit name handle");
    console.log(id);
    console.log(e);
    editname = e.target.value;
    //settemptoedit(e.target.value);
  }

  function GenerateListContainer(){
    return (<div id="flexContainer">
              <GenerateParticularListItem/>
            </div>);
  }

  /*function GenerateHeaderofList(){
    return (<div id="particularList">
                <div id="listName">Name</div>
                <div id="listEdit">Edit</div>
                <div id="listDelete">Delete</div>
                <div id="listStatus">Status</div>
            </div>);
  }*/

  function GenerateParticularListItem(){  
        return list.map(item => { if(item.toedit === true){
                                      console.log(item.toedit);
                                      return (<div id="particularItem" >
                                                <div id="editName"><input type="text" Value={item.value} onChange={(e)=> handleEditName(e, item.id)}></input></div>
                                                <div id="editOk" onClick={() => handleEditOk(item.id)}><button>ok</button></div>
                                                <div id="editCancel" onClick={() => handleEditCancel(item.id)}><button>cancel</button></div>
                                              </div>);
                                   }
                                  else if(item.status === true){
                                    console.log(item.status);
                                    return (<div id="particularItem" className = "completed">
                                                <div id="itemName">{item.value}</div>
                                                <div id="itemEdit" className = "disable-button"><img  src={Edit} alt="edit"/></div>
                                                <div id="itemDelete" onClick={() => handleDelete(item.id)}><img src={Del} alt="delete"/></div>
                                                <div id="itemStatus" className = "disable-button"><input type="checkbox" className = "disable-button" checked disabled/></div>
                                              </div>);

                                    }
                                    else {
                                      console.log(item.status);
                                      return (<div id="particularItem" >
                                                <div id="itemName">{item.value}</div>
                                                <div id="itemEdit" onClick={() => handleEdit(item.id)}><img src={Edit} alt="edit"/></div>
                                                <div id="itemDelete" onClick={() => handleDelete(item.id)}><img src={Del} alt="delete"/></div>
                                                <div id="itemStatus" onClick={() => handleStatus(item.id)}><input type="checkbox"/></div>
                                              </div>);
                                   }
                                  }
                      );
  }

  return (
    <div className="App">
        <h1>to do list</h1>
        <form>
          <input id="add-input" type="text" ref={inputRef} /*id="input"*/></input>
          <button id="add-button" onClick={updateList}>add</button>  
        </form>
        
        { list.length ? <GenerateListContainer/> : ""}
    </div>
  );
}

export default App;
