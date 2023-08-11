import React, { useEffect, useState } from 'react'
import BlogCard from './Widgets/BlogCard'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../Config';
import useFirestoreQuery from '../../../hooks/useFirestoreQuery';

export default function BlogContainer() {
    const [blogs, setBlogs] = useState([]);
    const { data, isLoading } = useFirestoreQuery("/blogs");


   

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {
                            data.map((item) => {
                                return (
                                <BlogCard id={item.id} title={item.title} Description={item.Description} image={item.images} />
                                )
                            })
                        }

                    </div>
                </div>
            </section>

        </div>
    )
}
