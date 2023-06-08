import * as React from 'react';
import styled from "styled-components";
import AppContainer from "./AppContainer";
import {
    LuPackage2,
    LuFilePlus,
    LuClipboardType,
    LuCrown,
    LuMilkOff,
    LuCalendarDays,
    LuJapaneseYen
} from "react-icons/lu";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_GET_ALL_PRODUCTS, API_GET_PRODUCT_TOTAL_VALUE, API_GET_PRODUCT_TOTAL_ITEMS} from "../config/api-end-point";

const StyledDashboard = styled.div`
  padding: 20px;

  .card-total {
    grid-area: total;
  }

  .card-today {
    grid-area: today;
  }

  .card-month {
    grid-area: month;
  }

  .card-total-value {
    grid-area: total-value;
  }

  .card-type {
    grid-area: type;
  }

  .card-expensive {
    grid-area: expensive;
  }

  .card-stock {
    grid-area: stock;
  }

  .container {
    display: grid;
    //grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 
    "total type stock"
    "expensive expensive total-value"
    "today month total-value";
    grid-gap: 30px;
  }

  .card {
    border: 1px solid #555557;
    padding: 20px 25px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;

    :hover {
      background-color: rgba(216, 216, 220, 0.03);
    }
  }

  .card-col {
    display: flex;
    flex-direction: column;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #2d333b;
  }

  .card-icon {
    font-size: 30px;
    color: #54a454;
  }

  .card-icon-red {
    color: #cc6b6b;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    color: #737a7e;
    margin-left: 20px;
  }

  .card-col-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-col-title {
    font-size: 20px;
  }

  .card-data {
    margin-top: 10px;
    align-self: end;
    font-size: 25px;
    color: #a8b1b2;
    font-family: 'Varela Round', serif;
  }

  .card-col-data {
    margin-top: 20px;
    font-family: 'Varela Round', serif;
    color: #a8b1b2;
    font-size: 40px;
  }

  .product-info {
    display: flex;
    margin-top: 20px;
  }

  .product-info-column {
    padding-right: 40px;
  }

  .product-info-data {
    margin-top: 10px;
    color: #a8b1b2;
  }

  @media (min-width: 576px) {
    .container {
      display: grid;
      grid-template-areas: 
      "total type"
      "expensive expensive "
      "today total-value"
      "stock total-value"
      "month ...";
      grid-gap: 30px;
    }
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    .container {
      display: grid;
      grid-template-areas: 
      "total type stock"
      "expensive expensive total-value"
      "today month total-value";
      grid-gap: 30px;
    }
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {

  }

  // X-Large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
    padding: 40px;
  }

  // XX-Large devices (larger desktops, 1400px and up)
  @media (min-width: 1400px) {
    padding: 100px;
  }
`


