import React from 'react';
//import Button from './button';
import Edit from '../edit.png';
import Del from '..//delete.png';
import Input from './input';
import Tick from '../tick.png';
import Cross from '../cross.png';
import FlipMove from 'react-flip-move';

const GenerateParticularListItem = React.forwardRef((props,ref) => {  
  return props.tasklist.map(item => { 
    if(item.toedit === true){
      return (
      <div id="particularItem" >
        <Input className="inputdis names" type="text" defaultValue={item.value} ref={ref}></Input>
        <div className="buttons" onClick={() => props.onEditOk(item.id)}><img src={Tick} alt="Ok"/></div>
        <div className="buttons" onClick={() => props.onEditCancel(item.id)}><img src={Cross} alt="cancel"/></div>
      </div>);}
    else if(item.status === true){
      return (
      <div id="particularItem" className = "completed">
        <div className="names">{item.value}</div>
        <div className = "buttons disable-button"><img  src={Edit} alt="edit"/></div>
        <div className="buttons" onClick={() => props.onDelete(item.id)}><img src={Del} alt="delete"/></div>
        <div className = "buttons disable-button"><input id="itemCheckBox" type="checkbox" className = "disable-button" checked disabled/></div>
      </div>);}
    else {
      return (
      <div id="particularItem" >
        <div className="names">{item.value}</div>
        <div className="buttons" onClick={() => props.onEdit(item.id)}><img src={Edit} alt="edit"/></div>
        <div className="buttons" onClick={() => props.onDelete(item.id)}><img src={Del} alt="delete"/></div>
        <div className="buttons" onClick={() => props.onStatus(item.id)}><input type="checkbox"/></div>
      </div>);}
    });
  });

  export default GenerateParticularListItem;