import axios from "axios";
import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

type State = {
  users: number;
  loading: boolean;
  pending: number;
  balance: {value: number; loading: boolean};
};

type Props = {
  price: number;
  loading: boolean;
};

function Info({price, loading}: Props) {

  const [state, setState] = useState<State>({
    users: 0,
    loading: false,
    pending: 0,
    balance: {value: 0, loading: false},
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

    const fetchBalance = async () => {
      try {
        setState((prev) => ({...prev, balance: {...prev.balance, loading: true}}));
        const response = await axios.get("https://hash-miner-backend.vercel.app/api/auth/get-balance");
        setState((prev) => ({...prev, balance: {...prev.balance, value: response.data.balance}}));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setState((prev) => ({...prev, balance: {...prev.balance, loading: false}}));
      }
    };

    fetchData();
    fetchBalance();
  }, []); 
  
  return (
    <Container>
      <Card style={{ backgroundColor: "#2C89DC" }}>
        <Content>{loading ? <MoonLoader size={24} color="white" /> : price }</Content>
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
        <Content>{state.balance.loading ? <MoonLoader size={24} color="white" /> : state.balance.value }</Content>
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