const Dashboard = () => {

    const [totalItems, setTotalItems] = useState(null)
    const [totalValue, setTotalValue] = useState(null)
    const [data, setData] = useState(null)
    const [mostExpensive, setMostExpensive] = useState(null)

    useEffect(() => {
        axios.get(API_GET_PRODUCT_TOTAL_ITEMS)
            .then(response => {
                setTotalItems(response.data)
            }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        axios.get(API_GET_PRODUCT_TOTAL_VALUE)
            .then(response => {
                setTotalValue(response.data)
            }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        axios.get(API_GET_ALL_PRODUCTS)
            .then(response => {
                setData(response.data)
                setMostExpensive(getMostExpensive(response.data))
            }).catch(error => {
            console.log(error)
        })
    }, [])

    const getMostExpensive = (array = []) => {
        let max = 0
        let index = -1
        for (let i = 0; i < array.length; i++) {
            if (array[i].price > max) {
                max = array[i].price
                index = i
            }
        }
        if (index > -1) {
            return array[index]
        }

        return {
            "name": "No Products",
            "price": 0,
            "quantity": 0
        }
    }

    const getNotInStock = (array) => {
        let quantityCount = 0
        for (let i = 0; i < array.length; i++) {
            if (array[i].quantity === 0){
                quantityCount += 1
            }
        }
        return quantityCount
    }

    const getProductAddedThisMonth = (array) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return array.filter(product => {
            const productDate = new Date(product.created_at);
            const productMonth = productDate.getMonth();
            const productYear = productDate.getFullYear();
            return productMonth === currentMonth && productYear === currentYear;
        })
    }

    const getProductsAddedToday = (array) => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay()
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return array.filter(product => {
            const productDate = new Date(product.created_at);
            const productDay = productDate.getDay()
            const productMonth = productDate.getMonth();
            const productYear = productDate.getFullYear();
            return productMonth === currentMonth && productYear === currentYear && productDay === currentDay;
        })
    }

    return (
        <AppContainer>
            <StyledDashboard>
                <div className="container">
                    <div className="card card-total">
                        <div className="icon-wrapper">
                            <LuPackage2 className="card-icon"/>
                        </div>
                        <div className="card-content">
                            <div className="card-title total-products-title">Total Products Quantity</div>
                            {
                                totalItems &&
                                <div className="card-data card-data-total-products">{totalItems.total_items}</div>
                            }
                        </div>
                    </div>

                    <div className="card card-type">
                        <div className="icon-wrapper">
                            <LuClipboardType className="card-icon"/>
                        </div>
                        <div className="card-content">
                            <div className="card-title total-products-title">Total Unique Products</div>
                            {
                                data &&
                                <div className="card-data card-data-total-products">{data.length}</div>
                            }
                        </div>
                    </div>

                    <div className="card card-stock">
                        <div className="icon-wrapper">
                            <LuMilkOff className="card-icon card-icon-red"/>
                        </div>
                        <div className="card-content">
                            <div className="card-title total-products-title">Not In stock</div>
                            {
                                data &&
                                <div className="card-data card-data-total-products">{getNotInStock(data)}</div>
                            }

                        </div>
                    </div>

                    <div className="card card-expensive">
                        <div className="icon-wrapper">
                            <LuCrown className="card-icon"/>
                        </div>
                        {
                            mostExpensive &&
                            <div className="card-content">
                                <div className="card-title expensive-products-title">Most Expensive Product</div>
                                <div className="product-info">
                                    <div className="product-info-column">
                                        <div className="product-info-label">Product name:</div>
                                        <div className="product-info-data product-info-data-name">{mostExpensive.name}</div>
                                    </div>

                                    <div className="product-info-column">
                                        <div className="product-info-label">Price:</div>
                                        <div className="product-info-data product-info-data-price">{mostExpensive.price}</div>
                                    </div>

                                    <div className="product-info-column">
                                        <div className="product-info-label">Quantity:</div>
                                        <div className="product-info-data product-info-data-quantity">{mostExpensive.quantity}</div>
                                    </div>

                                    <div className="product-info-column">
                                        <div className="product-info-label">Total Value:</div>
                                        <div className="product-info-data product-info-data-quantity">{mostExpensive.price * mostExpensive.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="card card-today">
                        <div className="icon-wrapper">
                            <LuFilePlus className="card-icon"/>
                        </div>
                        <div className="card-content">
                            <div className="card-title total-products-title">Added Today</div>
                            {
                                data &&
                                <div className="card-data card-data-total-products">{getProductsAddedToday(data).length}</div>
                            }
                        </div>
                    </div>

                    <div className="card card-month">
                        <div className="icon-wrapper">
                            <LuCalendarDays className="card-icon"/>
                        </div>
                        <div className="card-content">
                            <div className="card-title">Added This Month</div>
                            {
                                data &&
                                <div className="card-data">{getProductAddedThisMonth(data).length}</div>
                            }

                        </div>
                    </div>

                    <div className="card card-col card-total-value">
                        <div className="icon-wrapper">
                            <LuJapaneseYen className="card-icon"/>
                        </div>
                        <div className="card-col-content">
                            <div className="card-col-title">Total Products Value</div>
                            {
                                totalValue &&
                                <div className="card-col-data">{totalValue.total_value.toFixed(2)}</div>
                            }
                        </div>
                    </div>
                </div>
            </StyledDashboard>
        </AppContainer>
    )
}

export default Dashboard