import '../css/Agents.css'
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import ToggleButton from '@mui/material/ToggleButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import {
  useWindowSize,

} from '@react-hook/window-size'

import Credits from './Credits';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import '../css/Agents.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function createData(
    Id,
    Name,
   Email,
   Phone,
   CreditNumber,
    Remark, 
    Edit_Remark,
    Delete
  ) {
    return {Id, Name,Email, Phone,CreditNumber, Remark,Edit_Remark, Delete };
  }
 
const Dashboard = (props) => {
  const { instacart } = props;

 const [timer, setTimer] = useState(false)
 setTimeout(()=>{
    setTimer(true)
 }, 3000)
  var instasAccountArray = [...instacart];
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [creditNumber, setCreditNumber] = useState('');
    const [remark, setRemark] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRegister, setSelectedRegister] = useState(false);
    const [instaCartsArrayUpdated, setInstaCartsArrayUpdated] = useState(false)
    var rows = [
    ];
    instasAccountArray.map((agent)=> {
      rows.push(createData(agent._id, agent.name, agent.email, agent.phone,agent.creditNumber, agent.remark, 'Edit', 'Delete', ))
    })
   

 const [view, setView] = useState('accounts');
 const [showMenu, setShowMenu] = useState(true)
 const toggleShowButton = ()=> {
  setShowMenu(!showMenu)
}
const [width] = useWindowSize()

const getClassName = ()=> {

  if(width > 750)
  {
    return 'left'
  }
  else if(width < 750 && showMenu)
  {
    return 'hide'
  }
  else{
    return 'side'
  }
}
const [loading, setLoading] = useState(false)
const [credits, setCredits] = useState([])
 const handleChange = (event, nextView) => {
  setView(nextView);
};

