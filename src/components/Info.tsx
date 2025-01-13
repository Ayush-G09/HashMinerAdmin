import axios from "axios";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

type State = {
  users: number;
  loading: boolean;
  pending: number;
};

function Info() {
  const [state, setState] = useState<State>({
    users: 0,
    loading: false,
    pending: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({...prev, loading: true}));
        const response = await axios.get("https://hash-miner-backend.vercel.app/api/auth/statistics");
        setState((prev) => ({...prev, users: response.data.data.totalUsers, pending: response.data.data.totalPendingTransactions}));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setState((prev) => ({...prev, loading: false}));
      }
    };

    fetchData();
  }, []); 
  
  return (
    <Container>
      <Card style={{ backgroundColor: "#2C89DC" }}>
        <Content>50</Content>
        <Title>Hash Coin Price</Title>
      </Card>
      <Card style={{ backgroundColor: "#6761DA" }}>
        <Content>{state.loading ? <MoonLoader size={24} color="white" /> : state.pending }</Content>
        <Title>Pending Request</Title>
      </Card>
      <Card style={{ backgroundColor: "#EBA11C" }}>
        <Content>{state.loading ? <MoonLoader size={24} color="white" /> : state.users }</Content>
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
