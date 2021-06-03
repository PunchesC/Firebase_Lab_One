import React, { useEffect, useState } from "react";
import ShoutOuts from "../model/shoutOuts";
import {createShoutOut, readAllShoutOuts} from "../service/ShoutOutsApiService";
import ShoutOutCard from './ShoutOutCard';
import ShoutOutsForm from "./ShoutOutsForm";
import './ShoutOutsList.css';


function ShoutOutsList(){
  // array of students from the API
  const [ shoutOuts, setShoutOuts ] = useState<ShoutOuts[]>([]);
  const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);

  // useEffect runs once when our componet loads.
  useEffect(() => {
    // load our initial data here.
    loadShoutOuts();
  }, []);
  function loadShoutOuts() {
    readAllShoutOuts().then(shoutOutsFromApi => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  } 
  function handleAddShoutOuts(shoutout: ShoutOuts): void{
    createShoutOut(shoutout).then(loadShoutOuts)
  }


  return (
    <div className="ShoutOutsList">
      <h2>All Shout Outs</h2>
      { !shoutOutsLoaded ? 
      <p className="ShoutOutsList_message">Loading...</p>  
      : shoutOuts.length === 0 ?
      <p className="ShoutOutsList_message">No ShoutOuts</p>
      :
     shoutOuts.map(eachShoutOut => 
     <ShoutOutCard key={eachShoutOut._id} shoutouts={eachShoutOut}/>
      )
    }
    <ShoutOutsForm onSubmit={handleAddShoutOuts}/>
    </div>
  )


}

export default ShoutOutsList;