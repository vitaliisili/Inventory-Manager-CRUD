import * as React from 'react';
import styled from "styled-components";
import AppContainer from "./AppContainer";
import {LuFileEdit} from "react-icons/lu";
import {LuTrash} from "react-icons/lu";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_GET_ALL_PRODUCTS, API_DELETE_PRODUCT} from "../config/api-end-point";
import {convertDate} from "../service/utils";
import {useNavigate} from "react-router-dom";
import { IoIosArrowForward,  IoIosArrowBack} from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import {BiSearchAlt2} from "react-icons/bi";

const StyledProducts = styled.div`
  padding: 20px;
  color: #c1c1c1;

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-search {
    position: relative;

    &-input {
      background-color: #2f383f;
      border-radius: 40px;
      width: 270px;
      height: 30px;
      padding-left: 10px;
      color: #c1c1c1;
    }

    &-icon-wrapper {
      width: 40px;
      height: 30px;
      background-color: #384148;
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      border-bottom-right-radius: 40px;
      border-top-right-radius: 40px;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }


  .btn-add {
    background-color: #2d333b;
    color: #c1c1c1;
    padding: 10px 20px;
    border-radius: 2px;

    :hover {
      color: #cdd9e5;
      background-color: #343c44;
    }
  }

  .product-title {
    font-size: 30px;
  }

  .product-table {
    border: 1px solid #444c56;
    border-bottom: none;
    margin-top: 20px;
  }

  .product-table-row {
    display: grid;
    grid-template-columns: 1fr minmax(80px, 150px);
    border-bottom: 1px solid #444c56;

    :nth-child(2n) {
      background-color: rgb(47, 56, 63);
    }
  }

  .product-table-row-hover {
    :hover {
      background-color: rgba(147, 163, 180, 0.39);
    }
  }

  .product-table-column-wrapper {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 0.5fr 2fr 1fr 0.8fr 1fr;
  }

  .product-table-column {
    text-align: center;
    padding: 10px 10px;
    border-right: 1px solid #444c56;
  }

  .product-table-header-column {
    padding: 15px 10px;
    font-weight: bold;
  }

  .icon-wrapper {
    display: flex;
    justify-content: center;
  }

  .action-icon {
    font-size: 20px;
    cursor: pointer;
  }

  .edit-icon {
    color: #4c944f;
    margin-right: 10px;
  }

  .delete-icon {
    color: #f34337;
    margin-left: 10px;
  }

  .view-icon {
    color: #85855b;
    margin-right: 20px;
    font-size: 22px;
  }

  .last-item {
    border: none;
  }

  .table-pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .pagination-btn {
    display: flex;
    background-color: #2d333b;
    color: #c1c1c1;
    padding: 5px 0;
    border-radius: 2px;
    font-weight: bold;
    font-size: 12px;
    width: 80px;
    justify-content: center;

    :hover {
      color: #cdd9e5;
      background-color: #343c44;
    }
  }

  .pagination-btn-icon {
    margin-top: 1px;
  }

  .pagination-icon-prev {
    margin-right: 5px;
  }

  .pagination-icon-next {
    margin-left: 5px;
  }

  @media (min-width: 576px) {
    .product-table {
      font-size: 13px;
    }
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    .product-table {
      font-size: 14px;
    }
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    .product-table {
      font-size: 16px;
    }
  }

  // X-Large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
    padding: 60px;
  }

  // XX-Large devices (larger desktops, 1400px and up)
  @media (min-width: 1400px) {
    padding: 60px 150px;
  }
`

const ProductsTable = () => {
    const [data, setData] = useState(null)
    const [isPending, setPending] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [search, setSearch] = useState("")
    const [updateParam, setUpdateParam] = useState(true)

    useEffect(() => {
        axios.get(API_GET_ALL_PRODUCTS, {
            params: {
                page,
                size,
                search
            }
        })
            .then(response => {
                setData(response.data)
                setPending(false)
                setError(null)
            }).catch(error => {
            setPending(false)
            setError(error)
        })
    }, [updateParam, search, page, size])

    const redirectToProduct = (id) => {
        navigate(`/products/${id}`)
    }

    const editProduct = (id) => {
        navigate(`/products/edit/${id}`)
    }

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

    const removeProduct = (id) => {
        axios.delete(API_DELETE_PRODUCT.format(id))
            .then(response => {
                console.log(response.data)
                setUpdateParam(!updateParam)
            }).catch(error => {
            console.log(error)
        })
    }

    const prevPageHandler = () => {
        if (page !== 1) {
            setPage(page - 1)
        }

    }

    const nextPageHandler = () => {
        if (data.length >= 1) {
            setPage(page + 1)
        }
    }

    const onChangeHandler = (e) => {
        setPage(1)
        setSearch(e.target.value)
    }

    return (
        <AppContainer>
            <StyledProducts>
                <div className="content-header">
                    <h1 className="product-title">Products</h1>
                    <div className="product-search">
                        <input className="product-search-input"
                               type="search"
                               placeholder="search product"
                               value={search}
                               onChange={(e) => onChangeHandler(e)}/>
                        <div className="product-search-icon-wrapper">
                            <BiSearchAlt2 className="product-search-icon"/>
                        </div>
                    </div>
                    <Link to="/products/new"><button className="btn-add">Add new</button></Link>
                </div>
                <div className="product-table">
                    <div className="product-table-row">
                        <div className="product-table-column-wrapper">
                            <span className="product-table-column product-table-header-column">Id</span>
                            <span className="product-table-column product-table-header-column">Name</span>
                            <span className="product-table-column product-table-header-column">Price</span>
                            <span className="product-table-column product-table-header-column">Quantity</span>
                            <span className="product-table-column product-table-header-column">Date</span>
                        </div>
                        <span className="product-table-column product-table-header-column last-item">Action</span>
                    </div>
                    {data && data.map((product, index) => (
                        <div key={index} className="product-table-row product-table-row-hover">
                            <div className="product-table-column-wrapper">
                                <span className="product-table-column">{product.id}</span>
                                <span className="product-table-column">{product.name}</span>
                                <span className="product-table-column">{product.price}</span>
                                <span className="product-table-column">{product.quantity}</span>
                                <span className="product-table-column">{convertDate(product.created_at)}</span>
                            </div>
                            <span className="product-table-column last-item">
                                <div className="icon-wrapper">
                                    <MdOutlinePreview className="action-icon view-icon" onClick={() => redirectToProduct(product.id)}/>
                                    <LuFileEdit className="action-icon edit-icon" onClick={() => editProduct(product.id)}/>
                                    <LuTrash className="action-icon delete-icon" onClick={() => removeProduct(product.id)}/>
                                </div>
                            </span>
                        </div>
                    ))
                    }
                </div>
                <div className="table-pagination">
                    <button className="pagination-btn prev" onClick={prevPageHandler}>
                        <IoIosArrowBack className="pagination-btn-icon pagination-icon-prev"/>
                        <span className="pagination-btn-text">Previous</span>
                    </button>
                    <button className="pagination-btn next" onClick={nextPageHandler}>
                        <span className="pagination-btn-text">Next</span>
                        <IoIosArrowForward className="pagination-btn-icon pagination-icon-next"/>
                    </button>
                </div>
            </StyledProducts>
        </AppContainer>
    )
}

export default ProductsTable