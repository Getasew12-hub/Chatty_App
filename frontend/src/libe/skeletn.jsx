import React from 'react'
import "./skeleten.css"

function Skeletn() {
  return (
    <div className='skeleten-container'>
        <div className="left item">
        <div className="avater"></div>
        <div className="message"></div>
        </div>
        <div className="right item">
       <div className="message"></div>
        <div className="avater"></div>
       
        </div>
    </div>
  )
}

function UserSkeleton(){
    return(
           <div className='skeleten-container'>
        
        <div className="left item">
        <div className="avater"></div>
        <div className="message"></div>
        </div>
    </div> 
    )
}
function Avater(){
    return(
           <div className='skeleten-container'>
        
        <div className="left item">
        <div className="avater"></div>
        
        </div>
    </div> 
    )
}

function Loadding(){
  return(
  <div className="loading_container">

  </div>)
}
export { Skeletn,UserSkeleton,Avater,Loadding}
