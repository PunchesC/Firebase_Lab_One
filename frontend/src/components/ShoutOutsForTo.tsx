import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle } from "../firebaseConfig";
import ShoutOuts from "../model/shoutOuts";
import {createShoutOut, deleteShoutOut, readShoutOutsForTo} from "../service/ShoutOutsApiService";
import ShoutOutCard from './ShoutOutCard';
import ShoutOutsForm from "./ShoutOutsForm";
import './ShoutOutsList.css';

interface RouteParams {
  to:string
}

function ShoutOutsForTo(){
  const {to} = useParams<RouteParams>() ;
  // array of students from the API
  const [ shoutOuts, setShoutOuts ] = useState<ShoutOuts[]>([]);
  const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);
  const {user} = useContext(AuthContext);

  // useEffect runs once when our componet loads.
  useEffect(() => {
    // load our initial data here.
    // loadShoutOuts();
  }, [to]);
  function loadShoutOuts() {
    readShoutOutsForTo(to).then(shoutOutsFromApi => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  } 
  function handleAddShoutOuts(shoutout: ShoutOuts): void{
    createShoutOut(shoutout).then(loadShoutOuts)
  }

  function handleDeleteShoutOuts(shoutOutId: string): void{
    deleteShoutOut(shoutOutId).then(loadShoutOuts)
  }


  return (
    <div className="ShoutOutsList">
    <div className="ShoutOutsList_form">
      <h2>Let'em Know!!</h2>
      {!user ? ( <button  className="ShoutOutList_sign_in"onClick={signInWithGoogle}>Sign in with Google</button>
    ) : (
    <ShoutOutsForm onSubmit={handleAddShoutOuts}/>
    )}
    </div>
    <div className="ShoutOutsList_list_cards">
      { !shoutOutsLoaded ? 
      <p className="ShoutOutsList_message">Loading...</p>  
      : shoutOuts.length === 0 ?
      <p className="ShoutOutsList_message">No ShoutOuts</p>
      :
     shoutOuts.slice(0).reverse().map(eachShoutOut => 
     
     <ShoutOutCard key={eachShoutOut._id} shoutouts={eachShoutOut} onDelete={()=>handleDeleteShoutOuts(eachShoutOut._id!)}/>
      )
    }
  </div>
    </div>
  )


}

export default ShoutOutsForTo;