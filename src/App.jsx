
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 2499, category: "Electronics", stock: 15 },
    { id: 2, name: "Smart Watch", price: 3999, category: "Accessories", stock: 10 },
    { id: 3, name: "Travel Backpack", price: 1499, category: "Fashion", stock: 20 },
    { id: 4, name: "Desk Lamp", price: 899, category: "Home", stock: 12 },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState("");

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  const [name, setName] = useState("Wireless Headphones");
  const [price, setPrice] = useState("2499");
  const [category, setCategory] = useState("Electronics");
  const [stock, setStock] = useState("15");

  function selectProduct(id) {
    const product = products.find((item) => item.id === Number(id));

    setSelectedId(Number(id));
    setName(product.name);
    setPrice(String(product.price));
    setCategory(product.category);
    setStock(String(product.stock));
    setMessage("");
  }

  function updateProduct(e) {
    e.preventDefault();

    if (!name.trim() || Number(price) <= 0 || Number(stock) < 0) {
      setMessage("Please enter valid product details.");
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === selectedId
          ? {
              ...product,
              name: name.trim(),
              price: Number(price),
              category,
              stock: Number(stock),
            }
          : product
      )
    );

    setMessage("Product updated successfully!");
  }

  const symbols = ["◈", "⌚", "▣", "✦"];
  const colors = [
    "bg-[#d6f5ed] text-[#087e68]",
    "bg-[#ffe0d6] text-[#c45135]",
    "bg-[#f9edbd] text-[#927019]",
    "bg-[#e8e0ff] text-[#6745b5]",
  ];

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#193c3a]">
      <header className="bg-[#193c3a] px-6 py-8 text-white md:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[4px] text-[#f5a58c]">
              MERCHANT STUDIO
            </p>
            <h1 className="mt-2 text-4xl font-black md:text-5xl">
              Product <span className="text-[#f5a58c]">Edit.</span>
            </h1>
            <p className="mt-3 text-sm text-gray-300">
              Select, edit and update your inventory
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
            <p className="text-sm text-gray-300">TOTAL PRODUCTS</p>
            <p className="mt-1 text-3xl font-black text-[#f5a58c]">
              {products.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-5 md:px-8">
        {/* Product List */}
        <section className="lg:col-span-2">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-widest text-[#d16d51]">
              INVENTORY
            </p>
            <h2 className="mt-1 text-2xl font-black">Your Products</h2>
            <p className="mt-1 text-sm text-gray-500">
              Select a product to edit
            </p>
          </div>

          <div className="space-y-3">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => selectProduct(product.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  selectedId === product.id
                    ? "border-[#193c3a] bg-[#193c3a] text-white shadow-lg"
                    : "border-[#e2ddd0] bg-white hover:border-[#d16d51]"
                }`}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${
                    colors[index % colors.length]
                  }`}
                >
                  {symbols[index % symbols.length]}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold">{product.name}</p>
                  <p
                    className={`mt-1 text-sm ${
                      selectedId === product.id
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {product.category}
                  </p>
                  <p className="mt-1 font-semibold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="text-xl">
                  {selectedId === product.id ? "✓" : "›"}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Edit Form */}
        <section className="lg:col-span-3">
          <div className="rounded-3xl border border-[#e2ddd0] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe0d6] text-2xl text-[#c45135]">
                ✎
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#d16d51]">
                  UPDATE OPERATION
                </p>
                <h2 className="text-2xl font-black">Edit Product Details</h2>
              </div>
            </div>

            <form onSubmit={updateProduct} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Select Product
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => selectProduct(e.target.value)}
                  className="w-full rounded-xl border border-[#d9ded6] bg-[#f9f8f3] p-3 outline-none focus:border-[#d16d51]"
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.id}. {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Product Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#d9ded6] bg-[#f9f8f3] p-3 outline-none focus:border-[#d16d51]"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-xl border border-[#d9ded6] bg-[#f9f8f3] p-3 outline-none focus:border-[#d16d51]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full rounded-xl border border-[#d9ded6] bg-[#f9f8f3] p-3 outline-none focus:border-[#d16d51]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#d9ded6] bg-[#f9f8f3] p-3 outline-none focus:border-[#d16d51]"
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Fashion</option>
                  <option>Home</option>
                  <option>Sports</option>
                  <option>Stationery</option>
                </select>
              </div>

              {message && (
                <p
                  className={`rounded-xl p-3 text-sm font-semibold ${
                    message.includes("successfully")
                      ? "bg-[#d6f5ed] text-[#087e68]"
                      : "bg-[#ffe0d6] text-[#c45135]"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#d16d51] p-4 font-bold text-white transition hover:bg-[#b9563d]"
              >
                Save Updated Product →
              </button>
            </form>
          </div>

          {selectedProduct && (
            <div className="mt-5 rounded-2xl bg-[#d6f5ed] p-5">
              <p className="text-sm font-bold uppercase tracking-widest text-[#087e68]">
                SELECTED PRODUCT
              </p>
              <p className="mt-2 text-lg font-black">
                {selectedProduct.name}
              </p>
              <p className="mt-1 text-sm text-[#376b61]">
                Current saved price: ₹
                {selectedProduct.price.toLocaleString("en-IN")}
                {" · "}Stock: {selectedProduct.stock}
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-[#e2ddd0] px-5 py-6 text-center text-sm text-gray-500">
        Merchant Studio · React Product Management
      </footer>
    </div>
  );
}

export default App;
