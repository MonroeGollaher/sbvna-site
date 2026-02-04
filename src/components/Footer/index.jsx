export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        marginTop: 48,
        padding: "24px 16px",
        background: "#fafafa"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >
        <h3 style={{ marginTop: 0 }}>Contact Us</h3>

        <p>
          Have questions, concerns, or ideas for the neighborhood? We’d love to
          hear from you.
        </p>

        <div style={{ marginTop: 12 }}>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:sbvnaboise@gmail.com">sbvnaboise@gmail.com</a>
          </p>

          <p>
            <strong>Neighborhood Association:</strong>
            <br />
            South Boise Village Neighborhood Association (SBVNA)
          </p>

          <p>
            <strong>Meetings:</strong>
            <br />
            Board meetings are open to all residents. Dates and locations are
            posted on this website.
          </p>
        </div>

        <p style={{ marginTop: 16, fontSize: "0.9rem", color: "#666" }}>
          © {new Date().getFullYear()} South Boise Village Neighborhood
          Association
        </p>
      </div>
    </footer>
  );
}
