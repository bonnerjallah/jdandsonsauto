import React from 'react'

import homestyle from "../style/homestyle.module.css"

const Home = () => {
    return (
        <div className={homestyle.mainContainer}>
            <h1>Driven by Quality, Priced for You!</h1>
            <img src="/benz.jpg" alt=""  height={300} width={1200}/>
        </div>
    )
}

export default Home