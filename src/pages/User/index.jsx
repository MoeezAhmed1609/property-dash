import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { Box, Image, Table, TableContainer, Text } from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../Config';
import "./index.css"
import { CSVLink } from 'react-csv';

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
                                <thead style={{ background: '#24303f', }}>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left text-[#ffffff]">Image</th>
                                        <th className="py-3 px-6 text-left text-[#ffffff]">Name</th>
                                        <th className="py-3 px-6 text-left text-[#ffffff]">Email</th>
                                        <th className="py-3 px-6 text-left text-[#ffffff]">Status</th>
                                        <th className="py-3 px-6 text-left text-[#ffffff]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm" style={{ background: 'white', color: 'black' }}>
                                    {
                                        Users.map((item) => {
                                            return (
                                                <tr className="border-b border-gray-300 hover:bg-gray-100">
                                                    <td className="py-3 px-6 text-left">
                                                        <img
                                                            src="https://placehold.co/600x400"
                                                            alt="User Image"
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-6 text-left">{item.name}</td>
                                                    <td className="py-3 px-6 text-left">{item.Email}</td>
                                                    <td className="py-3 px-6 text-left">{item.block ? 'block' : 'Active'}</td>
                                                    <td className="py-3 px-6 text-left">
                                                        <a href='https://console.firebase.google.com/u/1/project/woven-space-356802/authentication/users' target='_blank'>
                                                            <button className="border border-[#f9c80e] bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded">
                                                                Action
                                                            </button>
                                                        </a>
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
