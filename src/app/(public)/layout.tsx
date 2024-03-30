import React from 'react'
import MyHeader from '../MyHeader'

const PublicLayout = ({children}:{children:React.ReactNode})=> {
    return (
        <>
        <MyHeader/>
        {children}
        </>
    )
}

export default PublicLayout;