import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { fileChange } from "../services/fileChange";
import { post } from "../services/authService";

function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: 0,
    image: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", user)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.log("Error", error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleFileChange = (e) => {
    setButtonDisabled(true);

    fileChange(e)
      .then((response) => {
        console.log("Line 48 Response:", response);
        setUser((prev) => ({
          ...prev,
          image: response.data.image,
        }));
        console.log("User with image:", user);
        setButtonDisabled(false);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log("Error while uploading the file: ", err);
      });
  };

  return (
    <div className="signup-page">
      <nav className="navbar">
        <h1>
          Spot <span>Me</span> Up
        </h1>
        <input type="text" placeholder="Search..." />
        <Link to="/">
          <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO3RoQ5BURjA8cNMsSmCrGiSN9BkzUvYFNUreADNM2iy4gUUzabaBAI/E7CxO9e9THB/22ln/2/nOyH8FfQv5xvhHIbuRsh/Kl7A2LMJimnjJUxFm6GcNF7B3GsLVN+N17CMEb9aoR433sDa+zZovoq3sJXcDu2oeAd76R3QfYz3cPQ5JwyiXpJKiPHJvxkQEt7LBjzJVnSTeEWZ8OAMA6G5Kg7kLikAAAAASUVORK5CYII=" />
            Home</button>
        </Link>
        {/* <Link to="/"><button className="navlinks">My Profile</button></Link> */}
        <hr />
        <Link to="/">
          <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVR4nM2WS0hVURSGfaTBTQdFEYRgGRpGD9AiKYMCoRpEAwt6IJqEMwlqENVUyUGCYRCRQQ+Cspp4HTSoBhJUoBQ9NHAiVmJUVsYt318s/U8erveeu0WJNmzYrL3+/9/nP+usfZKS/ucB1APLHfLygJNAaL6EbQwBl4EVAXmFk5nwGTjlfAAgP0A4kujJfcL9wAlPGFgS6BgwDtyKPoDItjsc3BMOxYhH4h6c6dEHbIiKF7oKBxzIRjuwNJZwrc+iTGCP4o+BpzrUgNwZ17pPe5aDMJkxhA8DKfGeuBgoBx4Bo8B32fQAqAb2AiXAZs0SxaqVExFmVBzl4pzhhCeaLGEDfgDqgE1Aqqq52cHqZuWmClsnroi4k6MBIeC+Ni8C6b69NOCMwK3AO9k7ojmgWKtyLDfNh08XJ9KYLjygCXgLXAW6gIVqBk0i/qUZlnVm7xbNEsXCvrwBYfPE1SVu07jiiWapSPKBRUAP0AGMAQ+B/YoH2u2z2XIPCDsmrh7F10orywBHgG6B1wO9sqVCsQxgl4ite71QTkSzV7Eh5VhuhrAV4uoF1inWbdVtiyrZsw34ClzXu2gDruk9fpOVZ4FKYJ8qtVjrSu2FVdEjwraJ6wbwBdgqrSpPGNnSrOqulyUGKLIqTVTRPstThbkpjvPivCsN/ML2Dl4DL9VAfgA7XMUCDrFTXLXifiWtv8LtepeXZFMncHAu15s+0UPiGhF3hrSmhX2AXOAC8An4rfd0DihTHWQDi/V9p2mdrb0yNY02YfvFlevjjy3sS1ig4jkNtKhJDBN/DCunRZjiWLVBIuE49qUAy4AcYKNmjmIpjhztsxaej8FshWVhotEyG+Fj1tYcATW6W2PNGscH6DDNJH3sg9bMnU4afz+hc0xdGKZV5HUaq8bGfyDcKK2pagcKdJXdnvE/NA/Cqvo70iiI3lwNPJcV1uLWzFXYOMQ1CDwzjXhga+alwBNgQtddg9pnp4Ow12obhJ0QV+mM354AolXAceAe8NH3yfwE3gNvNG1tMW9Yrt1Ehl3pJJbgINbgrVPt1h/GUU1bW8z2Jn8AXMYfdOmv9ezMYjQAAAAASUVORK5CYII=" />
            Venues</button>
        </Link>
        <Link to="/">
          <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC20lEQVR4nM2WW2jPYRjHN9uYZpYLi7gQc2gpF5RyYWGLC1ISShYlkXJYrcQNaglDFq1E7cKKizmVUk6RiBuxpIwQzSlEzqePnjy/7bt3v/f/n93wvfs9z/f7fN/3/T3vISfnfweQC4wB8nqpLwTG9Ua4hz842gttPtDq+row2Qx8BFZGxGdc+Aso+0vjOXTinCZKJXHZY0uMBBwGRgLVwtmRUrwLP8gdE+0qTVRKohGYRVfcA4qBN/79Cugn+jR+vkzqm8dtRUvUuEZES4F6umO0zybBbNGn8j23V2JN4TI1SbI8WFbDa2AE8E5i00Wfxrcungb89Jj1xsTQ+JKIdgJ9gF2+tHe8wCHhXLDtJfo0/kDgYXS2BmBLMOJ9SWHfvxUy8q+x/Qj0B6YCG4HrUu89MDRNUACcDcxv+Og/B/G6FL2ZXfRBpWFD2kAT8UDZ5DE8AooC3RTgSwbNA90BMfNRvlVimBfwreFeZBlsQ0ZTKTYjUsCWsb/wioMV+h7Rbe2p8fpIgWsBz7o/wTNge0S3rCemRcDzSIHdwusre9qabzJQG9FN6InxOuKYL7wqie/32MEUzVvd71EAVzIYrxVeg8Rtj+cBbRHdpLhjZ8H2DMYvraGCk67dTy27mWJo6YnxUxHcDc5ww2bnzfQrcK4fPveFc8saUb7txCvPZnxVBEf8CGwNjr7SQLMiGFyV32R2BSY4kM3YXiEJzntsfHBs6r+2G+iJ5E5LbrXE27IZ1wn5tsTt3E5QI/GFwQHSsaTAYMl9yma8XMjtHrPm+SDxCuFrDzQHtXKDS6Mkk3FlMINcP78T/AAGCF+XeXFKvceSH5vJuIyuGOSdm+CmcO2lgrwuut23QXdXZDIu8FklsAf8JvluFO6atH4I6rUIZ0HU2Mn2Qkxgz9pt8l0tPI3XR2rpI3BRNmPbh/aaqPXvYcAJf3MVCm84cBI4DgyJ1DLOKdd2XKn/FL8B3eqGGcxTviEAAAAASUVORK5CYII=" />
            Events</button>
        </Link>
        <Link to="/">
          <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmElEQVR4nO2WOw6DMBAF3dEhUUFKQkuX24TDRIiLOqdAomDQpoosoHtbWB7J7Y5s7y+EQtYAD+AlON2VcAF2NOzAnAorYEPLZp5/aYMPTZG6PW8NrFIdv/h1msE9EEXCaPGvanUSSd93HWkUScc7qe9NgQH4Cv/0mQr9s5fSBnNs+JX7PDVssos3h084w3YZ0Y7UngoL2XAAIiseHQUSURIAAAAASUVORK5CYII=" />
            My Events</button>
        </Link>
        <Link to="/">
          <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAi0lEQVR4nO3VwQ2AIAwF0B5dQyfx4ByOIl3LeGAFLq7BCt+DHqrhYIgUDPykN8hL2wSIWrQDoAcwJa4hBC9IH24w/WXUHsB2ldeErbhnq4B9rlHHhovq2OTasWlwiaN24qtzmnBsuCiYq4NN4OAuXqgvan7T8Qqgo9TBHdZBH7AeKmBdlE54VEdz5AAVy2PKYhcZOwAAAABJRU5ErkJggg==" />
            About Us</button>
        </Link>
      </nav>

      <form onSubmit={handleSignupSubmit} className="signup-form">
        <div className="signup-fields">
          <h1 className="signup-title">Sign Up</h1>
          <input
            type="email"
            name="email"
            onChange={handleTextChange}
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleTextChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleTextChange}
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            onChange={handleTextChange}
          />
          <input type="file" name="profile-image" onChange={handleFileChange} />
          <button type="submit">Sign up</button>
          <p className="signup-signin">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            Have an account? <br />
            <Link to="/login"> Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
