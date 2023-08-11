import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    query,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../Config";
import { useDispatch } from "react-redux";
import { SingleProperty } from "../../Redux/Action/SingleProperty";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";


export default function Subscription() {
    const [Users, setUsers] = useState([]);
    const [Status, setStatus] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading } = useFirestoreQuery("/Users");


    useEffect(() => {
        console.log(data)
    }, [])


    const users = () => {
        const q = query(collection(db, "Users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push({ id: doc.id, ...doc.data() })
            });
            console.log(cities)
            setUsers(cities)
        });
    }

    React.useEffect(() => {
        users()
    }, [])

    return (
        <DefaultLayout>
            <div className="mb-2 flex h-[60px] w-full items-center justify-end border-2 border-white pr-2">
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Purpose
                    </MenuButton>
                    <MenuList className="pl-2">
                        <MenuItem
                            bgColor={"#fff "}
                            onClick={() => setStatus("Rent")}
                            className="mx-1 rounded-sm border  border-black px-5 py-2"
                        >
                            Rent
                        </MenuItem>
                        <MenuItem
                            bgColor={"#fff "}
                            onClick={() => setStatus("Buy")}
                            className="mx-1 rounded-sm border  border-black px-5 py-2"
                        >
                            Buy
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-lg">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Paid
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Paid on
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Expires
                                        </th>

                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Actount Option
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {
                                        Users.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-gray-900 text-sm font-medium">
                                                                    {item?.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-gray-900 text-sm">
                                                            {item?.Email}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-gray-900 text-sm">
                                                        {item.paid ? item.paid : 'Null'}
                                                        </div>
                                                    </td>
                                                    <td

                                                        className="cursor-pointer whitespace-nowrap px-6 py-4"
                                                    >
                                                        <div className="text-gray-900 text-sm">
                                                        {item.paidOn ? item.paidOn : 'Null'}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className="text-green-800 inline-flex cursor-pointer rounded-full   px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                                                            
                                                        >
                                                            {item.expires ? item.expires : 'Null'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span

                                                            className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                                                            style={{ borderColor: "#6ee7b7" }}
                                                        >
                                                            {item.AccountOptions}
                                                        </span>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
