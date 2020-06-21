import React from 'react'
import Icon from '../Assests/Images/icon-logo.png'
import FooterIcon from '../Assests/Images/single-icon.png';
import FacebookIcon from '../Assests/Images/facebook.png';
import TwitterIcon from '../Assests/Images/twitter.png';
import './Welcome.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Welcome(props) {
    return (
        <div className="welcome-background ">
            <div className="icon-section-welcome">
                <img src={Icon} alt="icon" className="icon" onClick={() => alert("ICON")}/>
            </div>

            <pre id="alertid" className="alert alert-danger" role="alert">"We do not currently support this resolution !
             We recommend using this website on laptop or pc :)"</pre>
            <div className="content-right">
                <p align="right">
                    Working From Home?
                </p>
                <br />
                <div className="title-description">
                    <pre align="right" >
                        Stay connected with your team.
                    </pre>
                    <pre align="right" >
                        Communicate and Collaborate at
                    </pre>
                    <pre align="right" >
                        the same place!
                    </pre>
                </div>
                <br />
                <div className="button-section">
                    <button type="button" className="btn" onClick={() => props.history.push("/authenticate/signup")}>Create your account</button>
                    <div className="spacer"></div>
                    <button type="button" className="btn" onClick={() => props.history.push("/authenticate/signin")}>Sign in to your account</button>
                </div>
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