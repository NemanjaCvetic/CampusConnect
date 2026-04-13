import "./Home.css";
import Navbar from "../components/navbar";
import { useState } from "react";
import electronicsImg from "../assets/electronics.png"
import documentsImg from "../assets/documents.png"
import foodImg from "../assets/drinks.png"
import bookImg from "../assets/books.png"
import valuablesImg from "../assets/valuables.png"
import otherImg from "../assets/other.png"

function Home() {
    const items = [
        { name: "Electronics", img: electronicsImg },
        { name: "Documents", img: documentsImg },
        { name: "Food&Drinks", img: foodImg },
        { name: "Books", img: bookImg },
        { name: "Valuables", img: valuablesImg },
        { name: "Other", img: otherImg }
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
            <Navbar />

            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-label">Campus Lost & Found</p>
                    <h1>Lost or Found an Item on Campus?</h1>
                    <p className="hero-text">
                        Report missing items, share found belongings, and help return them
                        to the right person.
                    </p>
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
                    {visibleCards.map((item, index) => (
                        <div className="item-card" key={index}>
                            <img src={item.img} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;