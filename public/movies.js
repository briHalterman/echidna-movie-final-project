// The movies.js script for building the movies table and managing movie editing/adding

async function buildmoviesTable(
  moviesTable,
  moviesTableHeader,
  token,
  message
) {
  try {
    const response = await fetch("/api/v1/library", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    var children = [moviesTableHeader];
    if (response.status === 200) {
      if (data.count === 0) {
        moviesTable.replaceChildren(...children); // clear this for safety
        return 0;
      } else {
        for (let i = 0; i < data.movies.length; i++) {
          let editButton = `<td><button type="button" class="editButton" data-id=${data.movies[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.movies[i]._id}>delete</button></td>`;
          let rowHTML = `<td>${data.movies[i].title}</td><td>${data.movies[i].director}</td><td>${data.movies[i].year}</td><td>${data.movies[i].catagory}</td><td>${data.movies[i].isLiked}</td>${editButton}${deleteButton}`;
          let rowEntry = document.createElement("tr");
          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        moviesTable.replaceChildren(...children);
      }
      return data.count;
    } else {
      message.textContent = data.msg;
      return 0;
    }
  } catch (err) {
    message.textContent = "A communication error occurred.";
    return 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const logoff = document.getElementById("logoff");
  const message = document.getElementById("message");
  const logonRegister = document.getElementById("logon-register");
  const logon = document.getElementById("logon");
  const register = document.getElementById("register");
  const logonDiv = document.getElementById("logon-div");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const logonButton = document.getElementById("logon-button");
  const logonCancel = document.getElementById("logon-cancel");
  const registerDiv = document.getElementById("register-div");
  const name = document.getElementById("name");
  const email1 = document.getElementById("email1");
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");
  const movies = document.getElementById("movies");
  const moviesTable = document.getElementById("movies-table");
  const moviesTableHeader = document.getElementById("movies-table-header");
  const addmovie = document.getElementById("add-movie");
  const editMovie = document.getElementById("edit-movie");
  const title = document.getElementById("title");
  const director = document.getElementById("director");
  const year = document.getElementById("year");
  const catagory = document.getElementById("catagory");
  const isLiked = document.getElementById("isLiked");
  const addingMovie = document.getElementById("adding-movie");
  const moviesMessage = document.getElementById("movies-message");
  const editCancel = document.getElementById("edit-cancel");

  // section 2
  let showing = logonRegister;
  let token = null;
  document.addEventListener("startDisplay", async () => {
    showing = logonRegister;
    token = localStorage.getItem("token");
    if (token) {
      //if the user is logged in
      logoff.style.display = "block";
      const count = await buildmoviesTable(
        moviesTable,
        moviesTableHeader,
        token,
        message
      );
      if (count > 0) {
        moviesMessage.textContent = "";
        moviesTable.style.display = "block";
      } else {
        moviesMessage.textContent =
          "There are no movies to display for this user.";
        moviesTable.style.display = "none";
      }
      movies.style.display = "block";
      showing = movies;
    } else {
      logonRegister.style.display = "block";
    }
  });

  var thisEvent = new Event("startDisplay");
  document.dispatchEvent(thisEvent);
  var suspendInput = false;

  // section 3
  document.addEventListener("click", async (e) => {
    if (suspendInput) {
      return; // we don't want to act on buttons while doing async operations
    }
    if (e.target.nodeName === "BUTTON") {
      message.textContent = "";
    }
    if (e.target === logoff) {
      localStorage.removeItem("token");
      token = null;
      showing.style.display = "none";
      logonRegister.style.display = "block";
      showing = logonRegister;
      moviesTable.replaceChildren(moviesTableHeader); // don't want other users to see
      message.textContent = "You are logged off.";
    } else if (e.target === logon) {
      showing.style.display = "none";
      logonDiv.style.display = "block";
      showing = logonDiv;
    } else if (e.target === register) {
      showing.style.display = "none";
      registerDiv.style.display = "block";
      showing = registerDiv;
    } else if (e.target === logonCancel || e.target == registerCancel) {
      showing.style.display = "none";
      logonRegister.style.display = "block";
      showing = logonRegister;
      email.value = "";
      password.value = "";
      name.value = "";
      email1.value = "";
      password1.value = "";
      password2.value = "";
    } else if (e.target === logonButton) {
      suspendInput = true;
      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          message.textContent = `Logon successful.  Welcome ${data.user.name}`;
          token = data.token;
          localStorage.setItem("token", token);
          showing.style.display = "none";
          thisEvent = new Event("startDisplay");
          email.value = "";
          password.value = "";
          document.dispatchEvent(thisEvent);
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        message.textContent = "A communications error occurred.";
      }
      suspendInput = false;
    } else if (e.target === registerButton) {
      if (password1.value != password2.value) {
        message.textContent = "The passwords entered do not match.";
      } else {
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              email: email1.value,
              password: password1.value,
            }),
          });
          const data = await response.json();
          if (response.status === 201) {
            message.textContent = `Registration successful.  Welcome ${data.user.name}`;
            token = data.token;
            localStorage.setItem("token", token);
            showing.style.display = "none";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
            name.value = "";
            email1.value = "";
            password1.value = "";
            password2.value = "";
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communications error occurred.";
        }
        suspendInput = false;
      }
    } // section 4
    else if (e.target === addmovie) {
      showing.style.display = "none";
      editMovie.style.display = "block";
      showing = editMovie;
      delete editMovie.dataset.id;
      title.value = "";
      director.value = "";
      year.value = "";
      catagory.value = "catagory";
      isLiked.value = false;
      addingMovie.textContent = "add";
    } else if (e.target === editCancel) {
      showing.style.display = "none";
      title.value = "";
      director.value = "";
      year.value = "";
      catagory.value = "catagory";
      isLiked.value = false;
      thisEvent = new Event("startDisplay");
      document.dispatchEvent(thisEvent);
    } else if (e.target === addingMovie) {
      if (!editMovie.dataset.id) {
        // this is an attempted add
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/library", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              director: director.value,
              year: year.value,
              catagory: catagory.value,
              isLiked: isLiked.checked
            }),
          });
          const data = await response.json();
          if (response.status === 201) {
            //successful create
            message.textContent = "The movie entry was created.";
            showing.style.display = "none";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
            title.value = "";
            director.value = "";
            year.value = "";
            catagory.value = "catagory";
            isLiked.value = false;
          } else {
            // failure
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communication error occurred.";
        }
        suspendInput = false;
      } else {
        // this is an update
        suspendInput = true;
        try {
          const movieID = editMovie.dataset.id;
          const response = await fetch(`/api/v1/library/${movieID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              director: director.value,
              year: year.value,
              catagory: catagory.value,
              isLiked: isLiked.checked
            }),
          });
          const data = await response.json();
          if (response.status === 200) {
            message.textContent = "The entry was updated.";
            showing.style.display = "none";
            title.value = "";
            director.value = "";
            year.value = "";
            catagory.value = "catagory";
            isLiked.value = false;
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communication error occurred.";
        }
      }
      suspendInput = false;
    } // section 5
    else if (e.target.classList.contains("editButton")) {
      editMovie.dataset.id = e.target.dataset.id;
      suspendInput = true;
      try {
        const response = await fetch(`/api/v1/library/${e.target.dataset.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          title.value = data.movie.title;
          director.value = data.movie.director;
          catagory.value = data.movie.catagory;
          isLiked.checked = data.movie.isLiked;
          showing.style.display = "none";
          showing = editMovie;
          showing.style.display = "block";
          addingMovie.textContent = "update";
          message.textContent = "";
        } else {
          // might happen if the list has been updated since last display
          message.textContent = "The library entry was not found";
          thisEvent = new Event("startDisplay");
          document.dispatchEvent(thisEvent);
        }
      } catch (err) {
        message.textContent = "A communications error has occurred.";
      }
      suspendInput = false;
    }
    // check for deleteButton class in e.target
		else if (e.target.classList.contains("deleteButton")) {
			// id of the entry is stored in the data-id of the button
      editMovie.dataset.id = e.target.dataset.id;
			// set the suspendInput flag before you start async operations
      suspendInput = true;
			// 
      try {
				// call to fetch with a method of DELETE giving the URL of that entry
        const response = await fetch(`/api/v1/library/${e.target.dataset.id}`, {
          method: "DELETE",
					// include the authorization header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
					// put a message in the text content of the message paragraph
          message.textContent = "Movie entry has been deleted.";
					// redraw the table showing the updated list of entries by dispatching an event to startDisplay
					thisEvent = new Event("startDisplay");
          document.dispatchEvent(thisEvent);
        } else {
          // put a message indicating the failure in the message paragraph
          message.textContent = "Movie entry failed to delete.";
          thisEvent = new Event("startDisplay");
          document.dispatchEvent(thisEvent);
        }
      } catch (err) {
        message.textContent = "A communications error has occurred.";
      }
			// clear the suspendInput flag after async operations
      suspendInput = false;
    }
  });
});
