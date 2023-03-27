import './Getdata.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from 'axios'
function Getdata () {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    message: ""
  })


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post("http://localhost:3004/information", { //
        date: formData.date,
        message: formData.message,
      });
      console.log(response)
      setPosts([...posts, response.data]); // Add the new post to the existing posts array
      setFormData({
        date: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };



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





  useEffect(() => {
    axios.get('http://localhost:3004/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEdit = (post) => {

    setEditingPost(post);
    setUpdatedMessage(post.message);

  };



  const handleUpdate = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:3004/${postId}`, {
        message: updatedMessage
      });
      console.log(response.data); // prints { message: "Post updated successfully!" }
      setEditingPost(null);
      setPosts(posts.map(post => post._id === postId ? response.data : post));
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };


  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:3004/${postId}`);
      console.log(response.data); // prints { message: "Post deleted successfully!" }
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };
  const handleCancel = () => {
    setEditingPost(null);
  };

  return (
    <section>
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

      <div className='getdata'>
        <table>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <td>{post.date}</td>
                {editingPost && editingPost._id === post._id ? (
                  <>
                    <td className='ss'>
                      <input
                        className='inputText'
                        type="text"
                        value={updatedMessage}
                        onChange={(e) => setUpdatedMessage(e.target.value)}
                      />
                    </td>
                    <td><button onClick={() => handleUpdate(post._id)}>Save</button></td>
                    <td><button onClick={handleCancel}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{post.message}</td>
                    <td><button onClick={() => handleEdit(post)}>Edit</button></td>
                  </>
                )}
                <td><button onClick={() => handleDelete(post._id)}> - </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Getdata;
