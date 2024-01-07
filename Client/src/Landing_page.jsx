import style from "./landing_page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Landing_page() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/product", {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Auth"))}`
      }
    })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  
  

  return (
    <>
      <div className={style.container}>
        <h2>Product coming from backend</h2>
        <ul>
          {product && product.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Landing_page;
