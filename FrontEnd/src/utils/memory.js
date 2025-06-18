import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllErrorMsg } from 'redux/actions/errorMsgAction';
import { getAllCode_All } from 'redux/actions/AllcodeAction';
import { restoreCartFromLocalStorage } from 'redux/actions/cartAction';
import { getAllCategories } from 'redux/actions/categoryAction';

function LoadMemory() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllErrorMsg());
        dispatch(getAllCode_All());
        dispatch(restoreCartFromLocalStorage());
        dispatch(getAllCategories());
    }, []);

    return <></>
}

export default LoadMemory;