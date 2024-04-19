import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(false);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setPriceError("Please enter a valid number for the price.");
      setIsPriceValid(false);
    } else {
      setPriceError("");
      setIsPriceValid(true);
      handleInputChange(e);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setQuantityError("Please enter a valid number for the quantity.");
      setIsQuantityValid(false);
    } else {
      setQuantityError("");
      setIsQuantityValid(true);
      handleInputChange(e);
    }
  };

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            style={{
              borderColor: product?.name ? "green" : "",
              borderWidth: quantityError ? "2px" : "2px",
            }}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            style={{
              borderColor: product?.category ? "green" : "",
              borderWidth: quantityError ? "2px" : "2px",
            }}
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handlePriceChange}
            style={{
              borderColor: isPriceValid ? "green" : priceError ? "red" : "",
              borderWidth: quantityError ? "2px" : "2px",
            }}
          />
          {priceError && <span className="error-message">{priceError}</span>}

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleQuantityChange}
            style={{
              borderColor: isQuantityValid ? "green" : quantityError ? "red" : "",
              borderWidth: quantityError ? "2px" : "2px",
            }}
          />
          {quantityError && <span className="error-message">{quantityError}</span>}

          <label>Product Description:</label>
          <div className="description-editor">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
            />
          </div>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
