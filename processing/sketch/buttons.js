const btn1 = document.querySelector(".phase1");
const btn2 = document.querySelector(".phase2");
const btn3 = document.querySelector(".phase3");
const btn4 = document.querySelector(".phase4");

//definitely an easier way to do all of these but this works for now
btn1.addEventListener("click", () => {
    particleSetting = 0;
    btn1.style.backgroundColor = "#590707";
    btn2.style.backgroundColor = "black";
    btn3.style.backgroundColor = "black";
    btn4.style.backgroundColor = "black";
});

btn2.addEventListener("click", () => {
    particleSetting = 1;
    btn2.style.backgroundColor = "#590707";
    btn1.style.backgroundColor = "black";
    btn3.style.backgroundColor = "black";
    btn4.style.backgroundColor = "black";
});

btn3.addEventListener("click", () => {
    particleSetting = 2;
    btn3.style.backgroundColor = "#590707";
    btn2.style.backgroundColor = "black";
    btn1.style.backgroundColor = "black";
    btn4.style.backgroundColor = "black";
});

btn4.addEventListener("click", () => {
    particleSetting = 3;
    btn4.style.backgroundColor = "#590707";
    btn2.style.backgroundColor = "black";
    btn3.style.backgroundColor = "black";
    btn1.style.backgroundColor = "black";
});