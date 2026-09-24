export default function RootNotFound() {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f9fafb",
          color: "#1f2937",
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Nicolò Peruzzi
          </p>
          <h1 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1rem" }}>Pagina non trovata</h1>
          <a href="/it" style={{ color: "#1a365d" }}>
            Torna alla home
          </a>
        </main>
      </body>
    </html>
  );
}
