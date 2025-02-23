import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { StoreProvider, StoreContext } from '../store/StoreContext'; // Adjust the path
import { MultiSelect } from "react-multi-select-component";
import Brand from '../Assets/SegmentwiseBrand'; // Assuming this is an array of brand options

const Add = () => {
  return (
    <>
      <StoreProvider>
        <AddProduct />
      </StoreProvider>
    </>
  );
};

const AddProduct = () => {
  const initialFormData = {
    store_id: "",
    store_name: "",
    part_number: "",
    part_name: "",
    part_description: "",
    brand: [], // Adjust for multi-select
    category: "",
    part_type: "",
    location: "",
    hsn_number: "",
    mrp: "",
    tax_description: "",
    taxable_price: "",
    discount: "",
    sale_price: "",
    segment: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]); // Track selected brands

  const apiKey = process.env.REACT_APP_STORE_SECRET_KEY;
  const apiUrl = process.env.REACT_APP_PRODUCT_API_ADD_URL;

  const { id } = useParams(); // Get the store ID from the URL
  const { stores, loading, error } = useContext(StoreContext);

  useEffect(() => {
    if (!loading && stores.length > 0) {
      const store = stores.find((store) => store.id === parseInt(id));
      if (store) {
        setFormData((prevData) => ({
          ...prevData,
          segment: store.segment,
          store_id: store.id,
          store_name: store.store_name,
        }));
      }
    }
  }, [id, stores, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Validate field values
  const validateField = (name, value) => {
    switch (name) {
      case "part_number":
        return value.length > 0 ? "" : "Part number is required!";
      case "part_name":
        if (value.length === 0) return "Part name is required!";
        else if (value.length > 20) return "Part name cannot exceed 20 characters!";
        else return "";
      case "part_description":
        if (value.length === 0) return "Part description is required!";
        else if (value.length < 3) return "Part description must be at least 3 characters!";
        else if (value.length > 50) return "Part description cannot exceed 50 characters!";
        else return "";
      case "mrp":
        return value > 0 ? "" : "MRP must be a positive number!";
      case "sale_price":
        return value > 0 ? "" : "Sale price must be a positive number!";
      case "taxable_price":
        return value > 0 ? "" : "Taxable price must be a positive number!";
        case "hsn_number":
          const hsnPattern = /^[0-9]{4,8}$/; // HSN number must be 4, 6, or 8 digits long
          return hsnPattern.test(value) ? "" : "HSN number must be 4, 6, or 8 digits!";
         
      default:
        return "";
    }
  };

  // Handle input field changes and validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    // Handle calculations for taxable price and sale price
    if (name === "mrp" || name === "tax_description") {
      calculatetaxable_price(name === "mrp" ? value : formData.mrp, name === "tax_description" ? value : formData.tax_description);
    }
    if (name === "mrp" || name === "discount") {
      calculateSalePrice(name === "mrp" ? value : formData.mrp, name === "discount" ? value : formData.discount);
    }
  };

  const brandOptions = formData.segment
  ? Brand.filter((brand) => brand.segment === formData.segment).map((brand) => ({
      label: brand.name, // Display name
      value: brand.name, // Unique identifier
    }))
  : Brand.map((brand) => ({
      label: brand.name, // Display name
      value: brand.name, // Unique identifier
    }));
    
  const handleBrandChange = (selected) => {
    setSelectedBrand(selected); // Update the selected brand(s)
    const brandNames = selected.map((option) => option.label); // Extract the brand names
    setFormData({ ...formData, brand: brandNames }); // Update formData with selected brands
  };

  const calculatetaxable_price = (mrp, tax_description) => {
    if (mrp && tax_description) {
      const taxPercentage = parseFloat(tax_description) / 100;
      const basePrice = parseFloat(mrp) / (1 + taxPercentage);
      setFormData((prevData) => ({
        ...prevData,
        taxable_price: basePrice.toFixed(2),
      }));
    }
  };

  const calculateSalePrice = (mrp, discount) => {
    if (mrp && discount) {
      const discountPercentage = parseFloat(discount);
      const salePrice = parseFloat(mrp) - (parseFloat(mrp) * discountPercentage) / 100;
      setFormData((prevData) => ({
        ...prevData,
        sale_price: salePrice.toFixed(2),
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload a maximum of 5 images!");
      return;
    }
    setFormData({ ...formData, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    for (const key of Object.keys(formData)) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          formDataToSubmit.append("images[]", file);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formDataToSubmit,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Form submission failed');
      }

      setFormData(initialFormData);
      alert("Form submitted successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="pt-3">
      <h2 className="mb-3">Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
                   {/* Store-related fields, auto-filled from context */}
            <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Segment</label>
            <input
              type="text"
              className="form-control"
              name="segment"
              value={formData.segment}
              readOnly
            />
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Store ID</label>
            <input
              type="text"
              className="form-control"
              name="store_id"
              value={formData.store_id}
              readOnly
            />
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Store Name</label>
            <input
              type="text"
              className="form-control"
              name="store_name"
              value={formData.store_name}
              readOnly
            />
          </div>
   
          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Part Number</label>
            <input
              type="text"
              className="form-control"
              name="part_number"
              value={formData.part_number}
              onChange={handleChange}
            />
            {errors.part_number && <div className="text-danger">{errors.part_number}</div>}
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Part Name</label>
            <input
              type="text"
              className="form-control"
              name="part_name"
              value={formData.part_name}
              onChange={handleChange}
            />
            {errors.part_name && <div className="text-danger">{errors.part_name}</div>}
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Part Description</label>
            <input
              type="text"
              className="form-control"
              name="part_description"
              value={formData.part_description}
              onChange={handleChange}
            />
            {errors.part_description && <div className="text-danger">{errors.part_description}</div>}
          </div>
        
          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Brand</label>
            <MultiSelect
              options={brandOptions}
              value={selectedBrand}
              onChange={handleBrandChange}
              labelledBy="Select Brands"
              disableSearch={false} // Enable searching in the options
            />
            {errors.brand && <div className="text-danger">{errors.brand}</div>}
          </div>

          {/* Add more fields for location, hsn_number, mrp, etc. */}
   

  <div className="col-lg-4 col-sm-6 mb-3">
  <label className="form-label">Category</label>
  <input
    list="categoryList"
    id="category"
    type="text"
    className="form-control"
    name="category"
    value={formData.category}
    onChange={handleChange}
    placeholder="Enter Category Engine Transmission Etc"

  />

  <datalist id="categoryList">
    <option value="Engine" />
    <option value="Transmission"/>
    <option value="Electrical"/>
    <option value="Body"/>
    <option value="Suspension"/>
    <option value="Lubricants"/>
    <option value="Accessories"/>
  </datalist>
</div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Part Type</label>
            <input     list="part_typelist"
    id="part_type"
              type="text"
              className="form-control"
              name="part_type"
              value={formData.part_type}
              onChange={handleChange}
              placeholder="Enter Parttype Fast Dead Etc"
            />

<datalist id="part_typelist">
    <option value="Fast Moving"/>
    <option value="Dead Stock" />
    <option value="Sessional"/>
    <option value="Abnormal"/>
  </datalist>
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
  
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">HSN Number</label>
            <input
              type="text"
              className="form-control"
              name="hsn_number"
              value={formData.hsn_number}
              onChange={handleChange}
            />
                    {errors.hsn_number && <span className="text-danger">{errors.hsn_number}</span>}
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">MRP</label>
            <input
              type="number"
              className="form-control"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
            />
            {errors.mrp && <span className="text-danger">{errors.mrp}</span>}
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
  <label className="form-label">Tax Description (%)</label>
  <select
    name="tax_description"
    className="form-control"
    value={formData.tax_description}
    onChange={handleChange}
  >
    <option value="" disabled>Select Tax Rate</option> {/* Placeholder option */}
    <option value="28">28%</option>
    <option value="18">18%</option>
    <option value="12">12%</option>
    <option value="5">5%</option>
  </select>
</div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Taxable Price</label>
            <input
              type="number"
              className="form-control"
              name="taxable_price"
              value={formData.taxable_price}
              readOnly
            />
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Discount (%)</label>
            <input
              type="number"
              className="form-control"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Sale Price</label>
            <input
              type="number"
              className="form-control"
              name="sale_price"
              value={formData.sale_price}
              readOnly
            />
          </div>

          <div className="col-lg-4 col-sm-6 mb-3">
            <label className="form-label">Upload Images (max 5)</label>
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleFileChange}
            />
          </div>

           {/* Image previews */}
        {imagePreviews.length > 0 && (
          <div className="col-12 mb-3">
            <label className="form-label">Image Previews</label>
            <div className="row">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="col-lg-3 col-sm-4 mb-2">
                  <img src={preview} alt={`Preview ${index + 1}`} className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        )}

          <div className="col-12 mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
