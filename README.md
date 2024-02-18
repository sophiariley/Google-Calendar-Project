# Google Calendar Project
Created by: Sophia Riley

## Overview
This React application facilitates the creation of events in Google Calendar using Supabase authentication. Users can sign in with their Google account, input event details such as name, description, start, and end times, and create events.

## Technologies Used
- **React**: The frontend framework for building the user interface.
- **Supabase**: Provides authentication-related hooks for React applications.
- **DateTimePicker**: A React component for selecting date and time.
- **Google Calendar API**: Used for creating events in the user's Google Calendar.

## Dependencies
- **'@supabase/auth-helpers-react'**: Provides authentication hooks and utilities for Supabase.
- **'react-datetime-picker'**: React component for selecting date and time.
- **'react-calendar'**: Calendar component for React.
- **'react-clock'**: Clock component for React.

## Functionality
- **Google Sign-In**: Users can sign in using their Google account, granting access to their Google Calendar.
- **Event Creation**: Users can input event details including name, description, start, and end times. Upon submission, the event is created in their Google Calendar.
- **Session Management**: The application handles session states, displaying a welcome message when a user is logged in and a sign-in button when not authenticated.
- **Error Handling**: Error messages are displayed in case of authentication or event creation failures.

## Usage
- **Sign In**: Click "Sign in with Google" to authenticate with Google.
- **Input Event Details**: Enter the event name, description, start, and end times.
- **Create Event**: Click "Create event" to add the event to your Google Calendar.
- **Sign Out**: Click "Sign out" to log out of the application.

## Notes
- Debugging messages are logged to the console for troubleshooting purposes.
- The application dynamically fetches the user's time zone to ensure accurate event scheduling.

## References
- **Google Calendar API**: https://developers.google.com/calendar/api/guides/overview
- **HTTP Requests**: https://developers.google.com/calendar/api/v3/reference/events/insert#http-request
- **Supabase Auth**: https://supabase.com/docs/guides/auth
- **Using Supabase Auth with React**: https://supabase.com/docs/guides/auth/quickstarts/react
- **OAuth**: https://developers.google.com/identity/protocols/oauth2

## TO-DO
- Update UI
- Create demonstration video
