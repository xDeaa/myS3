import React, { useState } from 'react'
import User from '../api/models/User'

type UserContextProps = {
    user?: User
    setUser: (user?: User) => void
}

const UserContext = React.createContext<UserContextProps>({
    setUser: (_) => { }
})

type UserProviderProps = {
    userInStorage?: User
}

export const UserProvider: React.FC<UserProviderProps> = ({ userInStorage, children }) => {
    const [user, setUserState] = useState<User | undefined>(userInStorage)

    const setUser = (user?: User) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
        setUserState(user)
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export const UserConsumer = UserContext.Consumer

export default UserContext