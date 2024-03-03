import React from 'react';
import Navbar from './navbar';
import '../css/about.css';

export default function About() {
    return (
        <div>
            <Navbar />
            <div className='backdev_tittle py-5'>BackEnd Developer</div>
            <div className='backend'>
                <div className='dev_content'>
                    <img src='https://t3.ftcdn.net/jpg/06/36/69/86/360_F_636698674_DroChEj5eWmZiaZOSDMnj8hcDqqw74Fp.jpg' onMouseEnter={() => {
                        document.getElementsByClassName('dev_circle')[0].classList.add('dev_circle_animate');
                        document.getElementsByClassName('uppar')[0].classList.add('uppar_animate');
                        document.getElementsByClassName('lower')[0].classList.add('lower_animate');

                    }} onMouseLeave={() => {
                        document.getElementsByClassName('dev_circle')[0].classList.remove('dev_circle_animate');
                        document.getElementsByClassName('uppar')[0].classList.remove('uppar_animate');
                        document.getElementsByClassName('lower')[0].classList.remove('lower_animate');
                    }} className='dev_circle' />
                    <div className='back_dev'>
                        <div className='sub uppar'>
                            <div className='pt-20 text-center'><span className=' font-bold'>Name:</span> Grisha Desai</div>
                            <div className=' text-center pt-4'><span className=' font-bold'>Email:</span> grishadesai78@gmail.com</div>
                        </div>
                        <div className='sub lower'>
                            <div>
                                <div className=' text-center'><span className=' font-bold'>college:</span> Darshan University</div>
                                <div className=' text-center pt-4'><span className=' font-bold'>Sem:</span> 4th</div></div>
                        </div>
                    </div>
                </div><div className='dev_content'>
                    <img src='https://img.freepik.com/free-photo/handsome-cheerful-curly-guy-cross-arms-chest-smiling-like-professional-confident-person_176420-27708.jpg' onMouseEnter={() => {
                        document.getElementsByClassName('dev_circle')[1].classList.add('dev_circle_animate');
                        document.getElementsByClassName('uppar')[1].classList.add('uppar_animate');
                        document.getElementsByClassName('lower')[1].classList.add('lower_animate');

                    }} onMouseLeave={() => {
                        document.getElementsByClassName('dev_circle')[1].classList.remove('dev_circle_animate');
                        document.getElementsByClassName('uppar')[1].classList.remove('uppar_animate');
                        document.getElementsByClassName('lower')[1].classList.remove('lower_animate');
                    }} className='dev_circle' />
                    <div className='back_dev'>
                        <div className='sub uppar'>
                            <div className='pt-20 text-center'><span className=' font-bold'>Name:</span> Madhav Leharu</div>
                            <div className=' text-center pt-4'><span className=' font-bold'>Email:</span> madhavleharu@gmail.com</div>
                        </div>
                        <div className='sub lower'>
                            <div>
                                <div className=' text-center'><span className=' font-bold'>college:</span> Darshan University</div>
                                <div className=' text-center pt-4'><span className=' font-bold'>Sem:</span> 4th</div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='backdev_tittle py-5'>FrontEnt Developer</div>
            <div className='backend'>
                <div className='dev_content'>
                    <img src='https://static.vecteezy.com/system/resources/thumbnails/023/886/157/small/young-smiling-businesswoman-standing-in-blur-background-of-office-generative-ai-photo.jpg' onMouseEnter={() => {
                        document.getElementsByClassName('dev_circle')[2].classList.add('dev_circle_animate');
                        document.getElementsByClassName('uppar')[2].classList.add('uppar_animate');
                        document.getElementsByClassName('lower')[2].classList.add('lower_animate');

                    }} onMouseLeave={() => {
                        document.getElementsByClassName('dev_circle')[2].classList.remove('dev_circle_animate');
                        document.getElementsByClassName('uppar')[2].classList.remove('uppar_animate');
                        document.getElementsByClassName('lower')[2].classList.remove('lower_animate');
                    }} className='dev_circle' />
                    <div className='back_dev'>
                        <div className='sub uppar'>
                            <div className='pt-20 text-center'><span className=' font-bold'>Name:</span> Yagna Gajjar</div>
                            <div className=' text-center pt-4'><span className=' font-bold'>Email:</span> yagnagangajaliya@gmail.com</div>
                        </div>
                        <div className='sub lower'>
                            <div>
                                <div className=' text-center'><span className=' font-bold'>college:</span> Darshan University</div>
                                <div className=' text-center pt-4'><span className=' font-bold'>Sem:</span> 4th</div></div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}
