import logo from "./logo.svg";
import "./App.css";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";

function App() {
  // Hooks
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const session = useSession(); // Current active token is stored inside of the session. When a session exits, we have a user
  const supabase = useSupabaseClient(); // Access client
  const { isLoading } = useSessionContext();

  // Handles "flickering" of app
  if (isLoading) {
    return <></>;
  }

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

  // Debugging:
  console.log(session);
  console.log(startDate);
  console.log(endDate);

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {/* If a session exists, show welcome text. Else, show login button*/}
        {session ? (
          <>
            <h2>Welcome back, {session.user.email}!</h2>
            <p>Starts</p>
            <DateTimePicker value={startDate} onChange={setStartDate} />
            <p>Ends</p>
            <DateTimePicker value={endDate} onChange={setEndDate} />
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
