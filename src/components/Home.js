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
import { collection,setDoc,doc, addDoc, getDocs, deleteDoc,where, query, onSnapshot} from 'firebase/firestore';
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
  const handleSubmit = async() => {
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
// useEffect (()=>{
//   const getDatabyQuery =async()=>{
//     const contactsData = [];

//     const collectionRef =  collection(db,"contacts");
//     console.log(collectionRef)
//     const q = query(collectionRef, where("userId","==",userData.uid))
//     const querySnapshot = await getDocs(q);
//     // const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, '=>', doc.data());
//   contactsData.push(doc.data());
//   setContacts(contactsData)
// });
// }
//   getDatabyQuery()
// },[])
useEffect(() => {
  const getDatabyQuery = async () => {
    const contactsData = [];
    const collectionRef = collection(db, "contacts");
    console.log(collectionRef);
    const q = query(collectionRef, where("userId", "==", userData.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      contactsData.push(doc.data());
    });

    setContacts(contactsData);
  }; getDatabyQuery();
}, []);

// console.log(contacts)
// useEffect (()=>{
//   const getcontacts =async ()=>{
//     try{
//       const contactref = collection(db,"contacts")
//       const conSnapshot = await (getDocs(contactref))
//       const contactList= conSnapshot.docs.map((doc)=>{
//         return{
//           id:doc.id,
//           ...doc.data()
//         }
//       })
//             // const filteredContacts=contactList.filter((contact)=>{return contact.userId === userData.uid}) 

//       // const filteredContacts=contactList.filter((contact)=>{return contact.userId === userData.uid}) 
//     // setContacts (filteredContacts)
//     console.log(contactList)
//     setContacts(contactList)
//     // console.log(userData.uid)//null
//       }
//       // console.log(userData.uid)
//       // console.log(formData.userId)
//       // setContacts(contactList)
//     catch(error){
//       console.log(error)
//     }
//   }
//   return () => getcontacts();

//   // getcontacts() 
// },[])
// const userId = auth.currentUser ? auth.currentUser.uid : null;

  // const filteredContacts = contacts.filter((contact) =>{return console.log(contact);});
  // console.log(filteredContacts)
  // console.log(contacts)

  return ( <div className='home'>
    <div className='navbar'>
              <div className='navbartag'> 
      <h1><b>Welcome!<i>{displayName}</i></b></h1>
    </div>
      <ul>
        <li className='home'>  <Link to="/"><b>Logout</b></Link></li>
    </ul>
    </div>


    <div className="App">
    <div className='navbar-app'>
    <h4> CONTACT APP</h4>
        </div>
     <div className='input'>
      <AiOutlineSearch className='icon'/>
      <input type='text'/>
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