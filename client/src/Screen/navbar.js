import React from 'react';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    let event_name = 'InstilFest';
    let nav_links_name = ['Home', 'About us', 'Blog', 'Categories', 'Events', 'Competition', 'Contact us'];

    let nav_links = nav_links_name.map((e) => {
        return (
            <div className='nav_link_name'>
                <Link className='link' to={'/layout/' + e}>{e}</Link>
            </div>
        );
    })

    let clickBoolean = 0;
    return (

        <>
            <div className='navbar'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className='logo' src={require('../assets/Polygon_1.png')} />
                    <div className='logo_name' style={{ color: '#bec4d2' }}>{event_name}</div>
                </div>
                <div className='nav_links'>{nav_links}</div>
                <div style={{ display: 'flex' }}>
                    <input type="text" class="search" placeholder="Search..." />
                    <i class="fa fa-search" aria-hidden="true" onClick={() => {
                        let a = document.getElementsByClassName('search')[0];
                        a.classList.toggle('search_active')
                    }} style={{ color: '#bec4d2' }}></i>
                    <div class="center" onClick={() => {
                        if (clickBoolean == 0) {
                            clickBoolean = 1;
                            document.getElementById("line1").classList.toggle("line1animation")
                            document.getElementById("line2").classList.toggle("line2animation")
                            document.getElementById("line3").classList.toggle("line3animation")
                            document.getElementsByClassName('toggle_nav_list')[0].classList.toggle('toggle')
                        }
                        else {
                            clickBoolean = 1;
                            document.getElementById("line1").classList.toggle("rev-line1animation")
                            document.getElementById("line2").classList.toggle("rev-line2animation")
                            document.getElementById("line3").classList.toggle("rev-line3animation")
                            document.getElementsByClassName('toggle_nav_list')[0].classList.toggle('toggle_reverse')
                            document.getElementsByClassName('toggle_nav_list')[0].classList.toggle('rev_name');
                        }
                    }}>
                        <div id="line1"></div>
                        <div id="line2"></div>
                        <div id="line3"></div>
                    </div>
                </div>
            </div >
            <div className='toggle_nav_list'>
                {nav_links}
            </div>
        </>
    );
}
