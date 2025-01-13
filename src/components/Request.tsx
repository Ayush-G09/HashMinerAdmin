import React from "react";
import UserRequest from "./UserRequest";
import styled from "styled-components";

function Request() {
  return (
    <Container>
      <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Withdraw Request
      </label>
      <UserRequest />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export default Request;
