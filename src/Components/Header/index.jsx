import React from 'react';
import "./Header.scss";
import profile from './profile.jpg';
import arrow from './down-arrow.png';

export default () => {
    return <header>
        <h3>Templates</h3>
        <div className="profile-block">
            <img className="profile_img" src={profile} alt="profile" />
            <span><img className="arrow" src={arrow} alt="arrow" /></span>
        </div>
    </header>
}