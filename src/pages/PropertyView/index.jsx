import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PropertyView() {
    const [SinglePropertyData,setSinglePropertyData] = useState();
    const state = useSelector(state => state.Single.property)
    useEffect(()=>{
        console.log(state)
        setSinglePropertyData(state)
    },[])
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden py-10 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-2">
                        <div className="flex items-center justify-center">
                            <img
                                src={state.property_urls[0]}
                                alt="Property Image"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <img
                               src={state.property_urls[1]}
                                alt="Property Thumbnail 1"
                                className="w-full h-auto object-cover cursor-pointer"
                            />
                            <img
                                src={state.property_urls[2]}
                                alt="Property Thumbnail 2"
                                className="w-full h-auto object-cover cursor-pointer"
                            />
                            <img
                                src={state.property_urls[0]}
                                alt="Property Thumbnail 3"
                                className="w-full h-auto object-cover cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="col-span-1 p-6">
                        <h1 className="text-3xl font-bold mb-4">{state.Property_Name}</h1>
                        <p className="text-gray-600 mb-2">Location: {state.property_Location}</p>
                        <p className="text-gray-800 mb-2">
                            Overview: {state.Overview}
                        </p>
                        <p className="text-gray-800 mb-2">Price: ${state.Property_Price}</p>
                        <p className="text-gray-800 mb-2">Bedrooms: {state.Propert_Bathroom}</p>
                        <p className="text-gray-800 mb-2">Bathrooms: 3</p>
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">Additional Details</h2>
                            <ul className="list-disc list-inside">
                                <li>Spacious living room</li>
                                <li>Modern kitchen</li>
                                <li>Swimming pool</li>
                                <li>Garden</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
