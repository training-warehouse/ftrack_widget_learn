import {createContext, useContext} from 'react'

const SessionContext = createContext(null)
export const SessionProvider = SessionContext.Provider

function useSession() {
    return useContext(SessionContext)
}

export default useSession

