import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function UserRequest() {
    const [open, setOpen] = useState<boolean>(false);
  return (
     <div style={{width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.5rem', backgroundColor: '#1D1D1D', borderRadius: '5px'}}>
        <div style={{width: '100%', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <label style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Username</label>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', width: '2rem', height: '2rem', backgroundColor: 'darkorange', fontWeight: 'bold', borderRadius: '50%', marginLeft: 'auto'}}>1</div>
            <label style={{fontSize: '1rem', fontWeight: 'bold'}}>Pending Request</label>
            <div onClick={() => setOpen(!open)} style={{boxSizing: 'border-box', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <FontAwesomeIcon icon={faChevronDown}/>
            </div>
        </div>
        {open && 
            <div style={{width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{display: 'flex', boxSizing: 'border-box', padding: '0.5rem', gap: '3rem', alignItems: 'center', backgroundColor: '#2C2C2C', marginTop: '0.5rem', borderRadius: '5px'}}>
                    <label>Miner</label>
                    <label style={{marginLeft: 'auto'}}>Miner 1</label>
                    <label>12-12-12</label>
                    <label>ayushgokhle@oksbi</label>
                    <select style={{padding: '0.5rem', borderRadius: '5px', cursor: 'pointer', outline: 'none', border: 'none', backgroundColor: 'green', color: 'white', fontWeight: 'bold'}}>
                        <option style={{background: 'white', color: 'black'}}>Pending</option>
                        <option style={{background: 'white', color: 'black'}}>Completed</option>
                    </select>
                </div>
            </div>
        }
    </div>
  )
}

export default UserRequest