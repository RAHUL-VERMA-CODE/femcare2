import React, { createContext, useState } from 'react'
export const GlobalContext= createContext(null);

export const GlobalContextProvider=(props)=>{
    const [prescriptionData, setPrescriptionData] = useState(null);

    return(
        <GlobalContext.Provider value={{prescriptionData, setPrescriptionData}}>
            {props.children}
        </GlobalContext.Provider>
    )
} 