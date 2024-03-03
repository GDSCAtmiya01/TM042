import React from 'react';
import '../css/herosection.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Herosection() {
    let event_name = 'InstilFest';
    let nav_links_name = ['Home', 'About us', 'admin', 'Contact us'];
    const nav = useNavigate();

    let nav_links = nav_links_name.map((e) => {
        return (
            <div className='hero_nav_link_name'>
                <Link className='hero_link' to={'/layout/' + e}>{e}</Link>
            </div>
        );
    })
    return (
        <div className='herosection'>
            <div className='hero_nav'>
                <div style={{ display: 'flex' }}>
                    <img className='hero_logo' src={require('../assets/Polygon_1.png')} />
                    <div className='hero_logo_name' style={{ color: '#bec4d2' }}>{event_name}</div>
                </div>
                <div className='hero_nav_links'>{nav_links}</div>
                <div>
                    <button onClick={() => nav('/admin')} className='hero_btn'>Admin</button>
                    <button onClick={() => nav('/signin')} className='hero_btn'>Sign In</button>
                </div>
            </div>
            <div className='hero_content'>
                <div className='play_video'>
                    <i class="fa fa-play-circle" aria-hidden="true"></i>
                    <div className='play'>play This Video</div>
                </div>
                <div className='side_content'>
                    <h1 className='hero_tittle'>The  India’s  Best  Event Management  Agency
                        For  University </h1>
                    <p className='hero_text'>
                        <p className='pb-2'>Celebrating Moments, Creating Experiences:</p>
                        <p className='pb-2'>Unforgettable Events Tailored Just for You!</p>
                        <p className='pb-2'>Crafting Unforgettable Events</p></p>
                    <Link to={'/home'} className='hero_getstarted_btn'>Get Started</Link>
                </div>
            </div>
        </div>
    );
}
