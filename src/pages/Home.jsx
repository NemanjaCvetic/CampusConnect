import "./Home.css";
import Navbar from "../components/navbar";
import { useState } from "react";
import electronicsImg from "../assets/electronics.png"
import documentsImg from "../assets/documents.png"
import foodImg from "../assets/drinks.png"
import bookImg from "../assets/books.png"
import valuablesImg from "../assets/valuables.png"
import otherImg from "../assets/other.png"
import { Link } from "react-router-dom";
import ItemsMap from "./ItemsMap";

function Home() {
    const items = [
        { name: "Electronics", img: electronicsImg },
        { name: "Documents", img: documentsImg },
        { name: "Food&Drinks", img: foodImg },
        { name: "Books", img: bookImg },
        { name: "Valuables", img: valuablesImg },
        { name: "Other", img: otherImg }
    ];

    const items2 = [
  {
    id: 1,
    title: "Black Wallet",
    location: "Library",
    status: "Lost",
    lat: 45.5481,
    lng: 13.7300,
  },
  {
    id: 2,
    title: "White AirPods Case",
    location: "Cafeteria",
    status: "Found",
    lat: 45.5475,
    lng: 13.7294,
  },
];
    const [startIndex, setStartIndex] = useState(0);

    const visibleCards = items.slice(startIndex, startIndex + 3);

    function handleNext() {
        if (startIndex < items.length - 3) {
            setStartIndex(startIndex + 1);
        } else {
            setStartIndex(0);
        }
    }

    function handlePrev() {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(items.length - 3);
        }
    }

    return (
        <div className="home">


            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-label">Campus Lost & Found</p>
                    <h1>Lost or Found an Item on Campus?</h1>
                </div>
            </section>

            <section className="cards-section">
                <div className="cards-header">
                    <h2>Browse by Category</h2>

                    <div className="arrow-buttons">
                        <button onClick={handlePrev}>
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="cards-row">
                    {visibleCards.map((item) => (
                        <Link
                            to={`/lostfound?category=${item.name}`}
                            className="item-card"
                            key={item.name}
                        >
                            <img src={item.img} alt={item.name} />
                            <p>{item.name}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <div>
      
    </div>
        </div>
    );
}

export default Home;