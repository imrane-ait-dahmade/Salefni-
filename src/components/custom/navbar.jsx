

export default function navBar({children}){
    return(

        <navbar className="flex justify-between items-center shadow-[#ffffff] px-4 py-2 ">
            <div className="flex flex-row items-center">
                <img src="/src/assets/logo.svg" className="w-12 h-12" alt="" />
                <span className="text-[#00C896] font-bold text-3xl">Salefni</span>
            </div>
            <div className="text-lg flex flex-row gap-2 text-white font-medium justify-around ">
                {children}
            </div>
        </navbar>
    );
}

