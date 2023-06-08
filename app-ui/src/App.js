import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductsTable from "./components/ProductsTable";
import NotFound404 from "./components/NotFound404";
import CreateProduct from "./components/CreateProduct";
import Product from "./components/Product";
import ProductEdit from "./components/ProductEdit";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route exact path="/products" element={<ProductsTable/>}/>
                <Route exact path="/products/:id" element={<Product/>}/>
                <Route exact path="/products/edit/:id" element={<ProductEdit/>}/>
                <Route exact path="/products/new" element={<CreateProduct/>}/>
                <Route path="/*" element={<NotFound404/>}/>
            </Routes>
        </BrowserRouter>
    )
}


export default App;
