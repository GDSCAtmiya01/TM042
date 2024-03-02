import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/home.css'
import Navbar from './navbar';

export default function Home() {

    const [university, setuniversity] = useState([]);
    const navigate = useNavigate();

    let image_list_1 = [{ image: 'photo_1.png' }, { image: 'photo_2.png' }, { image: 'photo_3.png' }];
    let image_list_2 = [{ image: 'photo_4.png' }, { image: 'photo_5.png' }, { image: 'photo_6.png' }];
    let image_list_3 = [{ image: 'photo_7.png' }, { image: 'photo_8.png' }, { image: 'photo_1.png' }];
    let a = ['image_line_1', 'image_line_2', 'image_line_3'];
    let image_line_1 = image_list_1.map((e) => {
        return (
            <div className='image'>
                <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={require('../assets/' + e.image)} />
            </div>
        );
    })

    let image_line_2 = image_list_2.map((e) => {
        return (
            <div className='image'>
                <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={require('../assets/' + e.image)} />
            </div>
        );
    })

    let image_line_3 = image_list_3.map((e) => {
        return (
            <div className='image'>
                <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={require('../assets/' + e.image)} />
            </div>
        );
    })

    let university_list_nav = university.map((e) => {
        return (
            <div className='card_box' onClick={() => navigate('/' + e._id)}>
                <div className='card_body'>
                    {(e.image === null || e.image === '') ? <img className='uni_image' src={require('../assets/no-image.png')} /> : <img className='uni_image' src={e.image} />}
                    <div className='card_content'>
                        <h3 className='card_tittle'>{e.universityName}</h3>
                    </div>
                </div>
            </div >
        );
    })

    const fetchUni = async () => {
        try {
            let response = await fetch("http://localhost:3001/api/university/get", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setuniversity(data);
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUni();
    }, []);


    return (
        <div>
            {/* <h1>Home</h1>
            <div>
                {university != []
                    ?
                    university.map((uni, index) => (
                        <>
                            <Link to={"/" + uni._id} key={index}>{uni.universityName}</Link>
                            <br />
                        </>
                    )
                    )
                    : <div></div>
                }
            </div> */}
            <Navbar />
            <home style={{ position: 'relative', top: '80px' }}>
                <div className='homepage'>
                    <div className='home_content'>
                        <div className='frame'>
                            <div class="circle"></div>
                            <div class="line left"></div>
                            <div class="line right"></div>
                            <div class="bracket left"></div>
                            <div class="bracket right"></div>
                            <div class="small top">collect</div>
                            <div class="big">moments</div>
                            <div class="small bottom">not things</div>
                            <div class="hide top"></div>
                            <div class="hide bottom"></div>
                        </div>
                    </div>

                    <div className='image_list'>
                        <div className={'image_line image_line_1'}>{image_line_1}</div>
                        <div className={'image_line image_line_2'}>{image_line_2}</div>
                        <div className={'image_line image_line_3'}>{image_line_3}</div>
                    </div>

                </div >
                <div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2 className='Universities'>Universities</h2>
                </div>
                <div className='grid grid-cols-3 relative gap-4 List'>
                    {university_list_nav}
                </div>
            </home>

        </div>
    )
}