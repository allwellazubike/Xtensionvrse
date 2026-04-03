import React, { useState, useEffect } from "react";

const AddProductForm = ({ initialProduct, onCancel, onSuccess }) => {
  // Single object to store ALL form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    originalPrice: "",
    stock: "",
    badgeText: "",
    badgeColor: "",
    sale: false,
    lengths: ['20"', '24"', '32"'],
    weights: ["100g", "150g", "200g"],
    specifications: ["100% Kanekalon Fiber", "Hot Water Setting"],
    primaryImage: null, // Can be File object or String (URL)
    galleryImages: [], // Array of File objects or Strings (URLs)
  });

  const [newLength, setNewLength] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newSpec, setNewSpec] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (initialProduct) {
      // Parse specs back into arrays
      const lengths = [];
      const weights = [];
      const specs = [];

      if (initialProduct.specs && Array.isArray(initialProduct.specs)) {
        initialProduct.specs.forEach((s) => {
          if (typeof s === "string") {
            if (s.startsWith("Length: ")) {
              const l = s
                .replace("Length: ", "")
                .split(",")
                .map((i) => i.trim());
              lengths.push(...l);
            } else if (s.startsWith("Weight: ")) {
              const w = s
                .replace("Weight: ", "")
                .split(",")
                .map((i) => i.trim());
              weights.push(...w);
            } else {
              specs.push(s);
            }
          }
        });
      }

      setFormData({
        name: initialProduct.name || "",
        category: initialProduct.category || "",
        description: initialProduct.description || "",
        price: initialProduct.price || "",
        originalPrice: initialProduct.original_price || "",
        stock: initialProduct.stock || "",
        badgeText: initialProduct.badge || "",
        badgeColor: initialProduct.badge_color || "",
        sale: initialProduct.sale || false,
        lengths: lengths.length > 0 ? lengths : [],
        weights: weights.length > 0 ? weights : [],
        specifications: specs.length > 0 ? specs : [],
        primaryImage: initialProduct.image || null,
        galleryImages: initialProduct.images || [],
      });
    }
  }, [initialProduct]);

  // Handle all text inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle primary image
  const handlePrimaryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, primaryImage: file });
    }
  };

  const handleRemovePrimaryImage = () => {
    setFormData({ ...formData, primaryImage: null });
  };

  // Handle gallery images
  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, ...files],
    });
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (indexToRemove) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter(
        (_, index) => index !== indexToRemove,
      ),
    });
  };

  // Length functions
  const handleAddLength = () => {
    if (newLength.trim()) {
      setFormData({
        ...formData,
        lengths: [...formData.lengths, newLength.trim()],
      });
      setNewLength("");
    }
  };

  const handleRemoveLength = (indexToRemove) => {
    setFormData({
      ...formData,
      lengths: formData.lengths.filter((_, index) => index !== indexToRemove),
    });
  };

  // Weight functions
  const handleAddWeight = () => {
    if (newWeight.trim()) {
      setFormData({
        ...formData,
        weights: [...formData.weights, newWeight.trim()],
      });
      setNewWeight("");
    }
  };

  const handleRemoveWeight = (indexToRemove) => {
    setFormData({
      ...formData,
      weights: formData.weights.filter((_, index) => index !== indexToRemove),
    });
  };

  // Specification functions
  const handleAddSpec = () => {
    if (newSpec.trim()) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, newSpec.trim()],
      });
      setNewSpec("");
    }
  };

  const handleRemoveSpec = (indexToRemove) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter(
        (_, index) => index !== indexToRemove,
      ),
    });
  };

  // Helper to get image preview URL
  const getPreviewUrl = (fileOrUrl) => {
    if (!fileOrUrl) return "";
    if (typeof fileOrUrl === "string") return fileOrUrl;
    return URL.createObjectURL(fileOrUrl);
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      alert("Please enter product name");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }
    if (!formData.stock || parseInt(formData.stock) <= 0) {
      alert("Stock must be greater than 0");
      return;
    }
    if (!formData.primaryImage) {
      alert("Please upload a primary image");
      return;
    }

    // Create FormData
    const data = new FormData();

    // Add all text fields
    data.append("name", formData.name.trim());
    data.append("category", formData.category);
    data.append("description", formData.description.trim());
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("originalPrice", formData.originalPrice || "");
    data.append("badgeText", formData.badgeText.trim());
    data.append("badgeColor", formData.badgeColor);
    data.append("sale", formData.sale);

    // Convert arrays to JSON strings
    data.append("lengths", JSON.stringify(formData.lengths));
    data.append("weights", JSON.stringify(formData.weights));
    data.append("specifications", JSON.stringify(formData.specifications));

    // Add primary image
    if (formData.primaryImage instanceof File) {
      data.append("primaryImage", formData.primaryImage);
    } else {
      // It's a string (existing URL), send it so backend knows to keep it
      data.append("primaryImage", formData.primaryImage);
    }

    // Add gallery images
    formData.galleryImages.forEach((image) => {
      if (image instanceof File) {
        data.append("galleryImages", image);
      } else {
        data.append("galleryImages", image); // Existing URL
      }
    });

    try {
      const isEdit = !!initialProduct;
      const url = isEdit
        ? (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/products/${initialProduct.id}`
        : (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/products/create";

      const method = isEdit ? "PUT" : "POST";

      console.log(`Submitting product (${method})...`);

      const response = await fetch(url, {
        method: method,
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          isEdit
            ? "Product updated successfully!"
            : "Product created successfully!",
        );
        if (onSuccess) onSuccess();
      } else {
        alert("Error: " + result.message);
        console.error("Server error:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save product. Check console for details.");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Header with Title and Cancel */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#181113] dark:text-white">
          {initialProduct ? "Edit Product" : "Add New Product"}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
        <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            edit_note
          </span>
          Basic Information
        </h3>
        <div className="grid gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Product Name
            </label>
            <input
              className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
              placeholder='e.g. Silky Straight 24" Braid'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-3 pl-4 pr-10 appearance-none"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="French Curls">French Curls</option>
                <option value="Deep Twists">Deep Twists</option>
                <option value="Italian Curls">Italian Curls</option>
                <option value="Bone Straight">Bone Straight</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#89616f]">
                <span className="material-symbols-outlined text-[20px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Description
            </label>
            <div className="border border-[#e6dbdf] dark:border-[#4a2e36] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all bg-[#fcfbfb] dark:bg-white/5">
              <textarea
                className="w-full border-none bg-transparent text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:ring-0 min-h-[160px] resize-y p-4 outline-none"
                placeholder="Detailed product description..."
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Status */}
      <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
        <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">sell</span>
          Pricing &amp; Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89616f] font-medium">
                ₦
              </span>
              <input
                className="w-full border pl-8 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                placeholder="0.00"
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Original Price{" "}
              <span className="text-xs font-normal text-[#89616f]">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89616f] font-medium">
                ₦
              </span>
              <input
                className="w-full border pl-8 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                placeholder="0.00"
                type="number"
                step="0.01"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Stock Quantity
            </label>
            <input
              className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
              placeholder="e.g. 50"
              type="number"
              min="1"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="md:col-span-2 border-t border-[#f4f0f2] dark:border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                Badge Text
              </label>
              <input
                className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                placeholder="e.g. Best Seller"
                type="text"
                name="badgeText"
                value={formData.badgeText}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                Badge Color
              </label>
              <div className="relative">
                <select
                  name="badgeColor"
                  className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-3 pl-4 pr-10"
                  value={formData.badgeColor}
                  onChange={handleInputChange}
                >
                  <option value="">None</option>
                  <option value="bg-primary">Pink (Primary)</option>
                  <option value="bg-red-500">Red (Sale)</option>
                  <option value="bg-blue-500">Blue (New)</option>
                  <option value="bg-green-500">Green (Eco)</option>
                  <option value="bg-purple-500">Purple (Limited)</option>
                  <option value="bg-black">Black (Dark)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 flex items-center justify-between p-4 bg-[#fcfbfb] dark:bg-white/5 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36]">
            <div>
              <span className="block text-sm font-bold text-[#181113] dark:text-white">
                On Sale Status
              </span>
              <span className="text-xs text-[#89616f] dark:text-white/50">
                Enable to show the sale badge and discounted pricing.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                name="sale"
                checked={formData.sale}
                onChange={handleInputChange}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
        <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">style</span>
          Variants
        </h3>
        <div className="flex flex-col gap-6">
          {/* Lengths */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Available Lengths
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {formData.lengths.map((length, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-[#f4f0f2] dark:bg-white/10 text-[#5d4a51] dark:text-white text-sm font-medium border border-transparent hover:border-primary/30 transition-colors flex items-center gap-2"
                >
                  {length}
                  <button
                    type="button"
                    onClick={() => handleRemoveLength(index)}
                    className="text-[#89616f] hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={newLength}
                  onChange={(e) => setNewLength(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddLength();
                    }
                  }}
                  placeholder="Add length..."
                  className="pl-3 pr-8 py-1.5 w-32 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddLength}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#89616f] hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add_circle
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Weights */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
              Available Weights
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {formData.weights.map((weight, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-[#f4f0f2] dark:bg-white/10 text-[#5d4a51] dark:text-white text-sm font-medium border border-transparent hover:border-primary/30 transition-colors flex items-center gap-2"
                >
                  {weight}
                  <button
                    type="button"
                    onClick={() => handleRemoveWeight(index)}
                    className="text-[#89616f] hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddWeight();
                    }
                  }}
                  placeholder="Add weight..."
                  className="pl-3 pr-8 py-1.5 w-32 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddWeight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#89616f] hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add_circle
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
        <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            perm_media
          </span>
          Media
        </h3>
        <div className="mb-8">
          <label className="block text-sm font-bold text-[#5d4a51] dark:text-white/80 mb-2">
            Primary Image <span className="text-red-500">*</span>
          </label>

          {formData.primaryImage ? (
            <div className="relative w-full max-w-[200px] aspect-square rounded-2xl overflow-hidden border border-[#e6dbdf] dark:border-[#4a2e36] group">
              <img
                src={getPreviewUrl(formData.primaryImage)}
                alt="Primary"
                className="w-full h-full object-cover"
              />
              {/* Explicit specific delete button for primary image, always visible on mobile */}
              <button
                type="button"
                onClick={handleRemovePrimaryImage}
                className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-md transition-all z-10"
              >
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
              </button>
            </div>
          ) : (
            <div className="relative group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageChange}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                required={!formData.primaryImage}
              />
              <div className="border-2 border-dashed border-[#e6dbdf] dark:border-[#4a2e36] rounded-2xl p-10 flex flex-col items-center justify-center bg-[#fcfbfb] dark:bg-white/5 group-hover:bg-[#f4f0f2] dark:group-hover:bg-white/10 transition-colors text-center">
                <div className="size-14 bg-white dark:bg-white/10 rounded-full shadow-sm flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    cloud_upload
                  </span>
                </div>
                <p className="text-[#181113] dark:text-white font-semibold text-base">
                  Click to upload or drag and drop
                </p>
                <p className="text-[#89616f] dark:text-white/50 text-sm mt-1">
                  PNG, JPG or WEBP (recommended 800x800px)
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-[#5d4a51] dark:text-white/80 mb-3">
            Product Gallery{" "}
            <span className="text-xs font-normal text-[#89616f]">
              ({formData.galleryImages.length} selected)
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative group rounded-xl overflow-hidden border border-[#e6dbdf] dark:border-[#4a2e36] shadow-sm"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${getPreviewUrl(image)}')`,
                  }}
                ></div>
                {/* Mobile-friendly: Always visible or on slight tap via active state. Using a visible scrim or just button. */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <button
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-lg transform transition-transform hover:scale-105"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}

            <label className="aspect-square rounded-xl border-2 border-dashed border-[#e6dbdf] dark:border-[#4a2e36] flex flex-col items-center justify-center gap-1 text-[#89616f] hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors bg-[#fcfbfb] dark:bg-white/5 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
                className="hidden"
              />
              <span className="material-symbols-outlined text-2xl">
                add_photo_alternate
              </span>
              <span className="text-xs font-bold">Add</span>
            </label>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
        <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            fact_check
          </span>
          Specifications
        </h3>
        <div className="flex flex-col gap-3">
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-3 items-center group">
              <span className="material-symbols-outlined text-[#89616f]/50 cursor-move group-hover:text-primary transition-colors">
                drag_indicator
              </span>
              <input
                className="flex-1 border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-2.5"
                type="text"
                value={spec}
                readOnly
              />
              <button
                onClick={() => handleRemoveSpec(index)}
                className="p-2 text-[#89616f] hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          ))}

          <div className="flex gap-3 items-center group">
            <span className="material-symbols-outlined text-[#89616f]/50">
              drag_indicator
            </span>
            <input
              className="flex-1 border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-2.5"
              placeholder="Add new specification..."
              type="text"
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSpec();
                }
              }}
            />
            <button
              onClick={handleAddSpec}
              className="p-2 text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">
                add_circle
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4 mt-2">
        {onCancel && (
          <button
            className="px-8 py-3 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36] font-bold text-[#5d4a51] dark:text-white hover:bg-white dark:hover:bg-white/5 shadow-sm transition-colors text-sm"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
          type="submit"
        >
          <span className="material-symbols-outlined text-lg">check</span>
          {initialProduct ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
