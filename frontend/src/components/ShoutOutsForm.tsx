import "./ShoutOutsForm.css"
import { FormEvent, useState, useContext} from "react";
import ShoutOuts from "../model/shoutOuts"
import { AuthContext } from "../context/auth-context";



interface Props {
  onSubmit: (shoutout: ShoutOuts) => void;
}



function ShoutOutsForm({onSubmit}:Props){
  const {user} = useContext(AuthContext);
const [to, setTo]= useState("");
const from =user;
const [message, setMessage]= useState("")


function handleSubmit(event:FormEvent): void {
  event.preventDefault();
  const shoutout: ShoutOuts = {
    to: to,
    from: user,
    message: message
  }
  onSubmit(shoutout);

  setTo("");
 
  setMessage("")
}



  return (
    <form className="ShoutOutsForm" onSubmit={handleSubmit}>
      <h3>Leave a Shout Out</h3>
      <label htmlFor="ShoutOutsForm_to">To</label>
      <input id="ShoutOutsForm_to" type="text" value={to} onChange={e => setTo(e.target.value)} required/>
      <label htmlFor="ShoutOutsForm_from">From</label>
      <input id="ShoutOutsForm_from" type="text" value={from} required />
     
      <label htmlFor="ShoutOutsForm_message">Shout It Out!!!</label>
      <textarea id="ShoutOutsForm_message" value={message} onChange={e => setMessage(e.target.value)} rows={7} required/>
    <button type="submit">Let'em know!!!</button>  
    </form>
  )
}

export default ShoutOutsForm;
