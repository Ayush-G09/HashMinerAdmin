import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

function Miners() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
    <Container>
      <Header>
        <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Miners</label>
        <Button onClick={() => setModal(true)}>Add New Miner</Button>
      </Header>
      <Grid>
        <Card>
          <CardImgCon></CardImgCon>
          <label>Basic Miner</label>
          <label>
            hdjsvhc sduvbd dsubs njd cijsbdkvb jasdbcoinan SN c sdcv sd thrthrt
            fs e kjnksnd n n onb oihn nsb dniosdcvm nsoidnv j.
          </label>
          <Tag style={{ backgroundColor: "crimson" }}>Hash Rate: 1500 H/s</Tag>
          <Tag style={{ backgroundColor: "limegreen" }}>Price: $200</Tag>

          <ButtonCon>
            <Buttons style={{ backgroundColor: "#2C89DC" }}>Edit</Buttons>
            <Buttons style={{ backgroundColor: "crimson" }}>Delete</Buttons>
          </ButtonCon>
        </Card>
      </Grid>
    </Container>
    {modal && <Modal onClose={() => setModal(false)}><label>fg</label></Modal>}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const Button = styled.div`
  display: flex;
  width: fit-content;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: #2c89dc;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  width: fit-content;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
  background-color: #1d1d1d;
  border-radius: 10px;
  gap: 0.5rem;
`;

const CardImgCon = styled.div`
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 5px;
`;

const Tag = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 5px;
`;

const ButtonCon = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
`;

const Buttons = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
`;

export default Miners;
