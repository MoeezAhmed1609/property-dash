import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../Config';
import { ImCross } from "react-icons/im"
import { BsFillTrashFill } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import Modal from '../../../ReUseableComponent/Modal';
import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function TeamView() {
    const [Teams, seTeams] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [SingleTeamName, setSingleTeamName] = useState();
    const [SingleTeamCity, setSingleTeamCity] = useState();
    const [SingleTeamDesig, setSingleTeamDesig] = useState();
    const [SingleTeamDesc, setSingleTeamDesc] = useState();
    const [updatedID, setUpdatedID] = useState();
    const navigate = useNavigate();

    const TeamView = () => {
        const q = query(collection(db, "Team"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push({ id: doc.id, ...doc.data() });
            });
            seTeams(cities)
            console.log(cities)
            console.log(cities);
        });
    }

    const HandleDelete = async (id) => {
        await deleteDoc(doc(db, "Team", id));
    }
    const openModal = (item) => {
        setSingleTeamName(item.name)
        setSingleTeamCity(item.City)
        setSingleTeamDesig(item.Desig)
        setSingleTeamDesc(item.Desc)
        setUpdatedID(item.id)
        console.log(item)
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };



    // ----------------- UPDATED ---------------------------------------
    const HandleUpdate = async () =>{

        const frankDocRef = doc(db, "Team", updatedID);
        await updateDoc(frankDocRef, {
            City:SingleTeamCity,
            Desc:SingleTeamDesc,
            Desig:SingleTeamDesig,
            name:SingleTeamName
        });
        setModalOpen(false)


    }

    useEffect(() => {
        TeamView()
        console.log(Teams)
    }, [])

    return (
        <React.Fragment>
            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        {
                            Teams.map((item) => {
                                return (
                                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full cursor-pointer" >
                                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg relative">
                                            <img onClick={()=>navigate(`${item.id}`)} alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.img} />
                                            <div className="flex-grow">
                                                <h2 onClick={()=>navigate(`${item.id}`)} className="text-gray-900 title-font font-medium">{item.name}</h2>
                                                <p onClick={()=>navigate(`${item.id}`)} className="text-gray-500">UI Designer</p>
                                            </div>
                                            <div className="px-4 h-full flex flex-col justify-around items-center">
                                                <BsFillTrashFill onClick={() => HandleDelete(item.id)} className='cursor-pointer' />
                                                <AiFillEdit onClick={() => openModal(item)} className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>

            <Modal isOpen={modalOpen} onClose={closeModal}>
                <div className="flex flex-col py-2 px-2 w-[400px]">

                    <FormControl className='w-full'>
                        <FormLabel>Member Name</FormLabel>
                        <Input type='text' value={SingleTeamName} onChange={(e) => setSingleTeamName(e.target.value)} className='w-full py-2 border border-gray-300 px-2' />
                    </FormControl>
                    <FormControl className='w-full'>
                        <FormLabel>City</FormLabel>
                        <Input type='text' value={SingleTeamCity} onChange={(e) => setSingleTeamCity(e.target.value)} className='w-full py-2 border border-gray-300 px-2' />
                    </FormControl>
                    <FormControl className='w-full'>
                        <FormLabel>Designation</FormLabel>
                        <Input type='text' value={SingleTeamDesig} onChange={(e) => setSingleTeamDesig(e.target.value)} className='w-full py-2 border border-gray-300 px-2' />
                    </FormControl>
                    <FormControl className='w-full'>
                        <FormLabel>Designation</FormLabel>
                        <Input type='text' value={SingleTeamDesc} onChange={(e) => setSingleTeamDesc(e.target.value)} className='w-full py-2 border border-gray-300 px-2' />
                    </FormControl>
                    <Button onClick={HandleUpdate} colorScheme='teal' variant='solid' backgroundColor={'#008080'} color={'#fff'} className='my-2 border border-gray-400 py-2 rounded-md'>
                        Updated
                    </Button>

                </div>
            </Modal>
        </React.Fragment>

    )
}
