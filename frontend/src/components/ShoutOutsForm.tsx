import "./ShoutOutsForm.css"
import { FormEvent, useState } from "react";
import ShoutOuts from "../model/shoutOuts"


interface Props {
  onSubmit: (shoutout: ShoutOuts) => void;
}

function ShoutOutsForm({onSubmit}:Props){
const [to, setTo]= useState("");
const [from, setFrom]= useState("")
const [message, setMessage]= useState("")

function handleSubmit(event:FormEvent): void {
  event.preventDefault();
  const shoutout: ShoutOuts = {
    to: to,
    from: from,
    message: message
  }
  onSubmit(shoutout);

  setTo("");
  setFrom("");
  setMessage("")
}

  return (
    <form className="ShoutOutsForm" onSubmit={handleSubmit}>
      <h3>Leave a Shout Out</h3>
      <label htmlFor="ShoutOutsForm_to">To</label>
      <input id="ShoutOutsForm_to" type="text" value={to} onChange={e => setTo(e.target.value)} required/>
      <label htmlFor="ShoutOutsForm_from">From</label>
      <input id="ShoutOutsForm_from" type="text" value={from} onChange={e => setFrom(e.target.value)} required/>
      <label htmlFor="ShoutOutsForm_message">Shout It Out!!!</label>
      <input id="ShoutOutsForm_message" type="text" value={message} onChange={e => setMessage(e.target.value)} required/>
    <button type="submit">Let'em know!!!</button>  
    </form>
  )
}

export default ShoutOutsForm;
