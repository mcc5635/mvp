import React from 'react'
import { EllipsisVerticalIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function PortfolioCard(props) {
    return (
        <div className=" min-h-96 min-w-72 max-w-72 bg-[#1F074D]  border border-gray-200 rounded-3xl shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 text-left flex flex-col">

            <div className='mt-2'>
                <div className='text-white text-sm mb-1'>
                    <p>{`${props.assets || 21} assets`}</p>
                </div>
                <div className="flex items-center justify-between mb-4">

                    <h5 className="text-2xl font-bold leading-none text-white dark:text-white">
                        {props.title || "High Risk Hotels in Canada to Monitor"}
                    </h5>

                </div>
            </div>
            <div className=" w-full p-2">
                        <img src="/graph.png" alt="logo" width='400' height='600' />
            </div>

            <div className=" w-full mt-auto">

                <div className="pt-3 pb-0 sm:pt-4 mt-auto ">
                    <div className='flex items-end justify-between mt-'>
                        <div className='flex '>
                            <div className='px-4 py-2 rounded text-3xl text-white font-bold w-max text-center' style={{backgroundColor: props.color? props.color : '#ab3560' }}>
                                <p>{props.text}</p>
                            </div>
                        </div>

                        <div>
                            <div className='flex'>
                                <LockClosedIcon className='size-7 text-white' />
                                <EllipsisVerticalIcon className='size-7 text-white' />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
