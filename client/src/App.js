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
  const [eventName, setEventName] = useState("");

  const [eventDescription, setEventDescription] = useState("");
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

  // Function to handle creating an event
  // Documentation: https://developers.google.com/calendar/api/v3/reference/events/insert
  async function createEvent() {
    console.log("Event created"); // Debugging
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get time zone from user's machine
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get time zone from user's machine
      },
    };

    // Fetch request
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Google access token
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json;
      })
      .then((data) => {
        console.log(data); // Debugging
        alert("Event created! Check Google Calendar.");
      });
  }

  // Debugging:
  console.log(session);
  console.log(startDate);
  console.log(endDate);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {/* If a session exists, show welcome text. Else, show login button*/}
        {session ? (
          <>
            <h2>Welcome back, {session.user.email}!</h2>
            <p>Event Name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event Description</p>
            <input
              type="text"
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <p>Starts</p>
            <DateTimePicker value={startDate} onChange={setStartDate} />
            <p>Ends</p>
            <DateTimePicker value={endDate} onChange={setEndDate} />
            <p />
            <button onClick={() => createEvent()}>Create event</button>
            <p />
            <hr />
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
