import React from 'react';
import { Link } from "react-router-dom";


const SKU = () => {

    return(
        <>
            <h5>this is the sku module</h5>
            <button>
                <Link to='./create'>Create SKU</Link>
            </button>
        </>
    )
};

export default SKU;