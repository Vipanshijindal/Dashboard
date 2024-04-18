import { useState } from "react";
import { API_URL } from "../../data/ApiPath";

const AddProduct = () => {
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handlebestseller = (e) => {
    const value = e.target.value === "true";
    setBestseller(value);
  };
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handleAddproduct = async (e) => {
    e.preventDefault();

    try {
      const logintoken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if (!logintoken || !firmId) {
        console.error("User not authenticated");
      }
      const formData = new FormData();
      formData.append("productname", productname);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(`${API_URL}/product/addproduct/${firmId}`, {
        method: "POST",

        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);

        setProductname("");
        setPrice("");
        setCategory([]);
        setBestseller(false);
        setImage(null);
        setDescription("null");
        alert("product added successfully");
      }
    } catch (error) {
      console.error(error);
      alert("failed to add product")
    }
  };
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddproduct}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input type="text" value={productname} onChange={(e)=>{
          setProductname(e.target.value)
        }} />
        <label>Price</label>
        <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        <div className="checkinp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxcontainer">
              <label className="veglabel">Veg</label>
              <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={handleCategoryChange} />
            </div>
            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input type="checkbox" value="non-veg"  checked={category.includes("non-veg")} onChange={handleCategoryChange}/>
            </div>
          </div>
        </div>
        <div className="checkinp">
          <label>Bestseller</label>
          <div className="inputsContainer">
            <div className="checkboxcontainer">
              <label>Yes</label>
              <input type="radio" value="true"  checked={bestseller===true} onChange={handlebestseller} />
            </div>
            <div className="checkboxcontainer">
              <label>No</label>
              <input type="radio" value="false"  checked={bestseller===false} onChange={handlebestseller}/>
            </div>
          </div>
        </div>

        <label>Description</label>
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        <label>Firm Image</label>
        <input type="file"  onChange={handleImageUpload}  />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
