import * as React from 'react';
import styled from "styled-components";
import AppContainer from "./AppContainer";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_GET_PRODUCT_BY_ID} from "../config/api-end-point";

const StyledProductEdit = styled.div`
  padding: 20px;
  color: #cdd9e5;
  
  .page-title {
    font-size: 25px;
    font-weight: bold;
  }
`

const ProductEdit = () => {

    const {id} = useParams()
    const [data, setData] = useState(null)
    const [isPending, setPending] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    if (!String.prototype.format) {
        String.prototype.format = function () {
            let args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;
            });
        };
    }

    useEffect(() => {
        axios.get(API_GET_PRODUCT_BY_ID.format(id))
            .then(response => {
                setData(response.data)
                setPending(false)
                setError(null)
            }).catch(error => {
            setPending(false)
            setError(error)
        })
    }, [])

    return (
        <AppContainer>
            <StyledProductEdit>
                <h1 className="page-title">Edit Product</h1>
            </StyledProductEdit>
        </AppContainer>
    )
}

export default ProductEdit