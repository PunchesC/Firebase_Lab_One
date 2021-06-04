import { useContext } from "react";
import {AuthContext} from "../context/auth-context";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import './Header.css'


function Header() {
  const {user} = useContext(AuthContext);

  
  let addClass = "";
  if (user){
    addClass =" noDisplay"
  }

  let addSignOutClass ="";
  if(!user){
    addSignOutClass=" noDisplay"
  }

  return (
 <header className="Header">
<button className={"ShoutOutList_sign_in" + addSignOutClass}onClick={signOut}>Sign out</button>   
{/* <button className={"ShoutOutList_sign_in" + addClass}onClick={signInWithGoogle}>Sign in with Google</button> */}
{ user && <div>
  Welcome {user.displayName}!
  {/* { !!user.photoURL && 
  <p><img src={user.photoURL} alt="" /></p>
  } */}
  
  </div>}
 </header>
  )
}
export default Header;