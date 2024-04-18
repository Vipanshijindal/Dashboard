import { useState, useEffect } from "react";
import { API_URL } from "../data/ApiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductdats = await response.json();
      setProducts(newProductdats);
      console.log(newProductdats);
    } catch (error) {
      console.log("failed to fetch products", error);
      alert("failed to fetch products");
    }
  };
  useEffect(() => {
    productsHandler();
    console.log("this is useffect");
  }, []);
  const deleteProductByid=async(productId)=>{
    try{
      const response=await fetch(`${API_URL}/firm/${productId}`,{
        method:"DELETE"
      })
      if(response.ok){
        setProducts(products.filter(product=>product._id !==productId));
        confirm("are you sure you want to delete");
        alert("product deleted successfully")
      }
    }
    catch(error){
      console.log("Failed to delete product");
      alert("failed to delete product")
    }
  }
  return (
    <div>
      {!products? (
        <p>No product added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((items) => {
              return (
                <>
                  <tr key={items._id}>
                    <td>{items.productname}</td>
                    <td>{items.price}</td>
                    <td>
                      {items.image && (
                        <img
                          src={`${API_URL}/uploads/${items.image} `}
                          alt={items.productname}
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                    <div className="btnSubmit">
                    <button onClick={()=>deleteProductByid(items._id)}>Delete</button>
        </div>
                     
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
