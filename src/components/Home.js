import React, { useEffect, useState } from 'react';
import { auth } from './FirebaseFile';
// import svg from './pic/logos_firebase.svg'
import {Modal,ModalBody} from "reactstrap";
import { Link } from 'react-router-dom';
import {db} from './FirebaseFile'
import {AiOutlineSearch,AiFillPlusCircle} from 'react-icons/ai';
import {HiOutlineUserCircle} from 'react-icons/hi'
import {RxCross1} from 'react-icons/rx'
import {BsFillTrash3Fill}from 'react-icons/bs'
import './home.css';
import { collection,setDoc,doc, addDoc, getDocs, deleteDoc,where, query} from 'firebase/firestore';
const Home = () => {
  const [displayName, setDisplayName] = useState('');
  const [userData,setUserData]=useState([]) 
  const [modal,setModel]=useState(false)
  const [contacts,setContacts]=useState([])
 const [formData, setFormData] = useState({
    name: "",
    email: "",
    address:"",
    contact:""
  });
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.displayName) {
      setUserData(user)
      setDisplayName(user.displayName);
    } 
  })
  const deletecontact =async (id)=>{
    try {
      await deleteDoc(doc(db,"contacts",id))
    } catch (error) {
      console.log(error)
    }
    window.location.reload();

    }
// const getDatabyQuery =async()=>{
//   const collectionRef = collection(db,"contacts");
//   const q = query(collectionRef,where(userData.uid,"==",formData.userId))
//   const snapshot = await getDocs(q)
//   snapshot.forEach((data)=>setContacts(data.data()))
//   getDatabyQuery()
// }





  const handleSubmit = async() => {
    // toggle={()=>setModel(!modal)}
    setModel(false)
    if(formData ===null){
      alert ("fill All the fields")
      return;
    }
    const docRef = await addDoc(collection(db, "contacts"), {
      name: formData.name,
      email: formData.email,
      contact:formData.contact,
      address:formData.address,
      userId:userData.uid
    })
    window.location.reload();
  }
  // console.log(userData)

useEffect (()=>{
  const getcontacts =async ()=>{
    try{
      const contactref = collection(db,"contacts")
      // .where(formData.userId, '==', userData.uid)
      const conSnapshot = await (getDocs(contactref))
      const contactList= conSnapshot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data()
        }
      })
      // console.log(contactList)
      // const filteredContacts=contactList.filter((contact)=>{return contact.userId === userData.uid}) 
      // console.log(filteredContacts)//null
    // setContacts (filteredContacts)
    setContacts(contactList)
    // console.log(userData.uid)//null
      }
      // console.log(userData.uid)
      // console.log(formData.userId)
      // setContacts(contactList)
    catch(error){
      console.log(error)
    }
  }
  return () => getcontacts();

  // getcontacts() 
},[])
// const userId = auth.currentUser ? auth.currentUser.uid : null;

  // const filteredContacts = contacts.filter((contact) =>{return console.log(contact);});
  // console.log(filteredContacts)
  // console.log(contacts)

// useEffect(() => {
// const unsubscribe =collection(db,'contacts')
//       .where(formData.userId, '==', userData.uid)
//       .onSnapshot((snapshot) => {
//         const contactsData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log(formData.userId)
//         setContacts(contactsData);
//       });

//     // Cleanup the listener when the component is unmounted

//     return () => unsubscribe()[userData.uid]})

  // function about(){
  //   alert ("Here you can see your contact add them delete,or update")
  // }
  return ( <div className='home'>
    <div className='navbar'>
              <div className='navbartag'> 
      <h1><b>Welcome!<i>{displayName}</i></b></h1>
    </div>
      <ul>
        <li className='home'>  <Link to="/"><b>Logout</b></Link></li>
        {/* <li className='li' onClick={()=>setModel(true)}>Add</li> */}
        {/* <li className='li' onClick={about}>About</li> */}
    </ul>
    </div>


    <div className="App">
    <div className='navbar-app'>
    {/* <img className="imgg" src={svg} alt="sign" /> */}
    <h4> CONTACT APP</h4>
        </div>
     <div className='input'>
      <AiOutlineSearch className='icon'/>
      <input type='text'/>
      {/* <button onClick={addlist}> */}
<AiFillPlusCircle className='iconplus' onClick={()=>setModel(true)}/>
{/* </button> */}
     </div>
     <div className='con'>
      {contacts.map((contact)=>{
        return(
          <div className='contact' key={contact.id}>  
          <HiOutlineUserCircle className='hiicon'/>
          <div className='inputs'>
          <h2>{contact.name}</h2> 
          <p>{contact.email}</p>   
          </div> 
          <div className='bibsicons'>
          {/* <BiMessageSquareEdit/>  */}
          <BsFillTrash3Fill onClick={()=>deletecontact(contact.id)}/>  
          </div>
        </div>
        )
      })}
     </div>
         <div>
         </div>

          </div>

          <Modal isOpen={modal}
toggle={()=>setModel(!modal)}>
  {/* <ModalHeader toggle={()=>setModel(!modal)}>
    Add
 </ModalHeader> */}
  <ModalBody toggle={()=>setModel(!modal)}>
    <div className='form'>
      <div className='contact-add'>
        <h2>Add CONTACT</h2>
        <p><RxCross1 onClick={()=>setModel(false)}/></p>
      </div>
      <div>
     <label>Name:</label>
     
          < input className="plusinput"
            type="text"
            name="name"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                name: event.target.value,
              }))
            }
          />
          <label>Email:</label>
          < input className="plusinput"
            type="email"
            name="email"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                email: event.target.value,
              }))
            }
          />
     <label>addres:</label>
     
          < input className="plusinput"
            type="text"
            name="address"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                address: event.target.value,
              }))
            }
          />
        {/* <div> */}
          <label>contact:</label>
          < input className="plusinput"
            type="Number"
            name="contact"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                contact: event.target.value,
              }))
            }
          />
          </div>
                  <button onClick={handleSubmit} type="button" className="btn handle">
       add

        </button> 
          {/* </div>  */}
 </div>
 </ModalBody>
   </Modal>
    
</div>)}

export default Home