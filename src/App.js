import "./App.css";
import { snacks } from "./data";
import { useState } from "react";

function App() {
  const [sortColumn, setSortColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  // const sortedData = () => {
  //   let sortedData = [...snacks];

  //   if (sortColumn) {
  //     sortedData.sort((a, b) => {
  //       const valueA = a[sortColumn];
  //       const valueB = b[sortColumn];

  //       if (typeof valueA === "string") {
  //         return sortOrder === "asc"
  //           ? valueA.toLowerCase(valueB)
  //           : valueB.toLowerCase(valueA);
  //       } else {
  //         return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  //       }
  //     });
  //   }

  //   return sortedData;
  // };

  let sortedData = [...snacks];

  if (sortColumn) {
    sortedData.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string") {
        return sortOrder === "asc"
          ? valueA.toLowerCase(valueB)
          : valueB.toLowerCase(valueA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }

  const sortedDataArray = sortedData;

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // const filteredData = () => {
  //   return sortedDataArray.filter(
  //     (snack) =>
  //       snack.product_name.toLowerCase().includes(searchText) ||
  //       snack.ingredients.some((ingredient) =>
  //         ingredient.toLowerCase().includes(searchText)
  //       )
  //   );
  // };

  const filteredDataArray = sortedDataArray.filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchText) ||
      snack.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchText)
      )
  );
  // filteredData();

  return (
    <div className="App">
      <h1>Snack Table</h1>
      <input
        type="text"
        placeholder="Search snacks with product name or ingredients..."
        value={searchText}
        onChange={handleSearch}
      />
      <table>
        <tr>
          <th onClick={() => handleSort("id")}>ID</th>
          <th onClick={() => handleSort("product_name")}>Product Name</th>
          <th onClick={() => handleSort("product_weight")}>Product Weight</th>
          <th onClick={() => handleSort("price")}>Price (INR)</th>
          <th onClick={() => handleSort("calories")}>Calories</th>
          <th onClick={() => handleSort("ingredients")}>Ingredients</th>
        </tr>

        {filteredDataArray.map((snack) => (
          <tr key={snack.id}>
            <td>{snack.id}</td>
            <td>{snack.product_name}</td>
            <td>{snack.product_weight}</td>
            <td>₹ {snack.price}</td>
            <td>
              {snack.calories} <small>kcal</small>
            </td>
            <td>{snack.ingredients.join(", ")}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
