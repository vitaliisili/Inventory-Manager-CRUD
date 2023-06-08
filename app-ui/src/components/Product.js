import * as React from 'react';
import styled from "styled-components";
import AppContainer from "./AppContainer";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_GET_PRODUCT_BY_ID} from "../config/api-end-point";

const StyledProduct = styled.div`
  padding: 20px;
  color: #cdd9e5;

  .page-title {
    font-size: 25px;
    font-weight: bold;
  }

  .product-info-wrapper {
    margin-top: 20px;
    font-size: 20px;
  }

  .product-info-row {
    display: grid;
    grid-template-columns: 450px 1fr;
    margin-top: 20px;
    //border: 1px solid red;
    //width: fit-content;
  }

  .product-info {

    color: #a9a8a8;

    :nth-child(2) {
      margin-left: 40px;
    }
  }

  .product-info-text {
    color: #cdd9e5;
  }

`

const Product = () => {

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
            <StyledProduct>
                <h1 className="page-title">Product Info</h1>
                <div className="product-info-wrapper">
                    <div className="product-info-row">
                        <div className="product-info-column">
                            <div className="product-info product-info-name">Product Name: <span className="product-info-text">Spice - Peppercorn Melange</span></div>
                        </div>
                        <div className="product-info-column">
                            <div className="product-info product-info-date">Product Date: <span className="product-info-text">5-23-2023</span></div>
                        </div>
                    </div>
                    <div className="product-info-row">
                        <div className="product-info-column">
                            <div className="product-info product-info-quantity">Product Quantity: <span className="product-info-text">39</span></div>
                        </div>
                        <div className="product-info-column">
                            <div className="product-info product-info-price">Product Price: <span className="product-info-text">323.99</span></div>
                        </div>
                    </div>
                    <div className="product-info-row">
                        <div className="product-info-column"></div>
                        <div className="product-info-column">
                            <div className="product-info product-info-total_price">Product Total Value: <span className="product-info-text">324424.34</span></div>
                        </div>
                    </div>
                </div>
            </StyledProduct>
        </AppContainer>
    )
}

export default Product