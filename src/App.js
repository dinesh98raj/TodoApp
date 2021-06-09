import { useState, useRef, useEffect } from 'react';
import './App.css';
import Input from './components/input';
import GenerateParticularListItem from './components/GenerateParticularListItem';

function App() {
 
  const inputRef = useRef();
  const editRef = useRef();
  const [list, setlist] = useState([]);
  
  useEffect(()=>{
    let stringtsk = localStorage.getItem('listOfTask');
    let objtsk = JSON.parse(stringtsk);
    if(objtsk)
      setlist(objtsk);
  }, []);

  useEffect(()=>{
    localStorage.setItem('listOfTask', JSON.stringify(list));
  },[list]);

  const updateList = () =>{
    let regexOnlyWhiteSpace = new RegExp(/^\s+$/);
    let regexTrailingWhiteSpace = new RegExp(/^$|^\s+.*/);

    if(regexTrailingWhiteSpace.test(inputRef.current.value)){
      if(regexOnlyWhiteSpace.test(inputRef.current.value))
        alert("you cant enter only space");
      else{
        if(inputRef.current.value){
          alert("trailing spaces are not allowed");
          inputRef.current.value = inputRef.current.value.trim();
        }
        else
         alert("enter something!");
      } 
    }else{
        let temp={id:Math.random()*6,
                  value:inputRef.current.value.trim(),
                  status:false, toedit:false};
        setlist([...list].concat(temp));
        inputRef.current.value = "";

  }
  }
  
  function validateinput(str, strRef){
    let regexOnlyWhiteSpace = new RegExp(/^\s+$/);
    let regexTrailingWhiteSpace = new RegExp(/^$|^\s+.*/);

    if(regexTrailingWhiteSpace.test(str)){
      if(regexOnlyWhiteSpace.test(str)){
        alert("you cant enter only space");
        return false;
      }
      else{
        if(str){
          alert("trailing spaces are not allowed");
          strRef.current.value = strRef.current.value.trim();
          return false;
        }
        else{
          alert("enter something!");
          return false;
        }
      } 
    }else
      return true;
  }

  function handleDelete(id){
    let confirmation = window.confirm("Are you sure want to delete?");
    if(confirmation)
      setlist([...list].filter(item => item.id !== id));
  }

  function handleEdit(item){
    
    setlist([...list].map( i => { 
      if(i.id === item){
        return {...i,toedit:true};
      }
      else
        return i;
      }));
  }
 
  function handleStatus(item){
    setlist([...list].map( i => { 
      if(i.id === item){
        return {...i,status:true};
      }
      else
        return i;
      }));
  }

  function handleEditOk(item){
    if(validateinput(editRef.current.value, editRef) === true){
      setlist([...list].map( i => {
        if(i.id === item){
         return ({...i,
                value:editRef.current.value.trim(), 
                toedit:false });
       }
       else
         return i
       })); 
    }
  }

  function handleEditCancel(item){
    setlist([...list].map( i => {
       if(i.id === item){
          return {...i, toedit:false};
        }
        else
          return i;
      }));
  }

  function GenerateListContainer(){
    return (<div id="flexContainer">
              <GenerateParticularListItem
               tasklist={list}
               onDelete={handleDelete}
               onEdit={handleEdit}
               onStatus={handleStatus}
               onEditOk={handleEditOk}
               onEditCancel={handleEditCancel}
               ref={editRef}/>
            </div>);
  }

  return (
    <div className="App">
        <h1>to do list</h1>
        <form>
          <Input id="add-input" type="text" ref={inputRef} placeholder="enter your task"></Input>
          <button id="add-button" onClick={updateList}>add</button>  
        </form>      
        { list.length ? <GenerateListContainer/> : ""}
    </div>
  );
}

export default App;
