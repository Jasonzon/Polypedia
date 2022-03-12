import '../styles/Home.css';
import Header from "./Header"
import Select from "./Select"

function Home() {
  return (
    <div>
      <Header />
      <div className="Home">
        <h1>HOME</h1>
        <Select />
      </div>
    </div>
  );
}

export default Home;
