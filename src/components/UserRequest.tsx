import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { TransactionType, UserRequestType } from "./Request";
import styled from "styled-components";
import axios from "axios";

type Props = {
  requests: UserRequestType[];
};

const RequestContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  background-color: #1d1d1d;
  border-radius: 5px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PendingCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  background-color: darkorange;
  font-weight: bold;
  border-radius: 50%;
  margin-left: auto;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ChevronContainer = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TransactionContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TransactionItem = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0.5rem;
  gap: 3rem;
  align-items: center;
  background-color: #2c2c2c;
  margin-top: 0.5rem;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: none;
  color: white;
  font-weight: bold;
`;

type TransactionProps = {
  transaction: TransactionType;
  userId: string;
};

function Transaction({ transaction, userId }: TransactionProps) {
    const [status, setStatus] = useState<"Completed" | "Pending" | "Failed">(transaction.status);
  
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value as "Completed" | "Pending" | "Failed";
      
      if (selectedValue === "Pending") return;
    
      setStatus(selectedValue);
    
      if (selectedValue === "Completed" || selectedValue === "Failed") {
        handleChangeStatus(selectedValue);
      }
    };

    const handleChangeStatus = async (value: "Completed" | "Pending" | "Failed") => {
      try{
        await axios.put(`https://hash-miner-backend.vercel.app/api/auth/transactions/${userId}/${transaction._id}`, {status: value});
      }catch{
        console.log('error')
      }
    };
  
    return (
      <TransactionContainer>
        <TransactionItem>
          <label>{transaction.type}</label>
          <label style={{ marginLeft: "auto" }}>{transaction.title}</label>
          <label>{transaction.date}</label>
          <label>{transaction.to}</label>
          <Select value={status} onChange={handleStatusChange} style={{backgroundColor: status === 'Completed' ? "limegreen" : status === 'Pending' ? "darkorange" : "crimson"}}>
            <option value="Pending" style={{ background: "white", color: "black" }}>
              Pending
            </option>
            <option value="Completed" style={{ background: "white", color: "black" }}>
              Completed
            </option>
            <option value="Failed" style={{ background: "white", color: "black" }}>
              Failed
            </option>
          </Select>
        </TransactionItem>
      </TransactionContainer>
    );
  }

function UserRequest({ requests }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {requests.map((request) => (
        <RequestContainer key={request._id}>
          <HeaderContainer>
            <Label>{request.username}</Label>
            <PendingCount>{request.pendingTransactions.length}</PendingCount>
            <Label>Pending Request</Label>
            <ChevronContainer onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faChevronDown} />
            </ChevronContainer>
          </HeaderContainer>
          {open &&
            request.pendingTransactions.map((trans) => (
              <Transaction key={trans._id} transaction={trans} userId={request._id} />
            ))}
        </RequestContainer>
      ))}
    </>
  );
}

export default UserRequest;
