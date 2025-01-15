import axios from "axios";
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

type Props = {
  updatePrice: (price: number) => void;
};

function UpdatePrice({updatePrice}: Props) {

  const [state, setState] = useState<{price: number, loading: boolean}>({price: 0, loading: false});

  const handleUpdatePrice = async () => {
    if(!state.price){
      return;
    };
    if(state.loading){
      return;
    };
    try{
      setState((prev) => ({...prev, loading: true}));
      await axios.post('https://hash-miner-backend.vercel.app/api/auth/update-price', {price: state.price});
      updatePrice(state.price);
      setState((prev) => ({...prev, price: 0}));
    }catch{
      console.log('error');
    }finally{
      setState((prev) => ({...prev, loading: false}));
    }
  };

  return (
    <Container>
      <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Update Coin Price
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Input disabled={state.loading} type='number' value={state.price === 0 ? '' : state.price} onChange={(e) => setState((prev) => ({...prev, price: parseInt(e.target.value)}))} />
        <Button onClick={handleUpdatePrice}>{state.loading ? <MoonLoader size={15} color="white" /> : 'Update'}</Button>
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

const Input = styled.input`
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
