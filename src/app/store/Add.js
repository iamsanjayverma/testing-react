
import React, { useState } from "react";

const Add = () => {
  const apiKey = process.env.REACT_APP_STORE_SECRET_KEY;
  const apiUrl = process.env.REACT_APP_STORE_API_ADD_URL;


  const initialFormData = {
    password: "",
    store_name: "",
    store_owner_name: "",
    mobile_number: "",
    alternative_number: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    pan_card_number: "",
    gst_number: "",
    segment: "",
    customer_type: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Validate field values
  const validateField = (name, value) => {
    switch (name) {
      case "pan_card_number":
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
          ? ""
          : "Invalid PAN card number format!";
      case "mobile_number":
        return /^[0-9]{10}$/.test(value)
          ? ""
          : "Mobile number must be 10 digits!";
      case "alternative_number":
        return value === "" || /^[0-9]{10}$/.test(value)
          ? ""
          : "Alternative mobile number must be 10 digits!";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address!";
      case "pincode":
        return /^[0-9]{6}$/.test(value)
          ? ""
          : "Pincode must be 6 digits!";
      case "password":
        return value.length >= 8
          ? ""
          : "Password must be at least 8 characters long!";
      case "gst_number":
        return value === "" || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(value)
          ? ""
          : "Invalid GST number format!";
      default:
        return "";
    }
  };

  // Handle input field changes and validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate as the user types
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Handle image file selection and previews
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload a maximum of 5 images!");
      return;
    }
    setFormData({ ...formData, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file))); // Show image previews
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError("");

    // Validate all fields before submission
    const newErrors = {};
    for (const key of Object.keys(formData)) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }
    setErrors(newErrors);

    // If there are validation errors, stop form submission
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Create FormData for file and other data submission
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          formDataToSubmit.append("images[]", file); // Append each image file
        });
      } else {
        formDataToSubmit.append(key, formData[key]); // Append other form data fields
      }
    });


    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + apiKey, // Only necessary headers
        'Accept': 'application/json',
      },
      body: formDataToSubmit,
    })

      .then((response) => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Login failed');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setFormData(initialFormData);
        alert("Form submitted successfully!");
      })

  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Store</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <h4>Store Details</h4>
          <div className="row flex-wrap">
            {/* Segment */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Segment</label>
              <select
                name="segment"
                className="form-select"
                value={formData.segment}
                onChange={handleChange}
                required
              >
                <option value="">Select Segment</option>
                <option value="2-wheel">2 Wheel</option>
                <option value="4-wheel">4 Wheel</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Customer Type */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Customer Type</label>
              <select
                name="customer_type"
                className="form-select"
                value={formData.customer_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Customer Type</option>
                <option value="retailer">Retailer</option>
                <option value="trader">Trader</option>
                <option value="workshop">Workshop</option>
                <option value="authorised dealer">Authorised Dealer</option>
                <option value="authorised distributor">Authorised Distributor</option>
              </select>
            </div>

            {/* Store Name */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Store Name</label>
              <input
                type="text"
                name="store_name"
                className="form-control"
                value={formData.store_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Store Owner Name */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Store Owner Name</label>
              <input
                type="text"
                name="store_owner_name"
                className="form-control"
                value={formData.store_owner_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                className="form-control"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
              {errors.mobile_number && <span className="text-danger">{errors.mobile_number}</span>}
            </div>

            {/* Alternative Number */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Alternative Number (Optional)</label>
              <input
                type="tel"
                name="alternative_number"
                className="form-control"
                value={formData.alternative_number}
                onChange={handleChange}
              />
              {errors.alternative_number && <span className="text-danger">{errors.alternative_number}</span>}
            </div>

            {/* Email Address */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>

            {/* State */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            {/* City */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pincode */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              {errors.pincode && <span className="text-danger">{errors.pincode}</span>}
            </div>

            {/* Address */}
            <div className="col-lg-4 mb-3">
              <label className="form-label">Address</label>
              <input
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                required
                minlength="3" maxlength="50"
              />
            </div>

            {/* PAN Card Number */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">PAN Card Number</label>
              <input
                type="text"
                name="pan_card_number"
                className="form-control"
                value={formData.pan_card_number}
                onChange={handleChange}
                required
              />
              {errors.pan_card_number && <span className="text-danger">{errors.pan_card_number}</span>}
            </div>

            {/* GST Number */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">GST Number (Optional)</label>
              <input
                type="text"
                name="gst_number"
                className="form-control"
                value={formData.gst_number}
                onChange={handleChange}
              />
              {errors.gst_number && <span className="text-danger">{errors.gst_number}</span>}
            </div>

            {/* Password */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>

            {/* Images */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <h4>Upload Store Images</h4>
              <input
                type="file"
                name="images"
                className="form-control"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp,.svg,.avif"
                multiple
              />
              <div className="d-flex mt-3">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    style={{ width: "100px", height: "100px", marginRight: "10px" }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>



        {/* Server Error */}
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Add;
