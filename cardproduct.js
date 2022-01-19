const categories = document.querySelector(".categories");

const Card = () => {
  const [state, setState] = React.useState("Ayakkabı");
  const [data, setData] = React.useState(false);

  categories.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    if (e.target.className === "category") {
      setState(value);
    }
  });

  const getData = async () => {
    try {
      const response = await fetch("./data/data.json");
      const data = await response.json();
      setData(data);
    } catch (err) {
      (err) => console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return data ? (
    <div className="card">
      {data[0][state].map((item, index) => (
        <div className="productCard" key={index}>
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
    <h1>Loading</h1>
  );
};

const products = document.getElementById("products");

ReactDOM.render(React.createElement(Card), products);
