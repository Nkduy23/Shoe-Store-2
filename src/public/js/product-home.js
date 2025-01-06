  // Đổi ảnh khi hover vào màu
  document.querySelectorAll(".product-card__color").forEach((colorOption) => {
    colorOption.addEventListener("mouseenter", (e) => {
      const color = e.target.dataset.color;
      const productCard = e.target.closest(".product-card");
      const productImage = productCard.querySelector(".product-card__image");
      const productId = productCard.querySelector(".product-card__image").dataset.productId;

      // Đổi ảnh khi hover, sử dụng màu sắc từ thuộc tính data-color
      productImage.src = `src/public/img/${productId}-${color}.jpg`; // Linh hoạt với các tên ảnh
    });

    colorOption.addEventListener("mouseleave", (e) => {
      // Không làm gì khi rời khỏi hover, ảnh sẽ giữ nguyên màu đã chọn
      // Không thay đổi ảnh mặc định
    });
  });

  // Cập nhật % sale và thanh tiến độ từ dữ liệu server (ví dụ)
  document.querySelectorAll(".product-card").forEach((productCard) => {
    const salePercentage = productCard.querySelector(".product-card__sale-label");
    const progressBar = productCard.querySelector(".product-card__progress-bar");

    // Lấy dữ liệu sale và tiến độ (thực tế sẽ cập nhật từ server)
    const sale = salePercentage.getAttribute("data-sale"); // Ví dụ: '20%'
    const progress = progressBar.getAttribute("data-progress"); // Ví dụ: '75'

    // Cập nhật lại % sale
    salePercentage.textContent = `Sale ${sale}`;

    // Cập nhật lại thanh tiến độ
    progressBar.style.width = `${progress}%`;
  });