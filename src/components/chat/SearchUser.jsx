import React, { useEffect, useState } from "react";
import "./searchUser.css";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/chat-slice";
const SearchUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);
  const filteredUsers = useSelector((state) => state.chat.filteredUsers);

  const searchHandler = (event) => {
    const value = event.target.value;
    if (value) {
      const filteredList = users.filter((user) => {
        return user?.name.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(chatActions.setUsers(filteredList));
    } else {
      dispatch(chatActions.setUsers(filteredUsers));
    }
  };

  return (
    <div className="searc_container">
      <div className="search_user_main">
        <input
          onChange={searchHandler}
          type="text"
          placeholder="Search here..."
        />
        <IoSearch className="user_search_icon" />
      </div>
    </div>
  );
};

export default SearchUser;
