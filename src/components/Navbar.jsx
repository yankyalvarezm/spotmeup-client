import React from "react";
import homePage from "../pages/HomePage";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>
          Spot <span>Me</span> Up
        </h1>
      </Link>
      <input type="text" placeholder="   Search..." />
      <Link to="/">
        <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO3RoQ5BURjA8cNMsSmCrGiSN9BkzUvYFNUreADNM2iy4gUUzabaBAI/E7CxO9e9THB/22ln/2/nOyH8FfQv5xvhHIbuRsh/Kl7A2LMJimnjJUxFm6GcNF7B3GsLVN+N17CMEb9aoR433sDa+zZovoq3sJXcDu2oeAd76R3QfYz3cPQ5JwyiXpJKiPHJvxkQEt7LBjzJVnSTeEWZ8OAMA6G5Kg7kLikAAAAASUVORK5CYII=" />
          Home
        </button>
      </Link>

      {!user ? (
        <div className="logout-profile">
          <Link to="/login">
            <button className="navlinks">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAACEklEQVR4nM3Wz4uNURzH8Xu7aMZglA0NkYWyIfNXyFapKSKaMUSxxAIL5S/wYzCNyZIksZJk4Q+QpmaDCWmaLLiMH5uXzjhTx+O5z/Pc6yafejbnfM73/Zzv9/yq1f5HYQ0OYhzPMI0pPMYEhrC6G6CNmMQ35fqBG1jfKewk5pOAH3Abp3EIIzgX25qJbx4n2gEtwa0kwCvsQ0/BmB7sx0wyLsx2WRmsjpvJoKvobeNnezCWQssGHE/MZ6qCcuKcSuLkpxebkppd6xS2qBAjqelAniGkL+g1+moV612S3pmWqcVc7ByuCHuKWQwWeA7EmN/Rn+3ci/NoVAROJ9tlsGCWzegbqhK3CLgF7xLojha+O9EznjY24qLZ3Oa3E5+KoH4dDkGP0sYHuqM5rMwAw4kUNJU23usScBYrMsDDecB6PKjbTemuZFGE2W3LSWlYiL+ntBNhK94XwYJwN3qu13L2zMWizZzxv0xg21t4evE5+va02vijbWz8t61gQfEaE+/TVbVUuBQ73/zR2YGwPP5Q0JU8w4Zk+pNdAE7EWCHmulam0WSJX/gL2NkkzpEiYz25VhZmmt1XJaC+zAV+ucqgRnydLSrUYbjoyor1GknO1gUYllb92RDkaFLToI+4H9MV+o6FtMe29LHVLExjCXQgpviLcn2Ns1rbESwD7o/3ZQj4BC/wHA/jS2F3O7X+p/oJxluj6cZHUhoAAAAASUVORK5CYII=" />
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="navlinks">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACYElEQVR4nLXWS6hOURTA8ROuwsxroEyu1L0epYw8RvIoA0UeI4bCxGPgkUIpj4FnEZEBA7rkOUEpxQR3SIm8w8BbLnnkp8366ut0vu+eeztW7fr23utb/7PXXnutlWXdCPpjPg7gEq5gF1qz/yWYgEd4jaPYhO24hvdYg8FVQ4fiDfaiX8H+MtzBY4ysErwNt9CniU7fcP2xKsGdWFlCb07yTJXgV8loCb2x/snAqsAvSoIn4jdaqgLfxvISegvxvBJokng+h7NuBPtxMqtKcBrnS+hdQEeV4CdYUNLVj6sEn8U5jGiiMyJ5JelWCW7FQ6xuorMiUmq1eRsbcb3J/mVsqRSaBKPwPVWnrDhj/URb9j8Eu1M+LlhP93+oYH0ApmFJlNNxvQVvTnW4YL0DO+vmQ7APXfiEu1G5fuE+FvUUfAhnCtZPpCQTv9sCkrLdrPoyGuV1XXzMkVTRugMOitP+wOyC/Zl4iuEBPd4sX6MdL7GjkcJo7MHHMDiribGae2/noeGRubm1SRGQ4/Lv9lTcydX0p6LOoyCQvhR9XNTzpQ2C8mBtMhsfcBHjm8FyRlL0fm7QGjUCL8GD9GMMvmF9WWCdkcW4l3NvZ4yuiIHafG7oTMXXmvK1nkLDSHqnj+rm89IpYzwL27V5e+jMwLssWteOOoWyY3oKkoiJYT1w9QbcqCn0ZlwIQyk5rC0DRku6X6zqjYfzgEWRHP66Muf2/NrW6OUqawyPRHKY1GC/JaApiCdXAg3DqbHfEckhvdP0ZKZEdkt3mtybTlodNPcBKdgOBiid7i1upmYi794/lIvQB4SHGCQAAAAASUVORK5CYII=" />
              Sign Up
            </button>
          </Link>
        </div>
      ) : null}

      {user ? (
        <div className="logout-profile">
          <Link to="/">
            <button className="navlinks" onClick={handleLogout}>
              Log Out
            </button>
          </Link>
          <Link to="/">
            <button className="navlinks">My Profile</button>
          </Link>
        </div>
      ) : null}

      <hr className="navbar-hr" />
      <Link to="/venues">
        <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVR4nM2WS0hVURSGfaTBTQdFEYRgGRpGD9AiKYMCoRpEAwt6IJqEMwlqENVUyUGCYRCRQQ+Cspp4HTSoBhJUoBQ9NHAiVmJUVsYt318s/U8erveeu0WJNmzYrL3+/9/nP+usfZKS/ucB1APLHfLygJNAaL6EbQwBl4EVAXmFk5nwGTjlfAAgP0A4kujJfcL9wAlPGFgS6BgwDtyKPoDItjsc3BMOxYhH4h6c6dEHbIiKF7oKBxzIRjuwNJZwrc+iTGCP4o+BpzrUgNwZ17pPe5aDMJkxhA8DKfGeuBgoBx4Bo8B32fQAqAb2AiXAZs0SxaqVExFmVBzl4pzhhCeaLGEDfgDqgE1Aqqq52cHqZuWmClsnroi4k6MBIeC+Ni8C6b69NOCMwK3AO9k7ojmgWKtyLDfNh08XJ9KYLjygCXgLXAW6gIVqBk0i/qUZlnVm7xbNEsXCvrwBYfPE1SVu07jiiWapSPKBRUAP0AGMAQ+B/YoH2u2z2XIPCDsmrh7F10orywBHgG6B1wO9sqVCsQxgl4ite71QTkSzV7Eh5VhuhrAV4uoF1inWbdVtiyrZsw34ClzXu2gDruk9fpOVZ4FKYJ8qtVjrSu2FVdEjwraJ6wbwBdgqrSpPGNnSrOqulyUGKLIqTVTRPstThbkpjvPivCsN/ML2Dl4DL9VAfgA7XMUCDrFTXLXifiWtv8LtepeXZFMncHAu15s+0UPiGhF3hrSmhX2AXOAC8An4rfd0DihTHWQDi/V9p2mdrb0yNY02YfvFlevjjy3sS1ig4jkNtKhJDBN/DCunRZjiWLVBIuE49qUAy4AcYKNmjmIpjhztsxaej8FshWVhotEyG+Fj1tYcATW6W2PNGscH6DDNJH3sg9bMnU4afz+hc0xdGKZV5HUaq8bGfyDcKK2pagcKdJXdnvE/NA/Cqvo70iiI3lwNPJcV1uLWzFXYOMQ1CDwzjXhga+alwBNgQtddg9pnp4Ow12obhJ0QV+mM354AolXAceAe8NH3yfwE3gNvNG1tMW9Yrt1Ehl3pJJbgINbgrVPt1h/GUU1bW8z2Jn8AXMYfdOmv9ezMYjQAAAAASUVORK5CYII=" />
          Venues
        </button>
      </Link>
      <Link to="/events">
        <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC20lEQVR4nM2WW2jPYRjHN9uYZpYLi7gQc2gpF5RyYWGLC1ISShYlkXJYrcQNaglDFq1E7cKKizmVUk6RiBuxpIwQzSlEzqePnjy/7bt3v/f/n93wvfs9z/f7fN/3/T3vISfnfweQC4wB8nqpLwTG9Ua4hz842gttPtDq+row2Qx8BFZGxGdc+Aso+0vjOXTinCZKJXHZY0uMBBwGRgLVwtmRUrwLP8gdE+0qTVRKohGYRVfcA4qBN/79Cugn+jR+vkzqm8dtRUvUuEZES4F6umO0zybBbNGn8j23V2JN4TI1SbI8WFbDa2AE8E5i00Wfxrcungb89Jj1xsTQ+JKIdgJ9gF2+tHe8wCHhXLDtJfo0/kDgYXS2BmBLMOJ9SWHfvxUy8q+x/Qj0B6YCG4HrUu89MDRNUACcDcxv+Og/B/G6FL2ZXfRBpWFD2kAT8UDZ5DE8AooC3RTgSwbNA90BMfNRvlVimBfwreFeZBlsQ0ZTKTYjUsCWsb/wioMV+h7Rbe2p8fpIgWsBz7o/wTNge0S3rCemRcDzSIHdwusre9qabzJQG9FN6InxOuKYL7wqie/32MEUzVvd71EAVzIYrxVeg8Rtj+cBbRHdpLhjZ8H2DMYvraGCk67dTy27mWJo6YnxUxHcDc5ww2bnzfQrcK4fPveFc8saUb7txCvPZnxVBEf8CGwNjr7SQLMiGFyV32R2BSY4kM3YXiEJzntsfHBs6r+2G+iJ5E5LbrXE27IZ1wn5tsTt3E5QI/GFwQHSsaTAYMl9yma8XMjtHrPm+SDxCuFrDzQHtXKDS6Mkk3FlMINcP78T/AAGCF+XeXFKvceSH5vJuIyuGOSdm+CmcO2lgrwuut23QXdXZDIu8FklsAf8JvluFO6atH4I6rUIZ0HU2Mn2Qkxgz9pt8l0tPI3XR2rpI3BRNmPbh/aaqPXvYcAJf3MVCm84cBI4DgyJ1DLOKdd2XKn/FL8B3eqGGcxTviEAAAAASUVORK5CYII=" />
          Events
        </button>
      </Link>
      <Link to="/myEvents">
        <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmElEQVR4nO2WOw6DMBAF3dEhUUFKQkuX24TDRIiLOqdAomDQpoosoHtbWB7J7Y5s7y+EQtYAD+AlON2VcAF2NOzAnAorYEPLZp5/aYMPTZG6PW8NrFIdv/h1msE9EEXCaPGvanUSSd93HWkUScc7qe9NgQH4Cv/0mQr9s5fSBnNs+JX7PDVssos3h084w3YZ0Y7UngoL2XAAIiseHQUSURIAAAAASUVORK5CYII=" />
          My Events
        </button>
      </Link>
      <Link to="/about">
        <button className="navlinks">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAi0lEQVR4nO3VwQ2AIAwF0B5dQyfx4ByOIl3LeGAFLq7BCt+DHqrhYIgUDPykN8hL2wSIWrQDoAcwJa4hBC9IH24w/WXUHsB2ldeErbhnq4B9rlHHhovq2OTasWlwiaN24qtzmnBsuCiYq4NN4OAuXqgvan7T8Qqgo9TBHdZBH7AeKmBdlE54VEdz5AAVy2PKYhcZOwAAAABJRU5ErkJggg==" />
          About Us
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
