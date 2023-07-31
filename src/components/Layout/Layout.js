import React from 'react'
import Navbarboot from '../navbar/Navbarboot'

export default function Layout({ children }) {
     return <>
          <Navbarboot />
          {children}
     </>

}

