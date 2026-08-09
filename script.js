// ===============================
// THEME TOGGLE
// ===============================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light");

        if (body.classList.contains("light")) {

            themeToggle.innerHTML = "☀️";

            localStorage.setItem("theme", "light");

        } else {

            themeToggle.innerHTML = "🌙";

            localStorage.setItem("theme", "dark");

        }

    });


    // Keep selected theme after refresh

    if (localStorage.getItem("theme") === "light") {

        body.classList.add("light");

        themeToggle.innerHTML = "☀️";

    }

}


// ===============================
// TYPING EFFECT
// ===============================

const typing = document.getElementById("typing");

if (typing) {

    const words = [
        "AI Engineer",
        "Machine Learning Enthusiast",
        "Data Science Explorer",
        "Software Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            typing.textContent =
                currentWord.substring(
                    0,
                    charIndex++
                );


            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1000
                );

                return;
            }

        } else {

            typing.textContent =
                currentWord.substring(
                    0,
                    charIndex--
                );


            if (charIndex < 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1)
                    % words.length;
            }
        }


        setTimeout(
            typeEffect,
            100
        );
    }


    typeEffect();
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements =
    document.querySelectorAll(".reveal");


function reveal() {

    revealElements.forEach(
        element => {

            const windowHeight =
                window.innerHeight;

            const elementTop =
                element.getBoundingClientRect().top;


            if (
                elementTop <
                windowHeight - 100
            ) {

                element.classList.add(
                    "active"
                );

            }

        }
    );
}


window.addEventListener(
    "scroll",
    reveal
);

reveal();


// ===============================
// CUSTOM CURSOR
// ===============================

const cursor =
    document.querySelector(".cursor");


if (cursor) {

    document.addEventListener(
        "mousemove",
        (e) => {

            cursor.style.left =
                e.clientX + "px";

            cursor.style.top =
                e.clientY + "px";

        }
    );
}


// ===============================
// MOBILE MENU
// ===============================

const menu =
    document.querySelector(".menu");

const navLinks =
    document.querySelector("nav ul");


if (menu && navLinks) {

    menu.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );
}


// ===============================
// CONTACT FORM
// LOCAL STORAGE
// ===============================

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            const data = {

                name: name,

                email: email,

                message: message,

                time:
                    new Date()
                        .toLocaleString(
                            "en-IN",
                            {
                                dateStyle: "medium",
                                timeStyle: "short"
                            }
                        )

            };


            let responses =
                JSON.parse(
                    localStorage.getItem(
                        "responses"
                    )
                ) || [];


            responses.push(data);


            localStorage.setItem(
                "responses",
                JSON.stringify(responses)
            );


            alert(
                "Message Sent Successfully!"
            );


            contactForm.reset();

        }
    );
}


// ===============================
// ADMIN LOGIN
// ===============================

function adminLogin() {

    const user =
        document
            .getElementById("adminUser")
            .value
            .trim();


    const pass =
        document
            .getElementById("adminPass")
            .value;


    // ADMIN CREDENTIALS

    if (
        user === "admin" &&
        pass === "1234"
    ) {

        document
            .getElementById("adminLogin")
            .style.display = "none";


        document
            .getElementById("responses")
            .style.display = "block";


        showResponses();

    } else {

        document
            .getElementById("loginMessage")
            .textContent =
            "Invalid Username or Password";

    }

}


// ===============================
// SHOW USER RESPONSES
// ===============================

function showResponses() {

    const list =
        document.getElementById(
            "responseList"
        );


    if (!list) return;


    const responses =
        JSON.parse(
            localStorage.getItem(
                "responses"
            )
        ) || [];


    list.innerHTML = "";


    if (responses.length === 0) {

        list.innerHTML = `

            <div class="no-responses">

                <h3>
                    No responses yet
                </h3>

                <p>
                    User messages will appear here.
                </p>

            </div>

        `;

        return;
    }


    responses.forEach(
        (item, index) => {

            list.innerHTML += `

                <div class="response-card">

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHTML(item.email)}
                    </p>

                    <p>
                        <strong>Message:</strong>
                        ${escapeHTML(item.message)}
                    </p>

                    <small>
                        🕐
                        ${escapeHTML(item.time)}
                    </small>

                    <button
                        onclick="deleteResponse(${index})"
                        class="delete-response">

                        Delete

                    </button>

                </div>

            `;

        }
    );
}


// ===============================
// DELETE RESPONSE
// ===============================

function deleteResponse(index) {

    let responses =
        JSON.parse(
            localStorage.getItem(
                "responses"
            )
        ) || [];


    responses.splice(
        index,
        1
    );


    localStorage.setItem(
        "responses",
        JSON.stringify(responses)
    );


    showResponses();
}


// ===============================
// LOGOUT ADMIN
// ===============================

function adminLogout() {

    document
        .getElementById("responses")
        .style.display = "none";


    document
        .getElementById("adminLogin")
        .style.display = "block";


    document
        .getElementById("adminUser")
        .value = "";


    document
        .getElementById("adminPass")
        .value = "";


    document
        .getElementById("loginMessage")
        .textContent = "";
}


// ===============================
// SECURITY HELPER
// ===============================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;
}


// ===============================
// BACKGROUND PARTICLES
// ===============================

const particlesContainer =
    document.querySelector(
        ".particles"
    );


if (particlesContainer) {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.animationDuration =
            (
                5 +
                Math.random() * 10
            ) + "s";


        particle.style.animationDelay =
            Math.random() * 5 + "s";


        particlesContainer.appendChild(
            particle
        );

    }
}


// ===============================
// PROJECT CARD FLIP
// ===============================

function flipCard(button) {

    const card =
        button.closest(
            ".flip-card"
        );


    if (card) {

        card.classList.toggle(
            "flipped"
        );

    }

}
