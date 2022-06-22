import React, { createContext, useState } from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [users, setUsers] = useState()
    return (
        <UserContext.Provider value={{ users,setUsers }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider