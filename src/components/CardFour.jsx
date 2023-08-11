import React, { useEffect } from 'react';

const CardFour = ({users,userName,Icon,extraCss,profit}) => {

  useEffect(()=>{
    console.log(profit)
  },[])
  return (
    <div className={`rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${extraCss}`}>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        {Icon}
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {profit || users.length}

          </h4>
          <span className='text-sm font-medium'>{userName}</span>
        </div>
      </div>
    </div>
  )
}

export default CardFour;
