import React, { useState } from "react";

function App() {
  const [emails, setEmails] = useState([])
  // front end
  async () => await fetch("http://localhost:9000/emails")
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      setEmails(data)
    });

    console.log(emails)
  return (
    <div>
      <h1>hello {emails} </h1>
    </div>
  );
}

export default App;
