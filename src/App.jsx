
import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Tablet", price: 15000 }
  ]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function editProduct(p) {
    setId(p.id);
    setName(p.name);
    setPrice(p.price);
  }

  function updateProduct() {
    if (!id || !name || !price) {
      alert("Please select and fill product details");
      return;
    }

    setProducts(products.map(p =>
      p.id === Number(id)
        ? { ...p, name: name, price: Number(price) }
        : p
    ));

    setId("");
    setName("");
    setPrice("");
  }

  return (
    <div>
      <h1>Product Management</h1>

      <h3>Product List</h3>

      {products.map(p => (
        <p key={p.id}>
          {p.name} - Rs. {p.price}{" "}
          <button onClick={() => editProduct(p)}>Edit</button>
        </p>
      ))}

      <h3>Update Product</h3>

      <input
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button onClick={updateProduct}>Update</button>
    </div>
  );
}

export default App;
