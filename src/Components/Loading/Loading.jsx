import React from 'react'
import { PropagateLoader } from 'react-spinners'

export default function Loading() {
  return <>
    <div className=' flex justify-center items-center h-screen'>
        <PropagateLoader
        color="#00f8ff"
        size={20}/>
    </div>
  </>
}
