import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import EllipsesText from '../ReUseableComponent/EllipsesText'
import EllipsesText1 from '../ReUseableComponent/EllipsesText1'

export default function CardLayout({ title, img, description,onDelete }) {
    return (
    
            <Box className="max-w-md mx-auto bg-white h-[400px] rounded-xl shadow-md overflow-hidden">
                <Image className="h-48 w-full object-cover" src={img} alt="[Property Name]" />
                <Box className="p-6">
                    {/* <h2 className="text-lg font-semibold text-gray-900 mb-2 max-w-[300px] max-h-[40px] overflow-y-hidden ">{title}</h2> */}
                    <EllipsesText text={title} lineClamp={1} className="text-xl font-black text-black" />
                    {/* <p className="text-gray-700 text-base mb-4">{description}</p> */}
                    <EllipsesText1 text={description} lineClamp={2} className="text-lg" maxWords={20} />

                    <Box className="flex justify-end">
                        <button onClick={onDelete} className="px-4 py-2 cursor-pointer mr-2 bg-red-500 text-black rounded hover:bg-red-600">Delete</button>
                        <button className="px-4 py-2 cursor-pointer bg-cyan-500 text-black rounded hover:bg-blue-600">Update</button>
                    </Box>
                </Box>
            </Box>
     
    )
}
