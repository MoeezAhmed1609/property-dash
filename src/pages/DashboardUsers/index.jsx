import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { CSVLink } from 'react-csv'
import { Button, Input, Text, useToast } from '@chakra-ui/react'
import Modal from '../../ReUseableComponent/Modal';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Config';
import { toast } from 'react-toastify';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import UserTable from './UserTable';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';






export default function DashboardUsers() {
    const [isOpen, setisOpen] = useState(false);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const user = useSelector(state => state.DashReducer.login);
    


    // -------------- USER USESTATES ---------------------------------
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // -------------- USER USESTATES ---------------------------------

    // -------------- ADD A USER ------------------------------------
    const HandleAddUser = async () => {
        console.log('App')
        if(Name == '' || Phone  == '' || Email == '' || password == '') {
            toast("Wow so easy!")
        }

        console.log(Name)
        console.log(Phone)
        console.log(Email)
        console.log(password)


        await createUserWithEmailAndPassword(auth, Email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                Handle(user)
               
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    
    const Handle = async (user) =>{
        await setDoc(doc(db, "Dashboard_Users", user.uid), {
            name: Name,
            phone: Phone,
            country: "USA",
            Email,
            tags,
            timestamp: moment().calendar(),

        });
        toast("User Added Successfully!")
    }


    // -------------- ADD A USER ------------------------------------

    const onClose = () => setisOpen(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };



    const renderTags = () => {
        return tags.map((tag, index) => (
            <div
                key={index}
                className="bg-[#000] text-white px-2 py-1 rounded-md m-1 flex items-center"
            >
                <span className="mr-2">{tag}</span>
                <button
                    className="text-sm font-semibold focus:outline-none"
                    onClick={() => handleTagRemove(tag)}
                >
                    &times;
                </button>
            </div>
        ));
    };


    return (
        <DefaultLayout>
            <div className="w-full h-screen">
                <div className="w-full h-[70px] flex justify-between items-center px-10 cursor-pointer">
                    {/* <Button onClick={() => setisOpen(true)} className='bg-white px-10 py-3 rounded-md text-backgroundbg'>Create New User</Button> */}
                    <CSVLink data={'user'} className='bg-white px-10 py-3 rounded-md text-backgroundbg'>Download Csv</CSVLink>
                </div>
                <div className="">
                    <UserTable />
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} style={{ top: 90, height: 550, overflowY: 'auto', borderRadius: 20, }}>
                <div className="flex flex-col gap-2 mx-w-[300px] overflow-y-auto">
                    <div className="">
                        <label htmlFor="" className='block mb-2 px-2'>Name: </label>
                        <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter User Name: ' className='w-[300px] px-2 py-3 border border-gray-300 rounded-md focus:border-none' />
                    </div>

                    <div className="">
                        <label htmlFor="" className='block mb-2 px-2'>Phone: </label>
                        <input type='number' onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Phone: ' className='w-[300px] px-2 py-3 border border-gray-300 rounded-md focus:border-none' />
                    </div>

                    <div className="">
                        <label htmlFor="" className='block mb-2 px-2'>Email: </label>
                        <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email: ' className='w-[300px] px-2 py-3 border border-gray-300 rounded-md focus:border-none' />
                    </div>
                    <div className="">
                        <label htmlFor="" className='block mb-2 px-2'>Password: </label>
                        <input type='Password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Phone: ' className='w-[300px] px-2 py-3 border border-gray-300 rounded-md focus:border-none' />
                    </div>

                    <div className="">
                        <label htmlFor="" className='block mb-2 px-2'>Authenticated Screen: </label>

                        <div className="flex flex-wrap mt-2">

                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                placeholder={tags.length > 0 ? '' : 'Enter tags...'}
                            />
                            {renderTags()}
                        </div>

                    </div>
                    <div  className="w-full flex rounded-md justify-center items-center py-2 bg-black">
                        <button onClick={HandleAddUser}>Add User</button>
                    </div>



                </div>
            </Modal>

        </DefaultLayout>
    )
}
