import { Box, Button, Input } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { db, storage } from '../../../Config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import moment from "moment"


export default function AddTestimonials() {
    const [title, setTitle] = useState();
    const [description, setdescription] = useState();
    const [img, setImg] = useState();

    const HandleTestimonial = async (e) => {
        e.preventDefault()
        console.log(title)
        console.log(description)
        console.log(img)

        const TestimonialImageRef = ref(storage, `Testimonialimage/${img.name}`);
        await uploadBytes(TestimonialImageRef, img).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        await getDownloadURL(ref(storage, TestimonialImageRef))
            .then(async (url) => {
                console.log(url)
                const docRef = await addDoc(collection(db, "Testimonials"), {
                    Title: title,
                    desc:description,
                    img:url,
                    timestamp: moment().format("MMM Do YY")
                });
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.log(error)

            });
    }


    return (
        <Box className="lg:max-w-[95%] md:max-w-[95%] sm:max-w-[99%] my-4 mx-auto bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create a Post</h2>
            <form onSubmit={HandleTestimonial}>
                <Box className="mb-4">
                    <label htmlFor="title" className="block font-semibold text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </Box>
                <Box className="mb-4">
                    <label
                        htmlFor="description"
                        className="block font-semibold text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        onChange={(e) => setdescription(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </Box>
                <Box className="mb-4">
                    <label htmlFor="image" className="block font-semibold text-gray-700">
                        Image Upload
                    </label>
                    <Input
                        type="file"
                        id="image"
                        onChange={(e) => setImg(e.target.files[0])}
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </Box>
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-[#1c2434] border-2 border-[#1c2434] hover:text-[#fff] hover:bg-[#1c2434] font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Submit
                </Button>
            </form>
        </Box>

    )
}
