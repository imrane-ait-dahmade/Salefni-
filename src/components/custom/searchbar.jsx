import  React from "react"
import {Search} from "lucide-react" 
export default function SearchBar(){
    return (
         <div className="flex-1 flex items-center">
            <input
              type="text"
              placeholder="Search in Marrakech"
              className="w-full bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm md:text-base font-medium"
            />
               <button
            type="submit"
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors duration-200 ml-2"
            aria-label="Rechercher"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
          </div>
    )
}