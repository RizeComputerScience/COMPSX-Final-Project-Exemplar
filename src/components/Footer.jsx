function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>MovieHub</h5>
            <p className="mb-0">Your gateway to millions of movies</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              Powered by{' '}
              <a 
                href="https://www.themoviedb.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-info"
              >
                TMDB API
              </a>
            </p>
            <small className="text-muted">
              © 2024 MovieHub. Educational Project.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;