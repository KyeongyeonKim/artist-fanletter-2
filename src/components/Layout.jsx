import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "redux/modules/authSlice";
import styled from "styled-components";

function Layout() {
  const dispatch = useDispatch();
  return (
    <>
      <Header>
        <Link to="/">HOME</Link>
        <div>
          <Link to="/profile">내 프로필</Link>
          <Link onClick={() => dispatch(logout())}>로그아웃</Link>
        </div>
      </Header>
      <Outlet />
    </>
  );
}

export default Layout;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 30px;
  height: 30px;
  background-color: gray;
  user-select: none;
  & a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: white;
    }
  }
  & div a:nth-child(2) {
    margin-left: 30px;
  }
`;
