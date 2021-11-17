import React from 'react';

export default function Table ({APIData, setAPIData, nameU, setNameU, surnameU, setSurnameU, readOnly, editClass, editData, saveClass, updateData, deleteClass, onDelete }) {

return(
       
    <table className="table  table-bordered">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Surname</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      
    {APIData.map((data) => {
       
       if(data.hasOwnProperty('data')){
            
       
        
       return (
        
        <tr>
          <td><input  placeholder={data.data.name}  onInput={(e) => setNameU(e.target.value)} readOnly={readOnly} className="table-input"></input></td>
        <td><input placeholder={data.data.surname} onInput={(e) => setSurnameU(e.target.value)} readOnly={readOnly} className="table-input"></input></td>
        <td>
            <button  className={editClass} type="submit"  onClick={() => editData(data)} >Edit</button>
            <button  className={saveClass} type="submit"  onClick={() => updateData(data)}>Save</button>
            <button class={deleteClass} type="submit" onClick={() => onDelete(data._id)} >Delete</button>
        </td>
        
      </tr>
      
     )
    }
})}
    </tbody>
  </table> 
  
)

}