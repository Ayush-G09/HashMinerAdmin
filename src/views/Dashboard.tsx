import styled from 'styled-components';
import Header from '../components/Header';
import Info from '../components/Info';
import UpdatePrice from '../components/UpdatePrice';
import Miners from '../components/Miners';
import Request from '../components/Request';

function Dashboard() {
  return (
    <Container>
       <Header/>
        <Info/>
        <UpdatePrice/>
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