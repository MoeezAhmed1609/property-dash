import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import useFirestoreCollection from '../../../../hooks/useFirestoreCollection';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import LoadingModal from '../../../../ReUseableComponent/LoadingModal';
import Modal from '../../../../ReUseableComponent/Modal';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { db } from '../../../../Config';
import LazyLoadImage from '../../../../ReUseableComponent/LazyLoadImage';
import EllipsesText1 from '../../../../ReUseableComponent/EllipsesText1';
import useFirestoreDelete from '../../../../hooks/useFirestoreDelete';

export default function AboutView() {
    const { data: cities, isLoading } = useFirestoreCollection("AboutUSA");
    const [modalOpen, setModalOpen] = useState(false);

    const [Singename, setSingleName] = useState();
    const [desc, setDesc] = useState();
    const [id, setID] = useState();

    const {
        isDeleting,
        error,
        isDeleted,
        setCollectionPath,
        setDocumentId,
    } = useFirestoreDelete();


    const handleDelete = async (id) => {
        setCollectionPath('AboutUSA');
        setDocumentId(id);
    }

    const openModal = (item) => {
        setSingleName(item.name)
        setDesc(item.Desc)
        setID(item.id)
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const HandleUpdate = async () => {
        const frankDocRef = doc(db, "AboutUSA", id);
        await updateDoc(frankDocRef, {
            name: Singename,
            Desc: desc
        });
        setModalOpen(false)

    }


    useEffect(() => {
        console.log(cities)
    }, [])


    return (
        <React.Fragment>

            {
                isLoading ? <LoadingModal /> : <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {
                                cities.map((item) => {
                                    return (
                                        <div className="p-4 md:w-[40%]">
                                            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                                <LazyLoadImage className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.img} alt="blog" />
                                                <div className="p-6">
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.name}</h1>
                                                    {/* <p className="leading-relaxed mb-3">{item.Desc}</p> */}
                                                    <EllipsesText1 text={item.Desc} maxWords={30} className="leading-relaxed mb-3" />
                                                    <div className="flex items-center flex-wrap ">
                                                        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M5 12h14" />
                                                                <path d="M12 5l7 7-7 7" />
                                                            </svg>
                                                        </a>
                                                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                            <BsFillTrashFill onClick={() => handleDelete(item.id)} className='cursor-pointer' />
                                                        </span>
                                                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                            <AiFillEdit onClick={() => openModal(item)} className='cursor-pointer' />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </section>
            }


            <Modal isOpen={modalOpen} onClose={closeModal}>
                <div className="flex flex-col py-2 px-2 w-[400px]">

                    <FormControl className='w-full'>
                        <FormLabel>Member Name</FormLabel>
                        <Input type='text' value={Singename} onChange={(e) => setSingleName(e.target.value)} className='w-full py-2 border border-gray-300 px-2' />
                    </FormControl>
                    <FormControl className='w-full'>
                        <FormLabel>Designation</FormLabel>
                        <Input type='text' value={desc} onChange={(e) => setDesc(e.target.value)} className='w-full py-2 border border-gray-300 px-2' />
                    </FormControl>
                    <Button onClick={HandleUpdate} colorScheme='teal' variant='solid' backgroundColor={'#008080'} color={'#fff'} className='my-2 border border-gray-400 py-2 rounded-md'>
                        Updated
                    </Button>

                </div>
            </Modal>

        </React.Fragment>

    )
}
