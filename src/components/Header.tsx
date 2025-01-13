import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <label style={{ fontSize: "1.2rem", fontWeight: 700 }}>Hash Miner</label>
      <label style={{ fontSize: "1rem", fontWeight: 500, marginLeft: "auto" }}>
        Hello Admins! 😉
      </label>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  background-color: #1d1d1d;
  height: fit-content;
  border-radius: 10px;
`;

export default Header;
