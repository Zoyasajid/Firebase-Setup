import pic from './pic/undraw_Newspaper_re_syf5.png'
import React, { useEffect, useState } from 'react';
import { auth } from './FirebaseFile';
import { Link } from 'react-router-dom';
const Home = () => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
  }, []);

  return (
    <div>
    <div className='navbar'>
              <div>
      <h1><b>Welcome!<i>{displayName}</i></b></h1>
      {/* <p>This is the home page.</p> */}
    </div>
      <ul>
        <li className='home'>  <Link to="/"><b>Logout</b></Link></li>
        <li className='li'>Gallery</li>
        <li className='li'>About</li>
    </ul>
    </div>
    <img className="img" src={pic} alt="sign" />

</div>  )
}

export default Home