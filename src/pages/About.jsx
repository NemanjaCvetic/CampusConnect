import "./About.css";

function About() {
    return (
        <div className="about-page">
            <section className="about-main">
                <div className="about-overlay">
                    <h1>About CampusConnect</h1>
                    <p>
                        A smart lost and found platform built for campus,
                        designed to help students recover important belongings faster,
                        safer, and in a more organized way.
                    </p>
                </div>
            </section>

            <section className="about-content">
                <div className="about-section">
                    <h2>What is CampusConnect?</h2>
                    <p>
                        CampusConnect is a web application created to improve the way lost
                        and found items are handled. Instead of relying on
                        informal posts, messages, or physical notice boards, the platform
                        gives students and staff one clear place to report, browse, and
                        recover lost items.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Project Goal</h2>
                    <p>
                        The goal of the project is to make item recovery simpler and more
                        secure on campus. Students often lose keys, ID cards, headphones,
                        chargers, wallets, or other important belongings. CampusConnect
                        helps connect lost reports with found items in a way that is
                        practical, user-friendly, and reliable.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Main Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Lost Reports</h3>
                            <p>
                                Users can report missing items with descriptions, categories,
                                and locations.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Found Listings</h3>
                            <p>
                                Recovered items can be posted in a structured and organized way
                                for easier searching.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Smart Matching</h3>
                            <p>
                                The platform is designed to help users notice possible matches
                                between lost and found items.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Safer Claims</h3>
                            <p>
                                Sensitive details can stay protected until ownership is
                                confirmed.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Student-Friendly Design</h3>
                            <p>
                                A clean and simple interface makes the platform easy to use on
                                campus.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Future Expansion</h3>
                            <p>
                                The system can later include alerts, admin tools, and stronger
                                verification workflows.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Why It Matters</h2>
                    <p>
                        Losing personal belongings can be stressful, especially in a busy
                        university environment. CampusConnect aims to reduce that stress by
                        creating a centralized solution that is more efficient than
                        scattered social media posts or word-of-mouth communication. It is
                        a practical project that combines usability, organization, and
                        modern web development.
                    </p>
                </div>
            </section>

            <div className="about-section contact-card">
                <h2>Contact</h2>

                <p>
                    If you have questions, suggestions, or want to collaborate on this project,
                    feel free to reach out.
                </p>

                <div className="contact-info">
                    <p><strong>Email:</strong> cc@famnit.com</p>
                    <p><strong>Location:</strong> Koper, Slovenia</p>
                </div>

                <div className="contact-actions">
                    <a href="mailto:cc@famnit.com" className="contact-btn">
                        Send Email
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;