import React from 'react';

const navigation = ({ onRouteChange,isSignedIn }) => {

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('Signin')}>SignOut</p>
            </nav> 
        )
    } else {
        return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('Signin')}>SignIn</p>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('register')}>Register</p>
            </nav> 
        )
    }
  }
   
   

export default navigation;