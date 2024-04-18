import { useState } from "react";
import { API_URL } from "../../data/ApiPath";

const AddFirm = () => {
  const [firmname, setFirmname] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setoffer] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleRegionChange = async (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const logintoken = localStorage.getItem("loginToken");
      if (!logintoken) {
        console.error("User not authenticated");
      }
      const formData = new FormData();
      formData.append("firmname", firmname);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", image);
      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });
      const response = await fetch(`${API_URL}/firm/addfirm`, {
        method: "POST",
        headers: {
          token: `${logintoken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);

        setFirmname("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setoffer("");
        setImage(null);
        alert("Firm added successfully");
      }else if(data.message==="vendor can have only one firm"){
        alert("Firm Exits . Only 1 firm can be added")
      }else{
        alert("Failed to add Firm")
      }

      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);
    } catch (error) {
      console.error("failed to add firm");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm Name</label>
        <input
          type="text"
          name="firmname"
          onChange={(e) => {
            setFirmname(e.target.value);
          }}
          value={firmname}
        />
        <label>Area</label>
        <input
          type="text"
          name="area"
          onChange={(e) => {
            setArea(e.target.value);
          }}
          value={area}
        />

        <div className="checkinp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxcontainer">
              <label className="veglabel">Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <div className="checkinp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="regionboxcontainer">
              <label>South-Indian</label>
              <input
                type="checkbox"
                value="south-indian"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regionboxcontainer">
              <label>North-Indian</label>
              <input
                type="checkbox"
                value="north-indian"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regionboxcontainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regionboxcontainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => {
            setoffer(e.target.value);
          }}
        />
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
