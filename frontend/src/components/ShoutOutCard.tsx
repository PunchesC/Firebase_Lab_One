import ShoutOuts from "../model/shoutOuts";
import './ShoutOutCard.css'


interface Props{
  shoutouts: ShoutOuts;
  onDelete:() => void;
}


function ShoutOutCard({shoutouts, onDelete}:Props){

return (
  <div className="ShoutOutCard">
    <div className="ShoutOutCard_top">
    <h3>Shout out to {shoutouts.to}</h3>
    <p>-from {shoutouts.from}</p>
    </div>
    <div>
      {!!shoutouts.image && <p>
        <img className="ShoutOutCard_photo" src={shoutouts.image} alt="image for desire user" />
        </p>}
    </div>
    <div className="ShoutOutCard_message">
      {shoutouts.message}
    </div>
    <button onClick={onDelete}>Don't Let'em Know</button>
  </div>
)

}
export default ShoutOutCard;