import React from "react";
import styled from "styled-components";

function UpdatePrice() {
  return (
    <Container>
      <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Update Coin Price
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Input />
        <Button>Update</Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 1rem;
  gap: 1rem;
`;

const Input = styled.div`
  outline: none;
  width: 10%;
  height: 40px;
  border: 2px solid #252525;
  border-radius: 10px;
  background-color: #1d1d1d;
  color: white;
  font-size: 1rem;
  padding: 0rem 0.5rem;
`;

const Button = styled.div`
  width: fit-content;
  height: 40px;
  border-radius: 5px;
  background-color: #2c89dc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 0.5rem;
  cursor: pointer;
`;

export default UpdatePrice;
