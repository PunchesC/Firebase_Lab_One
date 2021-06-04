import { useContext } from "react";
import {AuthContext} from "../context/auth-context";
import { signInWithGoogle, signOut } from "../firebaseConfig";


function Header() {
  const {user} = useContext(AuthContext);


  return (
 <header className="Header">
<button onClick={signInWithGoogle}>Sign in with Google</button>
<button onClick={signOut}>Sign out</button>
{ user && <div>
  Welcome {user.displayName}!
  </div>}
 </header>
  )
}
export default Header;