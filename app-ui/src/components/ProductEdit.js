import * as React from 'react';
import styled from "styled-components";
import AppContainer from "./AppContainer";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_GET_PRODUCT_BY_ID, API_UPDATE_PRODUCT} from "../config/api-end-point";

const StyledProductEdit = styled.div`
  padding: 40px;
  color: #cdd9e5;
  display: flex;
  align-items: center;
  flex-direction: column;

  .page-title {
    font-size: 30px;
  }

  .input-name {
    grid-area: name;
  }

  .input-price {
    grid-area: price;
  }

  .input-quantity {
    grid-area: quantity;
  }

  .page-content {
    display: flex;
    justify-content: center;
  }

  .form-box {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
  }

  .form-row {
    display: flex;
  }


  .input {
    padding: 10px;
    background-color: #2f383f;
    color: #c1c1c1;
    border-radius: 4px;
    border: 1px solid #505c64;

    :focus {
      border: 1px solid #719371;
    }
  }

  .form-column-max {
    width: 100%;
  }

  .input-max {
    width: 100%;
  }

  .form-column {
    margin: 10px;
  }

  .input-btn {
    :focus {
      border: 1px solid #505c64;
    }

    :hover {
      background-color: #4d5b62;
    }
  }
`

const ProductEdit = () => {

    const {id} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [isPending, setPending] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

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
                setError(false)
                setPending(false)
                setName(response.data.name)
                setPrice(response.data.price)
                setQuantity(response.data.quantity)
            }).catch(error => {
            console.log(error)
        })
    }, [])

    const closeModal = (timeleft) => {
        const timer = setInterval(() => {
            timeleft--

            if (timeleft <= 0) {
                clearInterval(timer)
                setError(false)
                setModal(false)
            }
        }, 1000)
    }

    const updateProduct = () => {
        axios(API_UPDATE_PRODUCT.format(id), {
            method: 'PUT',
            data: {
                name,
                price,
                quantity
            }
        }).then(response => {
            setError(false)
            setPending(false)
            setModal(true)
            closeModal(5)
        }).catch(error => {
            setError(true)
            console.log(error)
            setModal(true)
            closeModal(5)
        })
    }

    return (
        <AppContainer>
            <StyledProductEdit>
                {
                    modal &&
                    <div className={error ? "modal modal-error": "modal modal-success"}>
                        <span
                            className="modal-message">{error ? "Check form fields and try again" : "Product has been updated successfully"}</span>
                    </div>
                }
                <h1 className='page-title'>Update product</h1>
                <div className="page-content">
                    <div className="form-box">
                        <div className="form-row">
                            <div className="form-column form-column-max">
                                <input type="text"
                                       className="input input-max"
                                       placeholder="product name"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-column">
                                <input type="text"
                                       className="input input-price"
                                       placeholder="product price"
                                       value={price}
                                       onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className="form-column">
                                <input type="text"
                                       className="input input-quantity"
                                       placeholder="product quantity"
                                       value={quantity}
                                       onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-column form-column-max">
                                <input type="button"
                                       className="input input-max input-btn"
                                       value="Update Product"
                                       onClick={updateProduct}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </StyledProductEdit>
        </AppContainer>
    )
}

export default ProductEdit