useEffect(() => {
  setLoading(true)
  const fetchData = async () => {
    try {
      setLoading(false)

      const response = await fetch('https://instacartbackend.onrender.com/api/agentRoute/forAgents',{ method:'GET', headers: {}
    },  {credentials:'include'} );
    
      var fetchedData = await response.json();
       
         console.log(fetchedData)
       setCredits(fetchedData);

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  fetchData();
}, []); 

   
        const fetchData = async () => {
          try {
            const response = await axios.post('https://instacartbackend.onrender.com/api/instacart/', {name, phone, email, remark, creditNumber}, {withCredentials: true
        });
           
             if(response.data.message)
             {
                toast.success('Successfully Added');
        
                 setInstaCartsArrayUpdated(true);
                 props.updateInstaArray(response.data.id, name, email, phone,creditNumber, remark, phone)
                 
             }
             else{
                toast.error('account already exist')
             }
    
    
            } catch (error) {
            console.error(error);
          }
        };
    
    const deleteCardInfo = async ()=> {
        try {
            const response = await axios.post('https://instacartbackend.onrender.com/api/instacart/delete', {id:deleteId}, {withCredentials: true
        });
           
             if(response.data.message)
             {
                toast.success('Successfully deleted');
             
                 props.delete(deleteId)
    
             }
             else{
                toast.error('Something wwent wrong')
             }
    
    
            } catch (error) {
            console.log(error);
          }
    }
    const editCardInfo = async ()=> {
        try {
            const response = await axios.post('https://instacartbackend.onrender.com/api/instacart/update', {remark:editRemark, id:deleteId}, {withCredentials: true
        });
           
             if(response.data.message)
             {
                toast.success('Successfully Updated');
               props.editInsta(deleteId, editRemark)
    
             }
             else{
                toast.error('Something wwent wrong')
             }
    
    
            } catch (error) {
            console.error(error);
          }
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name && !email && !phone && !creditNumber && !remark) {
          toast.error('Fields are not field. All fields are required');
        } 
        else {   
           setCreditNumber('')
           setEmail('')
           setName('')
           setPhone('')
           setRemark('')    
         setSelectedRegister(false)
         fetchData()
      
    
        }
      };
      const deleteTrue = async () =>
      {
        handleClose()
        deleteCardInfo()
    
      }
    
       const [showConfirmation, setShowConfirmation] =useState(false);
       const [deleteId, setDeleteId] = useState('')
       const handleClose = () => 
       {
        setShowConfirmation(false)
         setDeleteId('')
      };
      const [showEditProfile, setShowEditPofile] =useState(false);
      const [editRemark, setEditRemark] = useState('')
      const submitEditProfileHandler = (e)=> {
        e.preventDefault();
        if (!editRemark) {
          toast.error('Enter Remark');
        } 
        else 
        {
      
          
   
          handleCloseShowProfile()
          editCardInfo()
      
        }
      
       }
       const handleCloseShowProfile = () => 
       {
        setShowEditPofile(false)
        setEditRemark('')
    };

    const [showRemark, setShowRemark] = useState(false)
    const handleCloseShowRemark = ()=> {
      setShowRemark(false)
    }
    const [selectedRemark, setSelectedRemark]
 = useState('')
   return (
    <div className='main'>

         <div className="centerAgent">
        <div className="modal">
        <Modal
        open={showConfirmation}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are Sure You want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button  variant='danger'  className='mt-3' onClick={deleteTrue}>
               Yes
            </Button>   
            <Button  variant='light'  className='mt-3 mx-3' onClick={handleClose}>
               No
            </Button>          </Typography>
        </Box>
      </Modal>
      <Modal
        open={showEditProfile}
        onClose={handleCloseShowProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <FormContainer>
      <h1>Edit Remark</h1>
      <Form onSubmit={submitEditProfileHandler}>
        <Form.Group classuserName='my-2' controlId='username'>
          <Form.Label>Enter Remark</Form.Label>
          <Form.Control
            type='remark'
            placeholder='Enter Remark'
            value={editRemark}
            onChange={(e) => setEditRemark(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
        <Button type='submit' variant='danger' onClick={handleCloseShowProfile} className='mt-3 mx-3'>
          Cancel
        </Button>

      </Form>


    </FormContainer>



      </Modal>
      <Modal
        open={showRemark}
        onClose={handleCloseShowRemark}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <FormContainer>
      <h1> Remark</h1>
  
       <h4 className='m-3  p-2 border-3 text-light bg-secondary '>{selectedRemark}</h4>
       <Button type='submit' variant='danger' onClick={handleCloseShowRemark} className='mt-3 mx-3'>
          Cancel
        </Button>


    </FormContainer>



      </Modal>
        </div>
        <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >

      <ToggleButton onClick={toggleShowButton}  value="accounts" aria-label="accounts">
        <SupervisorAccountIcon/>   <span className='mx-2'>Accounts Instacart</span> 
      </ToggleButton>
      <ToggleButton value="credits" onClick={toggleShowButton} aria-label="credits" className='my-2'>
        <SupervisedUserCircleIcon/> <span className='mx-2'>Credits</span> 
      </ToggleButton>
      <ToggleButton value="upload" onClick={toggleShowButton} aria-label="upload" className='my-2'>
        <SupervisedUserCircleIcon/> <span className='mx-2'>Upload Accounts</span> 
      </ToggleButton>
      
    </ToggleButtonGroup>
    {   width <  750 ? <>     {showMenu ? 
           
           <div className="icons"><Button
              type='button'
              variant='primary'
              className='p-2'
              onClick={()=>setShowMenu(!showMenu)}
            >
              <ListIcon/>
            </Button>
            </div>
            :   <div className="iconsDelete"> <Button
            type='button'
            variant='danger'
            className='p-2'
            onClick={()=>setShowMenu(!showMenu)}
          >
<CloseIcon/>      
     </Button>
</div>
}</>:<></>}

{!loading ? <><div className="right">

{(() => {
    switch(view) {
      case 'accounts':
        return  <>
        {instasAccountArray.length !== 0 || timer ? (<> <div className="agentTable">


      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>

            <TableCell align="right">Credit</TableCell>
            <TableCell align="right">Remark</TableCell>
            <TableCell align="right">EditRemark</TableCell>
            <TableCell align="right">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">  {row.Phone}</TableCell>

              <TableCell align="right"> {row.Email} </TableCell>
              <TableCell align="right">  {row.CreditNumber}</TableCell>
              <TableCell align="right"><Button  variant='primary' className='mt-3' onClick={()=> {
                setShowRemark(true)
                setSelectedRemark(row.Remark)
              }}> Read Remark</Button></TableCell>   <TableCell align="right"><Button  variant='info' className='mt-3' onClick={()=> {
                setShowEditPofile(true)
                setDeleteId(row.Id)
              }}> Edit</Button></TableCell>
              <TableCell align="right"><Button  variant='danger'  className='mt-3' onClick={()=>{
                     setShowConfirmation(true)
                     setDeleteId(row.Id)
              }} > Delete</Button> </TableCell>
    
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      </div></>): (<>
      <Loader/>
        </>)}
        </>
          case 'credits':
            return <Credits credits = {credits} />
            case 'upload':
              return     <div className="register">
              <div className="buttonRegister">
              <ToggleButton
              value="check"
              selected={selectedRegister}
              onChange={() => {
                setSelectedRegister(!selectedRegister);
              }}
            >      { !selectedRegister ? (<><Button type='button'  variant='primary' className='mt-3' >Upload Instacart account</Button>
            </>) : (<>
              <Button type='button'  variant='danger' className='mt-3' > Cancel </Button>
          
            </>)
        
            }
        
            </ToggleButton>
              </div>
                {selectedRegister &&       <FormContainer>
              <h4>Upload Instacart Account Details</h4>
              <Form onSubmit={submitHandler}>
                <Form.Group classuserName='my-2' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
        
              
                <Form.Group className='my-2' controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    name={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='phone'>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Phone'
                    value={phone}
                    name={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='creditNumber'>
                  <Form.Label>Credit  Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter credit number'
                    value={creditNumber}
                    name={creditNumber}
                    onChange={(e) => setCreditNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='remark'>
                  <Form.Label>Enter Remark</Form.Label>
                  <Form.Control
                 as="textarea" rows={4} 
        
                    placeholder='Fill in remark'
                    value={remark}
                    name={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  ></Form.Control>
                </Form.Group>
        
                <Button type='submit' variant='primary' className='mt-3'>
                 Save 
                </Button>
        
              </Form>
        
        
            </FormContainer>}
        
              </div>
           default:
            return null
        }
      })()}
</div></> :<Loader/> }
   
     
      </div>
  
    </div>
  )
}

export default Dashboard
