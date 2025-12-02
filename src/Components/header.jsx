
import "./Header.css";
import { GiKnifeFork } from "react-icons/gi";


const Header = ({ query, setquery, handleSearch }) => {
  return (
    <header className="app-header d-flex flex-column justify-content-center align-items-center">
       <div className="text-center mb-3  mr-4 d-flex align-items-center justify-content-center">
        <GiKnifeFork className="cook-icon me-2 text-warning " style={{fontSize:"60px"}} />
        <h1 className="app-title">FoodIE Explorer</h1>
      </div>

      <p className="app-subtitle text-center">
        "Good food is the foundation of genuine happiness."
      </p>


      <form className="d-flex search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2 search-input"
          placeholder="Search for a dish..."
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <button className="btn btn-primary search-btn ml-2" type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
