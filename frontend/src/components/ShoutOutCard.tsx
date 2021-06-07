import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import ShoutOuts from "../model/shoutOuts";
import './ShoutOutCard.css'


interface Props{
  shoutouts: ShoutOuts;
}


function ShoutOutCard({shoutouts}:Props){
  const {user} = useContext(AuthContext);
return (
  <div className="ShoutOutCard">
    <div className="ShoutOutCard_top">
    <h3>Shout out to {shoutouts.to}</h3>
    <p>-from {user}</p>
    </div>
    <div className="ShoutOutCard_message">
      {shoutouts.message}
    </div>
  </div>
)

}
export default ShoutOutCard;