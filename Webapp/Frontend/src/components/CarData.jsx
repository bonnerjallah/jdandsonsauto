import React from 'react'

const CarData = ({carDiscription, loading}) => {

    if(loading) {
        return <h2>Loading...</h2>
    }


    return (
        <div>
            {carDiscription}
        </div>
    )
}

export default CarData