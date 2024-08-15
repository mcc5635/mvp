import React from "react"
import "../styling/AssetLibrary.css"
import PortfolioCard from "../Cards/PortfolioCard"
import AddNew from "../AddPortfolio"
import DropDownPortfolio from "../Dropdowns/PortfolioDropdown"

const Portfolio = () => {
  return (
    <div className="ml-32">
      <h1 style={{ marginTop: '3%', textAlign: 'left', color: 'rgb(31,7,77)', fontSize: 70 }}>Welcome</h1>
      <div className="text-lg font-light text-center text-gray-500  border-gray-200 dark:text-gray-400 dark:border-gray-700">

        <ul className="flex flex-wrap ">
          <li className="me-6">
            <a
              href="#"
              className="inline-block p-2 text-[#1F074D] border-b-4 font-bold border-[#1F074D] rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
            >
              All
            </a>
          </li>
          <li className="me-6">
            <a
              href="#"

              className="inline-block p-2 border-b-2  border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              aria-current="page"
            >
              Personal Portfolios
            </a>
          </li>
          <li className="me-6">
            <a
              href="#"
              className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Hotel Inc
            </a>
          </li>
          <li className="me-6">
            <a
              href="#"
              className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Shared with me
            </a>
          </li>

        </ul>
      </div>


      <div className="flex mt-5 mb-5 justify-between mr-20" >
        
        <div>
          <button type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-[#1f074d] focus:outline-none bg-[#e8e7f4] rounded-2xl border-4 border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 ">All Scenarios</button>
          <button type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-[#1f074d] focus:outline-none bg-[#e8e7f4] rounded-2xl border-4 border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100">Combined Physical Risk</button>
        </div>
        <div>
          <DropDownPortfolio></DropDownPortfolio>
        </div>
      </div>

      <div className="flex space-x-12">
        <AddNew></AddNew>
        <PortfolioCard text={'E'} color={'#ab3560'} title={"High Risk Hotels in Canada to Monitor"}  />
        <PortfolioCard text={'C'} color={'#e17471'} assets={30} />
        <PortfolioCard text={'B'} color={'#f8bc8a'}/>
        <PortfolioCard text={'B'} color={'#f8bc8a'}/>
      </div>

    </div>
  )
}

export default Portfolio

