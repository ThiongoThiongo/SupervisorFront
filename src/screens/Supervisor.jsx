import Dashboard from "../components/Dashboard"
import { useState, useEffect } from 'react';

const Supervisor = () => {

  const [instacartAcounts, setInstacartAccounts] = useState([])
  
  const updateInsta  = (id, name, phone, email , creditNumber, remark)=> {

    let insert = {_id:id, name:name, email:email, creditNumber:creditNumber, remark:remark, phone:phone}
    var arrayTempo  = [...instacartAcounts]
    arrayTempo.push(insert)
    setInstacartAccounts(arrayTempo)
}
const onDelete = (id) => {
  const insta = instacartAcounts.filter((user) => user._id !== id);
  setInstacartAccounts(insta)
}
const edit = (id, remark) => {
  var instas = [...instacartAcounts];

  instas.forEach((insta)=> {
           if(insta._id === id)
           insta.remark = remark
  })
  setInstacartAccounts(instas)
}
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://instacartbackend.onrender.com/api/instacart/' );
          var fetchedData = await response.json();
           setInstacartAccounts(fetchedData);
      
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []); 
  return (
    <div className="center">
     <Dashboard instacart = {instacartAcounts} updateInstaArray={updateInsta} delete = {onDelete} editInsta = {edit}/>
    </div>
  )
}

export default Supervisor
