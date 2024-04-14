import React from "react";
import { Link } from "react-router-dom";

const UserListItem = ({ user }) => {
  return (
    <div className="user" key={user.id} >
      <Link to={`/user/${user.login}`}>

          <img src={user.avatar_url} alt={user.login} className="image" loading="lazy"/>
          <span>{user.login}</span>


      </Link>
    </div>
  );
}

export default UserListItem;
