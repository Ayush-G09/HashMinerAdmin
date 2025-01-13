import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import axios from "axios";
import AddMiner from "./AddMiner";
import { MoonLoader } from "react-spinners";

export type Miner = {
  name: string;
  desc: string;
  capacity: number;
  hashRate: number;
  image: string;
  price: number;
  _id: string;
};

type State = {
  miners: Miner[];
};

function Miners() {
  const [deleteModal, setDeleteModal] = useState<{value: boolean, id: string, loading: boolean}>({value: false, id: '', loading: false});
  const [modal, setModal] = useState<{value: boolean, type: 'Add' | 'Edit', miner?: Miner}>({value: false, type: 'Add'});
  const [state, setState] = useState<State>({
    miners: [],
  });

  useEffect(() => {
    axios
      .get("https://hash-miner-backend.vercel.app/api/auth/all-miners")
      .then((response) => {
        setState((prev) => ({ ...prev, miners: response.data.miners }));
      })
      .catch((error) => {
        console.error("Error fetching miners:", error);
      });
  }, []);

  const addMiner = (miner: Miner) => {
    setState((prev) => ({...prev, miners: [...state.miners, miner]}));
  };

  const handleDeleteModal = (id: string) => {
    setDeleteModal((prev) => ({...prev, value: true, id: id}));
  };

  const handleDeleteMiner = async () => {
    try{
      setDeleteModal((prev) => ({...prev, loading: true}));
      await axios.delete(`https://hash-miner-backend.vercel.app/api/auth/delete-miner/${deleteModal.id}`);
      const filteredMiners = state.miners.filter(miner => miner._id !== deleteModal.id);
      setState((prev) => ({...prev, miners: filteredMiners}));
      setDeleteModal((prev) => ({...prev, value: false}));
    }catch{
      alert('Error in deleting miner try again');
    }finally{
      setDeleteModal((prev) => ({...prev, loading: false}));
    }
  }; 

  const closeDeleteModal = () => {
    if(deleteModal.loading){
      return;
    };
    setDeleteModal((prev) => ({...prev, value: false, id: ''}));
  };

  const updateMiner = (updatedMiner: Miner) => {
    const oldMiners = state.miners.filter((mine) => mine._id !== updatedMiner._id); 
    setState((prev) => ({...prev, miners: [...oldMiners, updatedMiner]}));
  };

  return (
    <>
      <Container>
        <Header>
          <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Miners
          </label>
          <Button onClick={() => setModal((prev) => ({...prev, value: true, type: 'Add'}))}>Add New Miner</Button>
        </Header>
        <Grid>
          {state.miners.length > 0 ? (
            state.miners.map((miner) => (
              <Card key={miner._id}>
                <CardImgCon>
                  <img src={miner.image} style={{width: '140px', height: '140px'}} />
                </CardImgCon>
                <label>{miner.name || "Miner Name"}</label>
                <label>{miner.desc || "Description not available"}</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Tag style={{ backgroundColor: "#EBA11C" }}>
                    Capacity: {miner.capacity || "N/A"}
                  </Tag>
                  <Tag style={{ backgroundColor: "limegreen" }}>
                    Price: ${miner.price || "N/A"}
                  </Tag>
                </div>
                <Tag style={{ backgroundColor: "crimson" }}>
                  Hash Rate: {miner.hashRate || "N/A"}
                </Tag>
                <ButtonCon>
                  <Buttons onClick={() => setModal((prev) => ({...prev, value: true, type: 'Edit', miner: state.miners.find((mine) => mine._id === miner._id)}))} style={{ backgroundColor: "#2C89DC" }}>Edit</Buttons>
                  <Buttons onClick={() => handleDeleteModal(miner._id)} style={{ backgroundColor: "crimson" }}>
                    Delete
                  </Buttons>
                </ButtonCon>
              </Card>
            ))
          ) : (
            <label>No miners available</label>
          )}
        </Grid>
      </Container>
      {modal.value && (
        <Modal onClose={() => setModal((prev) => ({...prev, value: false}))}>
          <AddMiner updateMiner={updateMiner} miner={modal.miner} type={modal.type} closeModal={() => setModal((prev) => ({...prev, value: false}))} addMiner={addMiner} />
        </Modal>
      )}
      {deleteModal.value && (
        <Modal onClose={closeDeleteModal}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center'}}>
            <label style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'white'}}>Are you sure ?</label>
            <label style={{fontSize: '1rem', color: 'white'}}>Miner will be deleted permanently and will not be recovered.</label>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '1rem', marginTop: '3rem'}}>
              <div onClick={handleDeleteMiner} style={{width: '20%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', color: 'white', backgroundColor: 'limegreen', borderRadius: '5px'}}>
                {deleteModal.loading ? <MoonLoader size={15}/> : 'Delete' }
              </div>
              <div onClick={closeDeleteModal} style={{width: '20%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', color: 'white', backgroundColor: 'crimson', borderRadius: '5px'}}>
                {deleteModal.loading ? <MoonLoader size={15}/> : 'Cancel' }
              </div>
            </div>
          </div>
        </Modal>
      )}
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
  margin-bottom: 0.5rem;
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
  width: 300px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
