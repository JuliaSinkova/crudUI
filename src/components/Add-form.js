import React from 'react';

export default function AddForm ({nameInput, surnameInput, sendData, setName, setNameInput, setSurname, setSurnameInput }) {

return(
<form >
        <div className="form-group">
          <label >Name</label>
          <input type="text" className="form-control" id="name" value={nameInput} onChange={(e) => {setName(e.target.value); setNameInput(e.target.value)}}/>
    
        </div>
        <div class="form-group">
          <label >Surname</label>
          <input type="text" className="form-control" id="surname" value={surnameInput} onChange={(e) => {setSurname(e.target.value); setSurnameInput(e.target.value)}}/>
        </div>
        <button  type="submit" className="btn btn-primary" onClick={sendData} type='submit'>Add</button>
      </form>
)

}