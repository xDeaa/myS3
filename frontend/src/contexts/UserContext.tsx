import React, { useState } from 'react'
import User from '../api/models/User'

type SetUserFunction = (user?: User) => void

type UserContextProps = {
    user?: User
    setUser: SetUserFunction
}

const UserContext = React.createContext<UserContextProps>({
    setUser: (_) => { }
})

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | undefined>()

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export const UserConsumer = UserContext.Consumer

export default UserContext