import React, { useEffect } from 'react';
import Navbar from './navbar';
import '../css/Admin_View.css';
import myinitobject from '../data';

export default function Admin_View() {

    const user = myinitobject.username;
    console.log(user);

    useEffect(() => {   
        const fetchuni = async () => {  
            try{
                const res = await fetch(`http://localhost:3001/api/user/getuser/${user}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(res);
                
            }catch (err) {  
                console.log(err);
            }
        }
        fetchuni();
    },[])


    let competetion_list = [{ name: 'competetion 1', student: ['student 1.1', 'student 1.2', 'student 1.3', 'student 1.4', 'student 1.5'] }, { name: 'competetion 2', student: ['student 2.1', 'student 2.2', 'student 2.3', 'student 2.4', 'student 2.5'] }, { name: 'competetion 3', student: ['student 3.1', 'student 3.2', 'student 3.3', 'student 3.4', 'student 3.5'] }, { name: 'competetion 4', student: ['student 4.1', 'student 4.2', 'student 4.3', 'student 4.4', 'student 4.5'] }, { name: 'competetion 5', student: ['student 5.1', 'student 5.2', 'student 5.3', 'student 5.4', 'student 5.5'] }];

    let competetion = competetion_list.map((e, index) => {

        let participant_list = e.student.map((e) => {
            return (
                <>
                    <div className='flex justify-between w-96 ms-20 mt-4 text-lg text-stone-500 '>

                        <div className='flex competetion_name'>
                            {e}</div>
                        <div className=''>
                            <i class="fa fa-pencil-square-o text-blue-600" aria-hidden="true"></i>
                            <i class="fa fa-trash ps-10 text-red-600" aria-hidden="true"></i>
                        </div>

                    </div>
                </>
            );
        })

        return (
            <>
                <div className='flex justify-between w-full ms-20 mt-4 text-lg text-stone-500'>

                    <div className='flex competetion_name'>
                        <div><i onClick={() => {
                            document.getElementsByClassName('participant_list')[index].classList.toggle('competetion_list_hover')
                            document.getElementsByClassName('fa-chevron-down')[index].classList.toggle('fa-chevron-down_hover')
                        }} class="fa fa-chevron-down me-2" aria-hidden="true"></i></div>
                        {e.name}</div>
                    <div className=''>
                        <i class="fa fa-pencil-square-o text-blue-600" aria-hidden="true"></i>
                        <i class="fa fa-trash ps-10 text-red-600" aria-hidden="true"></i>
                    </div>

                </div>
                <div className='ms-20 participant_list rounded-3xl'>

                    <div className='flex justify-around mt-4'>
                        <div className='text-sm text-stone-500'>Starting Date: 12-12-2002</div>
                        <div className='text-sm text-stone-500'>Ending Date: 12-12-2002</div></div>{participant_list}</div>

            </>
        );
    })

    return (
        <>
            <Navbar />
            <div className='flex justify-center '>
                <div className='event_list mt-36 p-20 bg-[#b1b6c922] rounded-3xl'>
                    <div>
                        <div>
                            Event Name
                        </div>
                        <div className='competetion_list'>
                            {competetion}
                        </div>
                    </div>

                    <div className=''>
                        <i class="fa fa-pencil-square-o text-blue-600" aria-hidden="true"></i>
                        <i class="fa fa-trash ps-10 text-red-600" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
