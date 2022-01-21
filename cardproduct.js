const categories = document.querySelector(".categories");
const karmaButton = document.querySelector(".logo");
const path = document.getElementById("path");
const drpCateg = document.getElementById("drp-categ");

const Card = () => {
  const [state, setState] = React.useState("");
  const [data, setData] = React.useState(false);

  const getDataJq = function () {
    $.getJSON(
      "https://61eabfcc7ec58900177cd9cc.mockapi.io/api/products",
      function (data, status) {
        setData(data);
        if (state !== "") {
          const initCat = data.filter((item) => item.categories === state);
          setData(initCat);
          path.innerHTML = `<i class="fas fa-chevron-right" style="font-size: 0.7rem"></i> ${state}`;
          drpCateg.innerHTML = `${state}`;
        } else {
          path.innerHTML = ``;
          drpCateg.innerText = "Anasayfa";
        }
      }
    );
  };

  karmaButton.addEventListener("click", () => setState(""));

  categories.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    if (e.target.className === "category") {
      setState(value);
    }
  });

  // const getDataRct = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://61eabfcc7ec58900177cd9cc.mockapi.io/api/products"
  //     );
  //     const data = await response.json();
  //     setData(data);
  //     if (state !== "") {
  //       const initCat = data.filter((item) => item.categories === state);
  //       setData(initCat);
  //       path.innerHTML = `<i class="fas fa-chevron-right" style="font-size: 0.7rem"></i> ${state}`;
  //       drpCateg.innerHTML = `${state}`;
  //     } else {
  //       path.innerHTML = ``;
  //       drpCateg.innerText = "Anasayfa";
  //     }
  //   } catch (err) {
  //     (err) => console.log(err);
  //   }
  // };

  React.useEffect(() => {
    getDataJq();
    // getDataRct();
  }, [state]);

  return data ? (
    <div className="card">
      {data.map((item, index) => (
        <div className="productCard" key={item.id}>
          <img src={item.imageUrl} alt={item.name} />
          <div className="priceName">
            <p>{item.name}</p>
            <h4>{item.price}</h4>
            <span>
              <b>Taksitli Fiyat:</b> {item.hirePurchase}
            </span>
          </div>
          <div className="detailsCard">
            <input type="number" />
            <div className="icondetails">
              <i class="fas fa-cart-plus"></i>
              <i class="far fa-heart"></i>
              <i class="fas fa-sliders-h"></i>
            </div>
            <div class="incele">
              <span>ÜRÜNÜ İNCELE</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div id="spinner">
      <i class="fas fa-spinner"></i>
    </div>
  );
};

const products = document.getElementById("products");

ReactDOM.render(React.createElement(Card), products);
