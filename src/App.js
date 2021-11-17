import React, { useState, useEffect } from 'react';
import AddForm from './components/Add-form';
import Table from './components/Table';

import './App.css';

export default function App() {
  const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [surnameInput, setSurnameInput] = useState('');
    const [readOnly, setReadOnly] = useState(true);
    const [nameU, setNameU] = useState('');
    const [surnameU, setSurnameU] = useState('');
    const [saveClass, setSaveClass] = useState('btn btn-success invisible');
    const [editClass, setEditClass] = useState('btn btn-warning');
    const [deleteClass, setDeleteClass] = useState('btn btn-danger');
    useEffect(() => {
    getData();
    }, [])
    
    
    let formData = {data:{
      name:'',
      surname:'',
    }};
    let records = [];
  
    const url = "http://178.128.196.163:3000/api/records ";


    const getData = () => {
      fetch(url).then(resp => resp.json())
      .then(resp => setAPIData(resp));
      
    }



    const sendData = (e) => {
       e.preventDefault();
      formData.data.name = name;
      formData.data.surname = surname;
      
    

      fetch( url,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)})
        .then(response=>{ return response.json()})
        .then(data=> console.log('Success', data))
        .catch((error) => {
          console.error('Error:', error);
        }); 
        APIData.map((data ) => records.push(data));
        records.push(formData) ;
        setAPIData(records);
        setNameInput('');
        setSurnameInput('');
        
    }
    
    const editData = (data) => {

        console.log(data);
        setReadOnly(false);
        setSaveClass('btn btn-success');
        setEditClass('btn btn-warning invisible');
        setDeleteClass('btn btn-danger invisible');
    }

    const updateData = (data) => {
      let updatedName = nameU;
      let updatedSurname = surnameU;
      let id = data._id
      if(updatedName == ''){
        updatedName = data.data.name 
      }
      if(updatedSurname == ''){
        updatedSurname = data.data.surname ;
      }
      
      
      let items = {
        data: {
          name: updatedName,
          surname: updatedSurname
        }
      }
      console.log(items)
    
       fetch( "http://178.128.196.163:3000/api/records/" + id,{
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(items)})
        .then(response=>{ return response.json()})
        .then(data=> console.log('Success', data))
        .catch((error) => {
          console.error('Error:', error);
        }); 
        setReadOnly(true);
        setSaveClass('btn btn-success invisible');
        setEditClass('btn btn-warning');
        setDeleteClass('btn btn-danger');
        setInterval(() => {
          window.location.reload();
        }, 500);
    }


    const onDelete = (id) => {
      fetch("http://178.128.196.163:3000/api/records/" + id, {
      method: 'DELETE',})
      .then(res => res.json())
      .then(res => console.log(res)).catch((error) => {
        console.error('Error:', error);
      });
      let items = [];
       APIData.map(item => items.push(item));
       let filtered = items.filter(item => item._id !== id);
      setAPIData(filtered);
     
    }
    


    return (
      <div className="App">
         <AddForm name={name} setName={setName} setNameInput={setNameInput} surname={surname} setSurname={setSurname} setSurnameInput={setSurnameInput} sendData={sendData} nameInput={nameInput} surnameInput={surnameInput}
         />
        <Table APIData={APIData} setAPIData={setAPIData} nameU={nameU} setNameU={setNameU} readOnly={setReadOnly} surnameU={surnameU} setSurnameU={setSurnameU} editClass={editClass}
        editData={editData} saveClass={saveClass} onDelete={onDelete} deleteClass={deleteClass} updateData={updateData}
        />
      </div>
    );
 }





