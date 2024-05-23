import nano from "nano";
const notehost = nano('http://localhost:5984');
const notelst = notehost.use('remix_notes_t');