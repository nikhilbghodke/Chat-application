import React from 'react';
import Icon from '../Assests/Images/icon-logo-2.png'

// import RoomSignIn from './Utility/roomSignIn';
import UserSignIn from './Utility/userSignIn';
import NewUser from './Utility/newUser';

import FooterIcon from '../Assests/Images/single-icon.png';
import FacebookIcon from '../Assests/Images/facebook.png';
import TwitterIcon from '../Assests/Images/twitter.png';

import './AuthenticationPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuthenticationPage(props) {
    console.log(props)

    let component = null;   // This will be the component on the right side
    let title = "";
    let subtitle = "";  // These two will be on the left side

    if (props.match.params.type === "signin"){
        component = <UserSignIn />
        title = "Welcome Back!";
        subtitle = "Nice to see you again"
    }
    else if (props.match.params.type === "signup"){
        component = <NewUser />
        title = "Hello there!";
        subtitle = "Get started with your team";
    }
    else{
        console.log("Not Found")
        props.history.push("/notfound")
    } 
        
    // else if (props.match.params.type === "")


    return (
        <div className="auth-page">
            <div className="left">
                <div className="icon-section-auth">
                    <img src={Icon} alt="icon" className="icon" onClick={() => alert("ICON")} />
                </div>
                <div className="welcome-text">
                    <p className="welcome-text-title">
                        {title}
                    </p>
                    <p className="welcome-text-subtitle">
                        {subtitle}
                    </p>
                </div>
            </div>
            <div className="right">
                {component}
            </div>
            <div className="footer">
                <div className="bottom-icon">
                    <img src={FooterIcon} alt="footer-icon"/>
                </div>
                <div className="spacer"></div>
                <div className="footer-contents">
                    <p style={{margin: "auto 0"}}>
                        Contact Us
                    </p>
                    <div className="bottom-icon">
                        <img src={FacebookIcon} alt="facebook-icon "/>
                    </div>
                    <div className="bottom-icon">
                        <img src={TwitterIcon} alt="twitter-icon "/>
                    </div>
                </div>
            </div>
        </div>
    )
}

