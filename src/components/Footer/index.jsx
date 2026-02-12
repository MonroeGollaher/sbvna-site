import "./styles.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <h3 className="footer__title">Contact Us</h3>

        <p>
          Have questions, concerns, or ideas for the neighborhood? We'd love to
          hear from you.
        </p>

        <div className="footer__contact">
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

        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} South Boise Village Neighborhood
          Association
        </p>
      </div>
    </footer>
  );
}
