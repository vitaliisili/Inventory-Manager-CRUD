import pytest
from app.schemas import product_schemas


def test_create_post_success(client):
    res = client.post("/api/products", json={"name": "new product", "price": 12.2, "quantity": 12})
    assert res.status_code == 201
    assert res.json().get("name") == "new product"


@pytest.mark.parametrize("name, price, quantity, status_code", [
    (None, 12, 2, 422),
    ('Test_product', None, 2, 422),
    ('Test_product', 12, None, 422),
    (None, None, None, 422)
])
def test_create_post_invalid_data(client, name, price, quantity, status_code):
    res = client.post("/api/products", json={"name": name, "price": price, "quantity": quantity})
    assert res.status_code == status_code


def test_get_all_products(client, test_products):
    res = client.get('/api/products')
    products = list(map(lambda prod: product_schemas.Product(**prod), res.json()))
    assert res.status_code == 200
    assert len(products) == len(test_products)


def test_get_product_by_id_success(client, test_products):
    res = client.get(f'/api/products/{test_products[0].id}')
    product = product_schemas.Product(**res.json())
    assert res.status_code == 200
    assert product.name == test_products[0].name


def test_get_product_by_id_not_found(client):
    res = client.get('/api/products/9999999')
    assert res.status_code == 404


@pytest.mark.parametrize("products_size, status_code", [
    (1, 200),
    (2, 200),
    (3, 200)
])
def test_get_product_pagination_size(client, test_products, products_size, status_code):
    res = client.get(f'/api/products?&size={products_size}')
    products = list(map(lambda prod: product_schemas.Product(**prod), res.json()))
    assert res.status_code == status_code
    assert len(products) == products_size


@pytest.mark.parametrize("page, products_size, status_code,", [
    (1, 2, 200),
    (2, 1, 200),
])
def test_get_product_pagination_page(client, test_products, page, products_size, status_code):
    res = client.get(f'/api/products?page={page}&size=2')
    products = list(map(lambda prod: product_schemas.Product(**prod), res.json()))
    assert res.status_code == status_code
    assert len(products) == products_size


def test_get_product_search(client, test_products):
    res = client.get(f'/api/products?search={test_products[0].name}')
    products = list(map(lambda prod: product_schemas.Product(**prod), res.json()))
    assert res.status_code == 200
    assert products[0].name == test_products[0].name


def test_get_products_total_items(client, test_products):
    res = client.get('/api/products/total-items')
    products = product_schemas.ProductTotalItems(**res.json())
    total = sum(prod.quantity for prod in test_products)
    assert res.status_code == 200
    assert products.total_items == total


def test_get_products_total_value(client, test_products):
    res = client.get('/api/products/total-value')
    products = product_schemas.ProductTotal(**res.json())
    total = sum(prod.price for prod in test_products)
    assert res.status_code == 200
    assert products.total_value == total


def test_delete_product_success(client, test_products):
    res = client.delete(f'/api/products/{test_products[0].id}')
    assert res.status_code == 204


def test_delete_product_not_found(client):
    res = client.delete('/api/products/99999999999')
    assert res.status_code == 404
    assert res.json().get('detail') == "product with id: 99999999999 not found"


@pytest.mark.parametrize("name, price, quantity", [
    ("Updated name", 12.4, 4),
    ("First Product", 1, 1)
])
def test_update_product_success(client, test_products, name, price, quantity):
    res = client.put(f'/api/products/{test_products[0].id}', json={"name": name, "price": price, "quantity": quantity})
    product = product_schemas.Product(**res.json())
    assert res.status_code == 200
    assert product.name == name


@pytest.mark.parametrize("name, price, quantity, id, status_code", [
    ("Updated name", 12.4, 4, 99999999, 404),
    (None, 1, 1, 1, 422),
    ('Updated name', None, 1, 1, 422),
    ('Updated name', 1, None, 1, 422)
])
def test_update_product_failed(client, test_products, name, price, quantity, id, status_code):
    res = client.put(f'/api/products/{id}', json={"name": name, "price": price, "quantity": quantity})
    assert res.status_code == status_code
