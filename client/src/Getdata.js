import './Getdata.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Getdata () {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedMessage, setUpdatedMessage] = useState("");

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


  // const inputRef = useRef(null);

  // const setInputWidth = () => {
  //   const input = inputRef.current;
  //   if (input) {
  //     const inputWidth = input.value.length * 8; // adjust the factor to your liking
  //     input.style.width = `${inputWidth}px`;
  //   }
  // };

  // useEffect(() => {
  //   setInputWidth();
  // }, [updatedMessage]);


  return (
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
  );
}

export default Getdata;
