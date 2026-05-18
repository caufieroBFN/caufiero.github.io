// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9fIKZMSD5VofZeItRnd7xscBcDaoHH9g",
    authDomain: "jsblogtest-76041.firebaseapp.com",
    projectId: "jsblogtest-76041",
    storageBucket: "jsblogtest-76041.firebasestorage.app",
    messagingSenderId: "369843926061",
    appId: "1:369843926061:web:6fa8616915261819d2f4a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//save data when the button is pressed
const submitButton = document.getElementById("submit-data");
submitButton.addEventListener("click", () => {
    const name = document.getElementById("name-box").value;
    const userColor = document.getElementById("name-color").value;
    const text = document.getElementById("text-box").value;

    const messagesRef = ref(db, "chatinfo");

    push(messagesRef, {
        user: name,
        color: userColor,
        message: text
    });

    alert("Saved data");
});

//load data on startup
function loadData() {
    const dbRef = ref(db, "chatinfo");

    //variables to set
    let currentName = "";
    let currentColor = "#000000";
    let currentMessage = "";

    get(dbRef).then((snapshot) => {
        snapshot.forEach((child) => {

            if (snapshot.exists()) {
                const data = child.val();
                currentName = data.user;
                currentColor = data.color;
                currentMessage = data.message;

                //create the new div for the message
                const refBlock = document.querySelector(".message-box");
                const cloneBlock = refBlock.cloneNode(true);

                refBlock.querySelector(".user").textContent = currentName;
                refBlock.querySelector(".user").style.color = currentColor;
                refBlock.querySelector(".message").textContent = currentMessage;

                //append this new message into the DOM
                document.getElementById("responses").appendChild(cloneBlock);

            } else {
                //do something error handling here
            }
        });
    });
}

loadData();