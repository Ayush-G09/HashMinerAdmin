import axios from 'axios';
import React, { ChangeEvent, useRef, useState } from 'react'
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components'
import { Miner } from './Miners';

type State = {
    image: string | null;
    name: string;
    desc: string;
    hashRate: number;
    capacity: number;
    price: number;
    loading: boolean;
};

type Props = {
    addMiner: (miner: Miner) => void;
    closeModal: () => void;
    updateMiner: (miner: Miner) => void;
    type: 'Add' | 'Edit';
    miner?: Miner;
};

function AddMiner({addMiner,closeModal, type, miner, updateMiner}: Props) {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [state, setState] = useState<State>({
        image: type === 'Edit' ? miner ? miner.image : null : null,
        name: type === 'Edit' ? miner ? miner.name : '' : '',
        desc: type === 'Edit' ? miner ? miner.desc : '' : '',
        hashRate: type === 'Edit' ? miner ? miner.hashRate : 0 : 0,
        capacity: type === 'Edit' ? miner ? miner.capacity : 0 : 0,
        price: type === 'Edit' ? miner ? miner.price : 0 : 0,
        loading: false,
    });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png"];

      if (allowedTypes.includes(selectedFile.type)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setState((prev) => ({...prev, image: reader.result as string}));
        };

        reader.readAsDataURL(selectedFile); 
      } else {
        setState((prev) => ({...prev, image: null}));
      }
    }
  };

  const handleClick = () => {
    if(state.loading){
        return;
    };
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if(state.loading){
        return;
    };
    if(!state.image){
        alert('Please add a image');
        return;
    };
    if(!state.name){
        alert('Name required');
        return;
    };
    if(!state.desc){
        alert('Description required');
        return;
    };
    if(!state.hashRate){
        alert('Hash rate required');
        return;
    };
    if(!state.capacity){
        alert('Capacity required');
        return;
    };
    if(!state.price){
        alert('Price required');
        return;
    };
    const data = {image: state.image, name: state.name, desc: state.desc, hashRate: state.hashRate, capacity: state.capacity, price: state.price};
    try{
        setState((prev) => ({...prev, loading: true}));
        if(type === 'Add'){
        const response = await axios.post('https://hash-miner-backend.vercel.app/api/auth/add-miner', data);
        addMiner(response.data.miner);
        }
        if(type === 'Edit'){
        const respone = await axios.put(`https://hash-miner-backend.vercel.app/api/auth/update-miner/${miner?._id}`, data);
        updateMiner(respone.data.miner);
        console.log({respone});
        }
        closeModal();
    }catch{
        console.log('error');
    }finally{
        setState((prev) => ({...prev, loading: false}));
    }
  };

  const closeModalCheck = () => {
    if(state.loading){
      return;
    };
    closeModal();
  }; 
  
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', color: 'white', gap: '1rem'}}>
        <label style={{fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem'}}>{type} Miner</label>
        {state.image && <div style={{width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', border: '2px solid black', overflow: 'hidden'}}>
            <img src={state.image} style={{width: '90%', height: '90%'}} />
        </div>}
        <Button onClick={handleClick} style={{backgroundColor: '#2c89dc'}}><input ref={fileInputRef}  onChange={handleFileChange} type='file' style={{display: 'none'}} /> Upload Image</Button>
        <Input disabled={state.loading} value={state.name} onChange={(e) => setState((prev) => ({...prev, name: e.target.value}))} placeholder='Name' />
        <Input disabled={state.loading} value={state.desc} onChange={(e) => setState((prev) => ({...prev, desc: e.target.value}))} placeholder='Description' />
        <Input disabled={state.loading} type='number' value={state.hashRate === 0 ? '' : state.hashRate} onChange={(e) => setState((prev) => ({...prev, hashRate: parseInt(e.target.value)}))} placeholder='Hash Rate' />
        <Input disabled={state.loading} type='number' value={state.capacity === 0 ? '' : state.capacity} onChange={(e) => setState((prev) => ({...prev, capacity: parseInt(e.target.value)}))} placeholder='Capacity' />
        <Input disabled={state.loading} type='number' value={state.price === 0 ? '' : state.price} onChange={(e) => setState((prev) => ({...prev, price: parseInt(e.target.value)}))} placeholder='Price' />

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '1rem'}}>
            <Button style={{backgroundColor: '#2c89dc'}} onClick={handleSubmit}>{ state.loading ? <MoonLoader size={15} color='white'/> : 'Save'}</Button>
            <Button style={{backgroundColor: 'crimson'}} onClick={closeModalCheck}>{ state.loading ? <MoonLoader size={15} color='white'/> : 'Cancel'}</Button>
        </div>
    </div>
  )
};

const Input = styled.input`
outline: none;
border: 2px solid black;
width: 50%;
height: 40px;
border-radius: 5px;
background-color: #1D1D1D;
color: white;
font-size: 1rem;
padding: 0 0.5rem;

&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Button = styled.div`
width: fit-content;
display: flex;
align-items: center;
justify-content: center;
padding: 0.5rem;
border-radius: 5px;
cursor: pointer;
`;

export default AddMiner