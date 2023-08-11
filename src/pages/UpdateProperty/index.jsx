import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { GrOverview } from 'react-icons/gr'
import DefaultLayout from '../../layout/DefaultLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../Config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default function UpdateProperty() {
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState();
    const [propertyBedroom, setpropertyBedroom] = useState();
    const [propertyLocation, setpropertyLocation] = useState();
    const [propertyUserName, setpropertyUserName] = useState();
    const [propertyBathroom, setpropertyBathroom] = useState();
    const [propertyLivingSpace, setpropertyLivingSpace] = useState();
    const [propertyName, setpropertyName] = useState();
    const [propertyPrice, setpropertyPrice] = useState();
    const [propertyType, setpropertyType] = useState();
    const [propertyFacility, setpropertyFacility] = useState();
    const [propertyPool, setpropertyPool] = useState();
    const [propertyOverview, setpropertyOverview] = useState();
    const [AboutProject, setAboutProject] = useState();
    const [distancefromkm, setdistancefromkm] = useState();
    const [distancefrommin, setdistancefrommin] = useState();
    const [locationPlan, setlocationPlan] = useState();
    const [paymentPlan, setpaymentPlan] = useState();
    const navigate = useNavigate();

    const getData = async () => {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            setpropertyBedroom(docSnap.data().property_BedRoom);
            setpropertyLocation(docSnap.data().property_Location);
            setpropertyUserName(docSnap.data().property_userName);
            setpropertyBathroom(docSnap.data().Propert_Bathroom);
            setpropertyLivingSpace(docSnap.data().Propert_Living_space);
            setpropertyName(docSnap.data().Property_Name);
            setpropertyPrice(docSnap.data().Property_Price);
            setpropertyType(docSnap.data().Property_Type);
            setpropertyFacility(docSnap.data().property_facility);
            setpropertyPool(docSnap.data().property_pool);
            setpropertyOverview(docSnap.data().Overview);
            setAboutProject(docSnap.data().Overview);
            setdistancefromkm(docSnap.data().DistanceFromKM);
            setdistancefrommin(docSnap.data().DistanceFromMinutes);
            setlocationPlan(docSnap.data().LocationPlan);
            setpaymentPlan(docSnap.data().PaymenyPlan);
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        console.log(id)
        getData()
    }, [])



    const HandleUpdateData = async (e) => {
        e.preventDefault()
        const propertyRef = doc(db, "properties", id);
        await updateDoc(propertyRef, {
            AboutProjects: AboutProject,
            DistanceFromKM:distancefromkm,
            DistanceFromMinutes:distancefrommin,
            LocationPlan:locationPlan,
            Overview:propertyOverview,
            PaymenyPlan:paymentPlan,
            Propert_Bathroom:propertyBathroom,
            Propert_Living_space:propertyLivingSpace,
            Property_Name:propertyName,
            Property_Price:propertyPrice,
            Property_Type:propertyType,
            property_BedRoom:propertyBedroom,
            property_Location:propertyLocation,
            property_facility:propertyFacility,
            property_pool:propertyPool
        });
        navigate("/properties")

    }

    return (
        <DefaultLayout>
            <Box className='col-span-5 xl:col-span-3'>
                <Box className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <Box className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                        <Text className='font-medium text-black dark:text-white'>
                            Add Property Information
                        </Text>
                    </Box>
                    <Box className='p-7'>
                        <form onSubmit={HandleUpdateData}>
                            <Box className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='fullName'
                                    >
                                        Property Name
                                    </label>
                                    <Box className='relative'>
                                        <span className='absolute left-4.5 top-4'>
                                            <BsFillHouseAddFill />
                                        </span>
                                        <Input
                                            className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                            type='text'
                                            name='fullName'
                                            id='fullName'
                                            value={propertyName}
                                            onChange={(e) => setpropertyName(e.target.value)}
                                            placeholder='Enter Property Name'
                                        />
                                    </Box>
                                </Box>

                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='phoneNumber'
                                    >
                                        Price
                                    </label>
                                    <Input
                                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        type='text'
                                        value={propertyPrice}
                                        onChange={(e) => setpropertyPrice(e.target.value)}
                                        placeholder='Enter Price'
                                        defaultValue='$00'
                                    />
                                </Box>
                            </Box>

                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='emailAddress'
                                >
                                    Overview
                                </label>
                                <Box className='relative'>
                                    <span className='absolute left-4.5 top-4'>
                                        <GrOverview color='#D3D3D3' />
                                    </span>
                                    <textarea
                                        className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        type='text'
                                        value={propertyOverview}
                                        onChange={(e) => setpropertyOverview(e.target.value)}
                                        placeholder='Enter Overview'

                                    />
                                </Box>
                            </Box>
                            <Box className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='fullName'
                                    >
                                        Property Type
                                    </label>
                                    <Box className='relative'>
                                        <span className='absolute left-4.5 top-4'>
                                            <BsFillHouseAddFill />
                                        </span>
                                        <Input
                                            className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                            value={propertyType}
                                            onChange={(e) => setpropertyType(e.target.value)}
                                            placeholder='Enter Property Name'
                                        />
                                    </Box>
                                </Box>

                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='phoneNumber'
                                    >
                                        Bathroom
                                    </label>
                                    <Input
                                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        type='text'
                                        value={propertyBathroom}
                                        onChange={(e) => setpropertyBathroom(e.target.value)}
                                        placeholder='Enter Price'
                                        defaultValue='$00'
                                    />
                                </Box>
                            </Box>
                            <Box className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='fullName'
                                    >
                                        Living Space
                                    </label>
                                    <Box className='relative'>
                                        <span className='absolute left-4.5 top-4'>
                                            <BsFillHouseAddFill />
                                        </span>
                                        <Input
                                            className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                            type='text'
                                            name='fullName'
                                            value={propertyLivingSpace}
                                            onChange={(e) => setpropertyLivingSpace(e.target.value)}
                                            placeholder='Enter Property Name'
                                        />
                                    </Box>
                                </Box>

                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='phoneNumber'
                                    >
                                        Bed rooms
                                    </label>
                                    <Input
                                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        type='text'
                                        name='phoneNumber'
                                        value={propertyBedroom ? propertyBedroom : ' '}
                                        onChange={(e) => setpropertyBedroom(e.target.value)}
                                        placeholder='Enter Price'
                                        defaultValue='$00'
                                    />
                                </Box>
                            </Box>
                            <Box className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='fullName'
                                    >
                                        Location
                                    </label>
                                    <Box className='relative'>
                                        <span className='absolute left-4.5 top-4'>
                                            {/* <BsFillHouseAddFill /> */}
                                        </span>
                                        <Input
                                            className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                            type='text'
                                            name='fullName'
                                            value={propertyLocation}
                                            onChange={(e) => setpropertyLocation(e.target.value)}
                                            placeholder='Enter Property Name'
                                        />
                                    </Box>
                                </Box>

                                <Box className='w-full sm:w-1/2'>
                                    <label
                                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                                        htmlFor='phoneNumber'
                                    >
                                        Pool
                                    </label>
                                    <Input
                                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        type='text'
                                        value={propertyPool}
                                        onChange={(e) => setpropertyPool(e.target.value)}
                                        placeholder='Enter Price'
                                        defaultValue='$00'
                                    />
                                </Box>
                            </Box>

                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    Username
                                </label>
                                <Input
                                    className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                    type='text'
                                    value={propertyUserName}
                                    onChange={(e) => setpropertyUserName(e.target.value)}
                                    placeholder='devidjhon24'

                                />
                            </Box>
                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    Payment Plan and Information
                                </label>
                                <Input
                                    className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                    type='text'
                                    value={paymentPlan}
                                    onChange={(e) => setpaymentPlan(e.target.value)}
                                    placeholder='devidjhon24'

                                />
                            </Box>

                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    Facilities And Location
                                </label>
                                <Box className='relative'>
                                    <span className='absolute left-4.5 top-4'>
                                        <svg
                                            className='fill-current'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g opacity='0.8' clipPath='url(#clip0_88_10224)'>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z'
                                                    fill=''
                                                />
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z'
                                                    fill=''
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_88_10224'>
                                                    <rect width='20' height='20' fill='white' />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <textarea
                                        className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        name='bio'
                                        value={propertyFacility}
                                        rows='6'
                                        onChange={(e) => setpropertyFacility(e.target.value)}
                                        placeholder='Write your bio here'
                                    ></textarea>
                                </Box>
                            </Box>
                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    About the project and properties
                                </label>
                                <Box className='relative'>
                                    <span className='absolute left-4.5 top-4'>
                                        <svg
                                            className='fill-current'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g opacity='0.8' clipPath='url(#clip0_88_10224)'>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z'
                                                    fill=''
                                                />
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z'
                                                    fill=''
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_88_10224'>
                                                    <rect width='20' height='20' fill='white' />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <textarea
                                        className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        name='bio'
                                        value={AboutProject}
                                        rows='6'
                                        onChange={(e) => setAboutProject(e.target.value)}
                                        placeholder='Write your bio here'
                                    ></textarea>
                                </Box>
                            </Box>
                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    Location Plan in
                                </label>
                                <Box className='relative'>
                                    <span className='absolute left-4.5 top-4'>
                                        <svg
                                            className='fill-current'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g opacity='0.8' clipPath='url(#clip0_88_10224)'>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z'
                                                    fill=''
                                                />
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z'
                                                    fill=''
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_88_10224'>
                                                    <rect width='20' height='20' fill='white' />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <textarea
                                        className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        name='bio'
                                        value={locationPlan}
                                        rows='6'
                                        onChange={(e) => setlocationPlan(e.target.value)}
                                        placeholder='Write your bio here'
                                    ></textarea>
                                </Box>
                            </Box>
                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    Distances By Minutes
                                </label>
                                <Box className='relative'>
                                    <span className='absolute left-4.5 top-4'>
                                        <svg
                                            className='fill-current'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g opacity='0.8' clipPath='url(#clip0_88_10224)'>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z'
                                                    fill=''
                                                />
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z'
                                                    fill=''
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_88_10224'>
                                                    <rect width='20' height='20' fill='white' />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <textarea
                                        className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        name='bio'
                                        value={distancefrommin}
                                        rows='6'
                                        onChange={(e) => setdistancefrommin(e.target.value)}
                                        placeholder='Enter Distances in Minutes with seprate by (,) 2 minutes away from Metro , 4 minutes away from Metro Bus'
                                    ></textarea>
                                </Box>
                            </Box>
                            <Box className='mb-5.5'>
                                <label
                                    className='mb-3 block text-sm font-medium text-black dark:text-white'
                                    htmlFor='Username'
                                >
                                    Distances By KM
                                </label>
                                <Box className='relative'>
                                    <span className='absolute left-4.5 top-4'>
                                        <svg
                                            className='fill-current'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g opacity='0.8' clipPath='url(#clip0_88_10224)'>
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z'
                                                    fill=''
                                                />
                                                <path
                                                    fillRule='evenodd'
                                                    clipRule='evenodd'
                                                    d='M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z'
                                                    fill=''
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_88_10224'>
                                                    <rect width='20' height='20' fill='white' />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <textarea
                                        className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                        name='bio'
                                        value={distancefromkm}
                                        rows='6'
                                        onChange={(e) => setdistancefromkm(e.target.value)}
                                        placeholder='Enter Distances in KM with seprate by (,) 1.0 km away from Metro , 2.0km away from Metro Bus'
                                    ></textarea>
                                </Box>
                            </Box>

                            <Box className='flex justify-end gap-4.5'>
                                <Button
                                    className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                                    type='submit'
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1'
                                    type='submit'

                                >

                                    Save
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </DefaultLayout>

    )
}
