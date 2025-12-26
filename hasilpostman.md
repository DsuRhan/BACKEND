GET http://localhost:5000

{
    "message": "Halo pemilik API Key: secret-api-key-123! Hari 5 – MVC E-Commerce + Service",
    "waktu_proses": "1ms"
}

GET http://localhost:5000/api/products

{
    "success": true,
    "message": "Daftar produk",
    "data": [
        {
            "id": 1,
            "nama": "Laptop Gaming",
            "deskripsi": "Intel i7, RTX 3060",
            "harga": 15000000,
            "stok": 5
        },
        {
            "id": 2,
            "nama": "Keyboard Mekanikal",
            "deskripsi": "Blue Switch, RGB",
            "harga": 800000,
            "stok": 20
        },
        {
            "id": 3,
            "nama": "Mouse Wireless",
            "deskripsi": "Ergonomic, Silent Click",
            "harga": 300000,
            "stok": 50
        }
    ]
}

GET http://localhost:5000/api/categories

{
    "success": true,
    "message": "Daftar kategori",
    "data": [
        {
            "id": 1,
            "name": "Elektronik",
            "description": "Perangkat elektronik umum"
        },
        {
            "id": 2,
            "name": "Aksesoris",
            "description": "Aksesoris komputer dan lainnya"
        }
    ]
}

GET http://localhost:5000/api/products/search?name=Laptop

{
    "success": true,
    "message": "Hasil pencarian",
    "data": [
        {
            "id": 1,
            "nama": "Laptop Gaming",
            "deskripsi": "Intel i7, RTX 3060",
            "harga": 15000000,
            "stok": 5
        }
    ]
}

GET http://localhost:5000/api/categories/1

{
    "success": true,
    "message": "Kategori ditemukan",
    "data": {
        "id": 1,
        "name": "Elektronik",
        "description": "Perangkat elektronik umum"
    }
}

GET http://localhost:5000/api/products/1

{
    "success": true,
    "message": "Produk ditemukan",
    "data": {
        "id": 1,
        "nama": "Laptop Gaming",
        "deskripsi": "Intel i7, RTX 3060",
        "harga": 15000000,
        "stok": 5
    }
}

POST http://localhost:5000/api/categories

{
    "success": true,
    "message": "Kategori berhasil ditambahkan",
    "data": {
        "id": 3,
        "name": "Elektronik Modern",
        "description": "Updated kategori"
    }
}

POST http://localhost:5000/api/products

{
    "success": true,
    "message": "Produk berhasil ditambahkan",
    "data": {
        "id": 4,
        "nama": "New Prod",
        "deskripsi": "test",
        "harga": "900000",
        "stok": "255"
    }
}