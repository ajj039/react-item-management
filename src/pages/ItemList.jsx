import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Items } from "../data";
import { useNavigate } from "react-router-dom";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : Items
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

  const addItem = (e) => {
    e.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Math.random(),
        name: nameRef.current.value,
        price: priceRef.current.value,
        desc: descRef.current.value,
        user: localStorage.getItem("currentuser"),
      },
    ]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const sortItems = (key) => {
    setSortBy(key);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToCSV = () => {
    const csvData = items
      .map((item) => [item.name, item.price, item.desc].join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "items.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.price - b.price;
      }
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Items</h1>
      <button
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
        onClick={() => {
          navigate("/");
          localStorage.setItem("currentuser", "");
          localStorage.setItem("isloggedin", false);
        }}
      >
        logout
      </button>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => sortItems("name")}>Sort by Name</button>
        <button onClick={() => sortItems("price")}>Sort by Price</button>
        <button onClick={exportToCSV}>Export to CSV</button>
        <ul style={{ display: "flex", flexDirection: "column" }}>
          {currentItems
            ?.filter(
              (item) => item.user === localStorage.getItem("currentuser")
            )
            ?.map((item) => (
              <li key={item.id}>
                <Link
                  style={{
                    margin: "1rem",
                    color: "white",
                    fontSize: "20px",
                    textDecoration: "none",
                  }}
                  to={`/items/${item.id}`}
                >
                  {item.name}
                </Link>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))}
        </ul>
        <nav>
          {items.length > itemsPerPage && (
            <ul>
              {Array.from({
                length: Math.ceil(items.length / itemsPerPage),
              }).map((_, index) => (
                <li key={index}>
                  <button onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      <main className="login-container">
        <form onSubmit={addItem}>
          <input
            required
            placeholder="Enter item name"
            type="text"
            ref={nameRef}
          />
          <input
            required
            placeholder="Enter item price"
            type="number"
            ref={priceRef}
          />
          <textarea
            required
            placeholder="Enter item description"
            ref={descRef}
          />
          <button type="submit">Create</button>
        </form>
      </main>
    </div>
  );
};

export default ItemList;
