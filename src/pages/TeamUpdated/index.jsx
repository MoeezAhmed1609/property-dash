import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../Config';
import LoadingModal from '../../ReUseableComponent/LoadingModal';

export default function TeamUpdated() {
    const { id } = useParams();

    const [SingleData, setSingleData] = useState();
    const [isLoading, setLoading] = useState(false);

    const HandleData = () => {
        setLoading(true)
        const unsub = onSnapshot(doc(db, "cities", id), (doc) => {
            setLoading(false)
            console.log({ id: doc.id, ...doc.data() });
            setSingleData({ id: doc.id, ...doc.data() })
        });
    }

    useEffect(() => {

        HandleData()
        console.log(SingleData)
    }, [])
    return (
        <DefaultLayout>
            <>

                {
                    !SingleData ? <LoadingModal /> :
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-10 mx-auto flex flex-col">
                                <div className="lg:w-4/6 mx-auto">
                                    <div className="flex flex-col sm:flex-row mt-10">
                                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                                <img src={SingleData.img} className='rounded-full'/>
                                            </div>
                                            <div className="flex flex-col items-center text-center justify-center">
                                                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{SingleData.name}</h2>
                                                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                                                <p className="text-base">{SingleData.Desig}</p>
                                            </div>
                                        </div>
                                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                            <p className="leading-relaxed text-lg mb-4">{SingleData.Desc}</p>
                                            <a className="text-indigo-500 inline-flex items-center">Learn More
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                }



            </>

        </DefaultLayout>
    )
}
