import React from "react";
import styled from "styled-components";

function Info() {
  return (
    <Container>
      <Card style={{ backgroundColor: "#2C89DC" }}>
        <Content>50</Content>
        <Title>Hash Coin Price</Title>
      </Card>
      <Card style={{ backgroundColor: "#6761DA" }}>
        <Content>10</Content>
        <Title>Pending Request</Title>
      </Card>
      <Card style={{ backgroundColor: "#EBA11C" }}>
        <Content>13</Content>
        <Title>Total Users</Title>
      </Card>
      <Card style={{ backgroundColor: "#D04A4A" }}>
        <Content>220000</Content>
        <Title>Total Balance</Title>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Card = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 10px;
  gap: 0.5rem;
  box-shadow: 0px 0px 10px 0px rgba(225, 225, 225, 0.5);
`;

const Content = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Title = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

export default Info;
