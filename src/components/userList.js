import { useState, useEffect } from "react";
import UserListItem from "./userListItem";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { Button } from "@mui/material";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await fetch("https://api.github.com/users")
          .then((res) => res.json())
          .then((data) => setUserList(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCLick = (pagination) => {
    setPage(pagination);
  };

  const handleNext = () => {
    if (page < userList.length / 10) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="userPage">
        {error && <div>Error: {error}</div>}
        {loading && <div>Content Loading...</div>}

        {userList.length > 0 &&
          userList.slice(page * 10 - 10, page * 10).map((user, index) => {
            return <UserListItem key={user.id} user={user}/>;
          })}
      </div>
      {userList.length > 0 && (
        <div className="pageDiv">
          <Button
            className="pagination"
            variant="contained"
            startIcon={<SkipNext />}
            onClick={() => handleNext()}
          ></Button>
          {[...Array(userList.length / 10)].map((_, i) => {
            return (
              <span
                className={`pagination ${
                  page === i + 1 ? "selected" : "notSelected"
                }`}
                onClick={() => handleCLick(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <Button
            className="pagination"
            variant="contained"
            startIcon={<SkipPrevious />}
            onClick={() => handlePrev()}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
