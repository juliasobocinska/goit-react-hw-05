import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" >
        <button>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
