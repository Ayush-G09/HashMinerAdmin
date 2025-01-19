import styled from 'styled-components';
import Header from '../components/Header';
import Info from '../components/Info';
import UpdatePrice from '../components/UpdatePrice';
import Miners from '../components/Miners';
import Request from '../components/Request';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

  const [state, setState] = useState<{price: number, loading: boolean}>({
    price: 0,
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({...prev, loading: true}));
        const response = await axios.get("https://hash-miner-backend.vercel.app/api/auth/get-prices?period=today");
        setState((prev) => ({...prev, price: response.data.prices[0].price}));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setState((prev) => ({...prev, loading: false}));
      }
    };

    fetchData();
  }, []); 

  const updatePrice = (price: number) => {
    setState((prev) => ({...prev, price}));
  };

  return (
    <Container>
       <Header/>
        <Info price={state.price} loading={state.loading}/>
        <UpdatePrice updatePrice={updatePrice}/>
        <Miners/>
        <Request/>
    </Container>
  )
};

const Container = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
overflow-y: scroll;
scroll-behavior: smooth;
box-sizing: border-box;
padding: 1rem;
display: flex;
gap: 1rem;
flex-direction: column;
color: white;

scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Dashboard;