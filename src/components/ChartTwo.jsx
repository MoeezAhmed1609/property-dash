import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../Config';

const ChartTwo = () => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [series, setSeries] = useState([
    {
      name: 'Revenue',
      data: data,
    },
  ]);

  useEffect(()=>{
    console.log(data)
  },[])

  // Function to extract numeric amount from a string
  function extractAmountFromString(str) {
    const match = str.match(/\d+/);
    if (match) {
      return parseInt(match[0]);
    }
    return null;
  }

  useEffect(() => {
    const dataFetch = async () => {
      const q = query(collection(db, 'Users'));
      const cities = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        cities.push({ id: doc.id, ...doc.data() });
      });

      const newData = cities.filter((item) => item.paidOn && item.paid);

      // Calculate the total paid amounts for each date
      const paidByDate = {};
      newData.forEach((item) => {
        const date = item.paidOn;
        const amount = extractAmountFromString(item.paid);
        if (date && amount) {
          if (paidByDate[date]) {
            paidByDate[date] += amount;
          } else {
            paidByDate[date] = amount;
          }
        }
      });

      // Extract dates and calculated amounts
      const newDates = Object.keys(paidByDate);
      const newPaid = newDates.map((date) => paidByDate[date]);

      setData(newPaid);
      setDates(newDates);

      setSeries([
        {
          name: 'Revenue',
          data: newPaid,
        },
      ]);
    };

    dataFetch();
  }, []);

  const options = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      // ... Other chart options ...
    },
    xaxis: {
      categories: dates,
    },
  };

  return (
    <div className='col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4'>
      {/* ... Rest of your JSX ... */}
      <div>
        <div id='chartTwo' className='-ml-5 -mb-9'>
          <ReactApexChart options={options} series={series} type='bar' height={350} />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
