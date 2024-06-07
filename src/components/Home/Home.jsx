import Navbar from "../../components/Navbar/Navbar";
import Productpage from "../../components/ProductPage/Productpage";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Productpage />
      <Footer />
    </div>
  );
}

export default Home;
