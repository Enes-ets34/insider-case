(() => {
  const self = {
    init: () => {
      self.setConfig();
      self.buildHTML();
      self.buildCSS();
      self.setEvents();
      self.fetchData();
    },
    setConfig: () => {
      self.BASE_URL =
        "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
    },
    buildHTML: () => {
      const html = `
                <div class="carousel-wrapper">
                    <button class="prev-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                            <path fill="black" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>
                    <div class="container">
                        <p class="carousel-title">You Might Also Like</p>
                        <div class="carousel">
                            <div class="carousel-inner"></div>
                        </div>
                    </div>
                    <button class="next-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                            <path fill="black" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </button>
                </div>
            `;
      $(".product-detail").append(html);
    },

    buildCSS: () => {
      const css = `
                .carousel-title{
                font-size:32px;
                text-align:left
                }
                .carousel-wrapper {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    background-color: #FAF9F7;
                    overflow: hidden;
                    width: 100%;
                    padding: 20px 0;
                }

                .container {
                    text-align: center;
                    width: 100%;
                }

                .carousel {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                }

                .carousel-inner {
                    display: flex;
                    transition: transform 0.3s ease;
                }

                .product-card {
                    flex: 0 0 calc(100% / 6.5);
                    margin-right: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    position: relative;
                    border-radius: 8px; /* Köşe yuvarlama */
                }
                .prev-btn, .next-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    z-index: 1;
                }

                .prev-btn {
                    left: 5%;
                }

                .next-btn {
                    right: 5%;
                }

                @media (max-width: 768px) {
                    .product-card {
                        flex: 0 0 calc(100% / 3);
                    }
                    .prev-btn {
                    left: 1%;
                    }
                    .next-btn {
                    right: 1%;
                }
                }

                @media (max-width: 480px) {
                    .product-card {
                        flex: 0 0 100%;
                    }
                    .new-product-card__information-box {
                    width:100% !important
                    }
                    .carousel-title{
                    padding: 0 10px
                    }
                }
            `;
      $("<style>").addClass("carousel-style").html(css).appendTo("head");
    },

    setEvents: () => {
      const carouselInner = $(".carousel-inner");
      let isDragging = false;
      let startX;
      let scrollLeft;

      carouselInner.on("mousedown", (e) => {
        isDragging = true;
        startX = e?.pageX - carouselInner?.offset()?.left;
        scrollLeft = carouselInner?.scrollLeft();
        carouselInner?.addClass("dragging");
        e?.preventDefault();
      });

      $(document)?.on("mousemove", (e) => {
        if (!isDragging) return;
        const x = e?.pageX - carouselInner?.offset().left;
        const walk = (x - startX) * 1.5;
        carouselInner?.scrollLeft(scrollLeft - walk);
        e?.preventDefault();
      });

      $(document)?.on("mouseup mouseleave", () => {
        if (!isDragging) return;
        isDragging = false;
        carouselInner?.removeClass("dragging");
      });

      $(".prev-btn")?.on("click", () => self.moveCarousel(-1));
      $(".next-btn")?.on("click", () => self.moveCarousel(1));
      $(".carousel")?.on("click", ".product-image", (e) =>
        self.openProductPage(e)
      );
      $(".carousel")?.on("click", ".favorite-btn", (e) =>
        self.toggleFavorite(e)
      );
    },

    moveCarousel: (direction) => {
      const carouselInner = $(".carousel-inner");
      const itemWidth = $(".product-card").outerWidth(true);
      const currentScroll = carouselInner.scrollLeft();
      const newScroll = currentScroll + direction * itemWidth;
      carouselInner.animate({ scrollLeft: newScroll }, 300);
    },

    openProductPage: (e) => {
      const productUrl = $(e.currentTarget).data("url");
      if (productUrl) {
        window.open(`${productUrl}`, "_blank");
      }
    },

    toggleFavorite: (e) => {
      const heartIcon = $(e.currentTarget);
      const productId = heartIcon.closest(".product-card").data("id");
      const isFavorited = heartIcon.hasClass("filled");
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      e.stopPropagation();

      if (isFavorited) {
        heartIcon.removeClass("filled");

        const index = favorites.indexOf(productId);
        if (index !== -1) {
          favorites.splice(index, 1);
        }
      } else {
        heartIcon.addClass("filled");

        favorites.push(productId);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      if (favorites.includes(productId)) {
        heartIcon.addClass(
          "new-product-card-like-button new-product-card-like-button-fav"
        );
      } else {
        heartIcon.removeClass("new-product-card-like-button-fav");
      }
    },

    fetchData: () => {
      if (!self.BASE_URL) {
        console.error("BASE_URL is not defined!");
        return;
      }

      $.get(self.BASE_URL)
        .done((data) => {
          if (typeof data !== "Array") {
            self.renderProducts(JSON.parse(data) || []);
          } else {
            self.renderProducts(data);
          }
        })
        .fail((error) => {
          console.error("Data fetch failed", error);
        });
    },

    renderProducts: (products) => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const carouselInner = $(".carousel-inner");
      carouselInner.empty();

      products.forEach((product) => {
        const isFavorited = favorites.includes(product.id);
        const productCard = `
            <div class="product-card" data-id="${product.id}" data-url="${
          product?.url
        }">
              <div class="new-product-card__image-wrapper">
                <a href="${product?.url}" target="_blank">
                  <img class="product-image" alt="${product?.name}" src="${
          product.img
        }" data-src="${product.img}">
                </a>
                <div class="favorite-btn ${
                  isFavorited
                    ? "new-product-card-like-button new-product-card-like-button-fav filled"
                    : "new-product-card-like-button"
                }" optionid="${product.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                    <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                  </svg>
                </div>
              </div>
              <div class="new-product-card__information-box">
                <div class="new-product-card__information-box__title" style="text-align:left">
                  <a href="${product?.url}" target="_blank">
                    <p class="product-name">${product.name}</p>
                  </a>
                </div>
                <div class="new-product-card__price">
                  <div class="price__current-price">${product.price} TL</div>
                </div>
              </div>
            </div>
          `;
        carouselInner.append(productCard);
      });
    },
  };

  self.init();
})();
