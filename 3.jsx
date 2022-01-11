function NavBar({ menuitems }) {
  const { Card, Button } = ReactBootstrap;
  const [stock, setStock] = React.useState(menuitems);
  const [cart, setCart] = React.useState([]);
  const moveToCart = (e) => {
    let [name, num] = e.target.innerHTML.split(":");
    if (num <= 0) return; 
    let item = stock.filter((item) => item.name == name);
    let newStock = stock.map((item) => {
      if (item.name == name) {
        item.instock--;
      }
      return item;
    });
  

    setStock([...newStock]);
    setCart([...cart, ...item]); 
    console.log(`Cart: ${JSON.stringify(cart)}`);
  };
  const updatedList = menuitems.map((item, index) => {
    return (
      <Button key={index} onClick={moveToCart}>
        {item.name}:{item.instock}
      </Button>
    );
  });
  // note that React needs to have a single Parent
  return (
    <>
      <ul key="stock" style={{ listStyleType: "none" }}>
        {updatedList}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}
function Cart({ cartitems }) {
  const { Card, Button } = ReactBootstrap;
  console.log("rendering Cart");
  const updatedList = cartitems.map((item, index) => {
    return <Button key={index}>{item.name}</Button>;
  });
  return (
    <ul style={{ listStyleType: "none" }} key="cart">
      {updatedList}
    </ul>
  );
}

const menuItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 3 },
  { name: "pear", instock: 0 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 },
];
ReactDOM.render(
  <NavBar menuitems={menuItems} />,
  document.getElementById("root")
);
