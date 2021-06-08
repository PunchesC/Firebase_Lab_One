import "./ShoutOutsForm.css"
import { FormEvent, useState, useContext, useRef} from "react";
import ShoutOuts from "../model/shoutOuts"
import { AuthContext } from "../context/auth-context";
import firebase from "../firebaseConfig"



interface Props {
  onSubmit: (shoutout: ShoutOuts) => void;
}



function ShoutOutsForm({onSubmit}:Props){
  const {user} = useContext(AuthContext);
const [to, setTo]= useState("");
const [message, setMessage]= useState("")

const photoInputRef = useRef<HTMLInputElement>(null);
const formRef = useRef<HTMLFormElement>(null);



function handleSubmit(event:FormEvent): void {
  event.preventDefault();
 const shoutout: ShoutOuts = {
    to: to,
    from: user?.displayName,
    message: message
  }
  
  const files = photoInputRef.current?.files;
  if (files && files[0]) {
    const photoFile = files[0];
    console.log(photoFile);

    const rootFolder = firebase.storage().ref();
    const profilePhotosFolder = rootFolder.child("profile-photos");
    // First upload the file
    profilePhotosFolder.child(photoFile.name).put(photoFile).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        // Then save the student
        shoutout.image = url;
        onSubmit(shoutout);
        clearForm();
      });
    });
  } else {
    onSubmit(shoutout);
    clearForm();
  }
}

function clearForm() {
  setTo("");
  setMessage("")
  formRef.current?.reset();
}
 

  
  


  return (
    <form className="ShoutOutsForm" onSubmit={handleSubmit} ref={formRef}>
      <h3>Leave a Shout Out</h3>
      <label htmlFor="ShoutOutsForm_to">To</label>
      <input id="ShoutOutsForm_to" type="text" value={to} onChange={e => setTo(e.target.value)} required/>
      <label htmlFor="ShoutOutsForm_from">From</label>
      {user!.displayName}
      {/* <input id="ShoutOutsForm_from" type="text" value={from} required /> */}
     
      <label htmlFor="ShoutOutsForm_message">Shout It Out!!!</label>
      <textarea id="ShoutOutsForm_message" value={message} onChange={e => setMessage(e.target.value)} rows={7} required/>
    <label htmlFor="ShoutOutsForm_images">Images</label>
    <input id="ShoutOutsForm_images" type="file" title= " " ref={photoInputRef}></input>
    <button type="submit">Let'em know!!!</button>  
    </form>
  )
}

export default ShoutOutsForm;
