import React, { useEffect, useState } from "react";
import UserRequest from "./UserRequest";
import styled from "styled-components";
import axios from "axios";

export type TransactionType = {type: 'Coin' | 'Miner', title: string, date: string, status: "Completed" | "Pending", amount: number, to: string, _id: string};

export type UserRequestType = {_id: string, username: string, pendingTransactions: TransactionType[]};

type State = {
  requests: UserRequestType[];
};

function Request() {

  const [state, setState] = useState<State>({
    requests: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://hash-miner-backend.vercel.app/api/auth/user-pending-transactions");
        setState((prev) => ({...prev, requests: response.data.data}));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <Container>
      <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Withdraw Request
      </label>
      <UserRequest requests={state.requests} />
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
