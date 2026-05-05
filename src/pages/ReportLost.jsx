import { useState } from "react";
import "./ReportLost.css";
import { useNavigate } from "react-router-dom";

function ReportLost() {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    dateLost: "",
    location: "",
    email: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
   const navigate = useNavigate()

  const categories = [
    "Electronics",
    "Documents",
    "Keys",
    "Clothing",
    "Bags",
    "Books",
    "Other",
  ];

  function handleChange(e) {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.dateLost) {
      newErrors.dateLost = "Date lost is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Contact email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
   ;
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Lost item report:", formData);
      setSubmitted(true);

      setFormData({
        itemName: "",
        category: "",
        description: "",
        dateLost: "",
        location: "",
        email: "",
        photo: null,
      });
      navigate("/");
    }
  }

  return (
    <section className="report-page">
      <div className="report-card">
        <h1>Report a Lost Item</h1>
        <p className="report-subtitle">
          Fill in the details below to help the campus community identify and return your item.
        </p>

        {submitted && (
          <p className="success-message">
            Your lost item report has been submitted successfully.
          </p>
        )}

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Item name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Example: Macbook 2019"
            />
            {errors.itemName && <span>{errors.itemName}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe color, brand, special marks, contents..."
            />
            {errors.description && <span>{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date lost</label>
              <input
                type="date"
                name="dateLost"
                value={formData.dateLost}
                onChange={handleChange}
              />
              {errors.dateLost && <span>{errors.dateLost}</span>}
            </div>

            <div className="form-group">
              <label>Location on campus</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Library, classroom FAMNIT MP4"
              />
              {errors.location && <span>{errors.location}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Contact email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Photo upload optional</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReportLost;