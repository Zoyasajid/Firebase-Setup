import React, { useEffect, useState } from 'react';
import { auth } from './FirebaseFile';
import {Modal,ModalBody} from "reactstrap";
import { Link } from 'react-router-dom';
import {db} from './FirebaseFile'
// import { toast } from 'react-toastify';
import {AiOutlineSearch,AiFillPlusCircle} from 'react-icons/ai';
import {HiOutlineUserCircle} from 'react-icons/hi'
import {RxCross1} from 'react-icons/rx'
import {BsFillTrash3Fill}from 'react-icons/bs'
import './home.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { collection,doc, addDoc, getDocs, deleteDoc,where, query} from 'firebase/firestore';
const Home = () => {
  const [displayName, setDisplayName] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
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

    const deleteContact = async (id) => {
      try {
        toast.success("Contact deleted")
        await deleteDoc(doc(db, "contacts", id));
      } catch (error) {
        console.error("Error deleting contact:", error);
        // return false; 
      }
    };
 

  // console.log(contacts)
  const handleSubmit = async() => {
    setModel(false)
    const docRef = await addDoc(collection(db, "contacts"), {
      name: formData.name,
      email: formData.email,
      contact:formData.contact,
      address:formData.address,
      userId:userData.uid
    })
    // console.log("user save")
    setFormData(docRef)
    // console.log(formData)
  }
  useEffect(() => {
    const getDatabyQuery = async () => {
      if (!userData) {
        return;
      }
  
      try {
        const collectionRef = collection(db, "contacts");
        const q = query(collectionRef, where("userId", "==", userData.uid));
        const querySnapshot = await getDocs(q);
  
        const contactsData = [];
        querySnapshot.forEach((doc) => {
          const contact = {
            id: doc.id,
            ...doc.data()
          };
          contactsData.push(contact)
        });
        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    getDatabyQuery();
  }, [formData,deleteContact]);
console.log(contacts)

  const filterContacts = () => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setContacts(filtered);
  };
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
     <div className='input'
     type="text"
     placeholder="Search contacts"
     value={searchTerm}
     onKeyDown={filterContacts}
     onChange={(e) => setSearchTerm(e.target.value)}
     >
      <AiOutlineSearch className='icon'/>
      <input type='text'/>
<AiFillPlusCircle className='iconplus' onClick={()=>setModel(true)}/>
{/* </button> */}
     </div>
     <div className='con'>
  {contacts?.map((contact) => (
    <div className='contact' key={contact.id}>  
      <HiOutlineUserCircle className='hiicon'/>
      <div className='inputs'>
        <h2>{contact.name}</h2> 
        <p>{contact.email}</p>   
      </div> 
      <div className='bibsicons'>
        <BsFillTrash3Fill onClick={() => deleteContact(contact.id)}/>  
      </div>
    </div>
  ))}
 <ToastContainer 
 position='bottom-center'
 />

</div>

         <div>
         </div>

          </div>

          <Modal isOpen={modal}
toggle={()=>setModel(!modal)}>
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
     <label>Address:</label>
     
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
          <label>Contact:</label>
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
 </div>
 </ModalBody>
   </Modal>

</div>
)}

export default Home