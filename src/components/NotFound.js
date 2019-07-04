import React from 'react'
import img404 from './../404_nani.svg'


export default function NotFound(props) {

    return (
        <div>
            <h1>Not found</h1>
            <img src={img404} alt="404" />
        </div>
    )
}