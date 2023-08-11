import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Config';

export default function Contact() {

    const [contact, setContact] = useState([]);

    const ContactData = async () => {
        const q = query(collection(db, "/Contact__Form"));
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push({ id: doc.id, ...doc.data() });
            });
            setContact(cities)
        });
    }
    useEffect(() => {
        ContactData()
    }, [])

    return (
        <DefaultLayout>

            <div className="w-full h-screen">
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full whitespace-no-wrap">
                            <Thead>
                                <Tr className="text-xs font-semibold Tracking-wide text-left text-gray-500 uppercase border-b bg-gray-100">
                                    <Th className="px-4 py-3">Name</Th>
                                    <Th className="px-4 py-3">Phone</Th>
                                    <Th className="px-4 py-3">Email</Th>
                                    <Th className="px-4 py-3">Subject</Th>
                                    <Th className="px-4 py-3">Message</Th>
                                </Tr>
                            </Thead>
                            <Tbody className="bg-white divide-y">
                                {
                                    contact.map((item) => {
                                        return (
                                            <Tr>
                                                <Td className="px-4 py-3">{item.name}</Td>
                                                <Td className="px-4 py-3">{item.phone}</Td>
                                                <Td className="px-4 py-3">{item.Email}</Td>
                                                <Td className="px-4 py-3">{item.Subject}</Td>
                                                <Td className="px-4 py-3">{item.Message}</Td>
                                            </Tr>
                                        )
                                    })
                                }

                            </Tbody>
                        </Table>
                    </div>
                </div>


            </div>


        </DefaultLayout>
    )
}
