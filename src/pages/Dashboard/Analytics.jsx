import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour';
import ChatCard from '../../components/ChatCard';
import TableOne from '../../components/TableOne'
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import ChartThree from '../../components/ChartThree';
import MapOne from '../../components/MapOne'
import { AiOutlineLoading } from 'react-icons/ai';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Config';
import {BsFillBuildingFill} from "react-icons/bs"
import {MdSubscriptions} from "react-icons/md"
import {AiOutlineUser} from "react-icons/ai"

const Analytics = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { data } = useFirestoreCollection('/Users');
  const [propertiesData, setpropertiesData] = useState([]);
  const [propertiesEnquiryTotal, setpropertiesEnquiry] = useState([]);
  const [brokerSubscription, setbrokerSubscription] = useState([]);
  const [profit ,setProfit] = useState();
  


  useEffect(() => {
    // Simulating a 3-second delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    console.log(data)
    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const propertiesGet = () => {
    const q = query(collection(db, "properties/"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ id: doc.id, ...doc.data() });
      });
      setpropertiesData(cities)
    });
  }

  const propertiesEnquiry = () => {
    const q = query(collection(db, "EnquiryForm/"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ id: doc.id, ...doc.data() });
      });
      setpropertiesEnquiry(cities)
    });
  }

  const BrokerSubscription = () => {
    const q = query(collection(db, "BrokerSubscription"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ id: doc.id, ...doc.data() });
      });
      setbrokerSubscription(cities)
    });
  }


  // const getTotalProfit = () => {
  //   const q = query(collection(db, "Users"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const cities = [];
  //     querySnapshot.forEach((doc) => {
  //       cities.push({ id: doc.id, ...doc.data() });
  //     });
  //     setbrokerSubscription(cities)
  //   });
  // }

  const TotalProfit = () => {
    const profit = data.filter(item => item.paid );
    console.log(profit)

    const ProfitValues = profit.map((item) => item.paid);
    console.log(ProfitValues)
    const total = calculateTotal(ProfitValues)
    console.log(total)
    setProfit(total)
  }


  function calculateTotal(currencyArray) {
    const total = currencyArray.reduce((accumulator, currentValue) => {
      const value = parseFloat(currentValue.replace(/[^0-9.-]+/g, ''));
      return accumulator + value;
    }, 0);
  
    return total.toFixed(2); // Convert the total back to a formatted currency string
  }

  useEffect(() => {
    propertiesGet()
    propertiesEnquiry()
    BrokerSubscription()
    TotalProfit()
    console.log(data)
  }, [])





  if (isLoading) {
    return (
      <div className="preloader">
        <AiOutlineLoading className="loading-icon" />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardFour users={propertiesData} extraCss = {''} userName={'Total Properties'} Icon = {<BsFillBuildingFill />} />
        <CardFour users={brokerSubscription} extraCss = {''} userName={'Broker Subscription'} Icon={<MdSubscriptions />} />
        <CardFour users={propertiesEnquiryTotal} extraCss = {''} userName={'Total Enquiries'} />
        <CardFour users={data} extraCss = {''} userName={'Total Users'} Icon={<AiOutlineUser />}/>
        <CardFour users={data} profit={profit} extraCss = {'col-span-2'} userName={'Total Profit'} Icon={<AiOutlineUser />}/>
        <CardFour users={data} extraCss = {'col-span-2'} userName={'Total Users'} Icon={<AiOutlineUser />}/>
      </div>

      <div className='mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        {/* <ChartOne /> */}
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        {/* <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div> */}
        {/* <ChatCard /> */}
      </div>
    </DefaultLayout>
  )
}

export default Analytics;
