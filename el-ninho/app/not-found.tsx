export default function RootNotFound() {
  return (
    <html lang="it">
      <body style={{ margin: 0, background: "#f6f3ee", color: "#1a1a1a", fontFamily: "Georgia, serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <div>
            <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>The Velvet Table</p>
            <h1 style={{ fontWeight: 400, fontSize: "3rem" }}>Pagina non trovata</h1>
            <a href="/it" style={{ color: "#9a6230" }}>
              Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
