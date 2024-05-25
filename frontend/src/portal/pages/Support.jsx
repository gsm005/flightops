import { Container } from "@mantine/core"

// import "./support.css"

export function Support() {
    return (
        <Container>
            <header>
                <h1>About Us</h1>
            </header>

            <section className="content">
                <h2>Our Mission</h2>
                <p>In response to the significant challenges faced in the aviation industry, our project aims to revolutionize flight safety and efficiency. We leverage existing algorithms to optimize flight paths, enhance safety measures, and improve operational productivity.</p>

                <h2>Problem Statement</h2>
                <p>Our project addresses the challenge of using advanced algorithms for optimizing flight paths, providing real-time risk assessment, and suggesting alternative routes to pilots, airlines, and airport authorities for safe and efficient navigation.</p>

                <h2>Our Solution</h2>
                <p>Developed in collaboration with leading aviation authorities, our software solution is a pioneering tool in the context of flight safety and operational efficiency. It provides aviation management with three critical capabilities:</p>
                <ul>
                    <li><strong>Optimal Flight Path Identification:</strong> We employ sophisticated algorithms to identify the most efficient and safe flight paths, considering weather, air traffic, and other variables.</li>
                    <li><strong>Real-Time Risk Assessment:</strong> Our system provides real-time analysis of potential risks and suggests alternative routes to mitigate them, ensuring the safety of passengers and crew.</li>
                    <li><strong>Flight Health Monitoring:</strong> We integrate real-time health metrics tracking based on flight sensor data to monitor the aircraft's condition, enhancing maintenance and operational decisions.</li>
                </ul>

                <h2>Our Vision</h2>
                <p>We are committed to creating safer, more efficient skies for the future. Our solution combines technical expertise with real-time data to redefine flight safety and operational management.</p>
            </section>

            <footer>
                <p>&copy; 2024 Solution made for Airbus Hackathon. All rights reserved.</p>
            </footer>
        </Container>
    )
}
