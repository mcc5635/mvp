import { PlusIcon } from '@heroicons/react/20/solid'

const AddNew = () => {
    return (
      <div className=" min-h-96 min-w-72 max-w-72 border  border-dashed border-[#1f074d] rounded-3xl  sm:p-6 dark:bg-gray-800 dark:border-gray-700 text-left flex flex-col">
  
              <div className=''>
                  <div className='text-white text-sm mb-1'>
                     
                  </div>
                  <div className="flex items-center justify-between mb-4">
  
                      <h5 className="text-xl font-bold leading-none text-white dark:text-white">
                          
                      </h5>
  
                  </div>
              </div>
              <div className=" w-full p-2 flex justify-center mt-14 ">
                    <PlusIcon className="size-24 text-[#1f074d]"/>
              </div>
  
              <div className=" w-full mt-auto">
  
                  <div className="pt-3 pb-0 sm:pt-4 mt-auto ">
                      <div className='flex items-end justify-center text-[#907cca] text-2xl'>
                          <div className='flex '>
                              New Portfolio
                          </div>
  
                      </div>
                  </div>
              </div>
          </div>
    )
  }

  export default AddNew