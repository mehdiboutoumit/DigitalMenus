import React, { useState } from 'react'

function ContactSupport() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to submit the form data to the server or perform any other necessary actions
    // For simplicity, let's just log the form data for now
    console.log("subject:", subject);
    console.log("Message:", message);
    // Reset the form fields
    setSubject("");
    setMessage("");
  };
  return (
<div className="container" style={{ textAlign: "center" }}>
      <h2 style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#FF5722",
          marginBottom: "20px",
          textTransform: "uppercase"
        }}>Contacter le Support 212</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="subject">subject:</label>
          <input
          className="form-control"
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label" htmlFor="message">Message:</label>
          <textarea
          className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button className='btn btn-primary' type="submit">Envoyer</button>
      </form>
    </div>  )
}

export default ContactSupport;