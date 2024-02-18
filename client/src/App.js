import logo from "./logo.svg";
import "./App.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

function App() {
  // Hooks
  const session = useSession(); // Current active token is stored inside of the session. When a session exits, we have a user
  const client = useSupabaseClient(); // Access client

  // Function to handle signing into Google
  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });

    if (error) {
      alert("There was an error logging in. Please try again.");
      console.log(error);
    }
  }

  // Function to handle signing out of Google
  async function signOut() {
    await supabase.auth.signOut();
  }

  console.log(session); // Debugging

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {/* If a session exists, show welcome text. Else, show login button*/}
        {session ? (
          <>
            <h2>Welcome back, {session.user.email}!</h2>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <button onClick={() => googleSignIn()}>Sign in with Google</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
