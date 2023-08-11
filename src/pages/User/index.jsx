import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { Box, Image, Table, TableContainer, Text } from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../Config';
import "./index.css"
import { CSVLink } from 'react-csv';
import { deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom"


export default function User() {
    const [Users, setUsers] = useState([]);
    
    

    async function getData() {
        const q = query(collection(db, "Users"));
        
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            const cities = [...Users];
            querySnapshot.forEach((doc) => {
                cities.push({ id: doc.id, ...doc.data() });
            });
            console.log(cities)
            setUsers(cities)
        });
    }

    useEffect(() => {
        getData()
        console.log(Users)

    }, [])


    

    return (
        <Box>
            <DefaultLayout>
                <Box className="w-full h-auto ">
                    <div className="w-full h-[70px] flex justify-end items-center px-10 cursor-pointer">
                    <CSVLink filename={"users.csv"} data={Users}>Download Csv</CSVLink>
                    </div>

                    <div className="container mx-auto p-4">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full  rounded-md">
                                <thead>
                                    <tr className="bg-gray-200 bg-[#ff6b6b] text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left text-[#000]">Image</th>
                                        <th className="py-3 px-6 text-left text-[#000]">Name</th>
                                        <th className="py-3 px-6 text-left text-[#000]">Email</th>
                                        <th className="py-3 px-6 text-left text-[#000]">Status</th>
                                        <th className="py-3 px-6 text-left text-[#000]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {
                                        Users.map((item) => {
                                            return (
                                                <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-100">
                                                    <td className="py-3 px-6 text-left">
                                                        <img
                                                            src="https://placehold.co/600x400"
                                                            alt="User"
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-6 text-left text-[#000]">{item.name}</td>
                                                    <td className="py-3 px-6 text-left text-[#000]">{item.Email}</td>
                                                    <td className="py-3 px-6 text-left text-[#000]">{item.block ? 'block' : 'Active'}</td>
                                                    <td className="py-3 px-6 text-left text-[#000]">
                                                        <Link target='_blank' to="https://console.firebase.google.com/project/woven-space-356802/authentication/users"  className="border border-[#f9c80e] bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-2 rounded">
                                                            Actions
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </Box>
            </DefaultLayout>
        </Box>
    )
}
