'use client'

import React, { useState } from 'react'

const ContactUs = () => {

    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        message:""
    })   

    function handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;

        setUser((prevUser) => ({...prevUser, [name] : value}));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method:'POST',
                headers:{"Content_Type":"application/json"},
                body: JSON.stringify({
                    username:user.username,
                    email:user.email,
                    phone:user.phone,
                    message:user.message
                })
            })
            // Set the status based on the response from the API route
            if (response.status === 200) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                setStatus('success');
            } else {
                setStatus('error');
            }

        }catch (e) {
            console.log(e)
        }

    }
    
  return (
    <div>
        <div>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                    <input type="text" 
                        id="username" 
                        name="username" 
                        value={user.username} 
                        onChange={handleChange} 
                        autoComplete="off" 
                        required 
                    />

                <label htmlFor="number">Phone Number:</label>
                    <input type="number" 
                        id="phone" 
                        name="phone" 
                        value={user.phone} 
                        onChange={handleChange} 
                        autoComplete="off" 
                        required 
                    />

                <label htmlFor="email">Email:</label>
                    <input type="email" 
                        id="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} 
                        autoComplete="off" 
                        required 
                    />

                <label htmlFor="message">Message:</label>
                <textarea id="message" 
                    name="message" 
                    value={user.message} 
                    onChange={handleChange} 
                    autoComplete="off" 
                    required>
                </textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ContactUs
