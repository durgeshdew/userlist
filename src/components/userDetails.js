import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="details">
      <h1>User Details</h1>
      <div className="childDetails">
        <h2>{user.name}</h2>
        <img src={user.avatar_url} alt={user.login} style={{"width": "200px"}}/>
      </div>
      <div className="childDetails">
        <p>Location: {user.location}</p>
        <p>Company: {user.company}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <a href={user.html_url}>GitHub Profile</a>
      </div>
    </div>
  );
};

export default UserDetails;
