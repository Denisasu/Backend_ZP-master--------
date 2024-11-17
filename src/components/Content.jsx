import '../App.css'
import React, { useContext } from 'react';


function Content({children}) {

  return (
      <div className={`car`}>
          {children}
      </div>
  )
}

export default Content
