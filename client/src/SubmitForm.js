import React, { useState } from 'react'
import Axios from 'axios'

const SubmitForm = () => {

  const [formData, setFormData] = useState({
    date: "",
    message: ""
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3004/information", {
      date: formData.date,
      message: formData.message
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    setFormData({
      date: "",
      message: ""
    })
    window.location.reload();
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleAutoDate () {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData(prevState => ({ ...prevState, date: formattedDate }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input type="text" name="date" value={formData.date} onChange={handleChange} />
        <button type="button" onClick={handleAutoDate}>Auto-fill Date</button>
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default SubmitForm;