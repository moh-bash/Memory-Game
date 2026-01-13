let namegame = document.getElementById("player-name");
let nameSpan = document.getElementById("name");
namegame.addEventListener("keyup", function() {
    nameSpan.innerText = namegame.value;
});
let goplay = document.getElementById("new-game");
goplay.onclick = function() {
    if (namegame.value === ""|| namegame.value == null) {
        namegame.placeholder = "Please enter your name";
        namegame.classList.add("pom");
        namegame.onkeyup = function() {
            namegame.classList.remove("pom");
        }
    } else {
        document.querySelector(".controller").style.display = "none";
        let levelupSound = document.getElementById("levelup");
        levelupSound.play();
        let timeCounter = document.getElementById("time");
        let gameOverPopp = document.getElementById("game-over");
        let seconds = 320;
        let timer = setInterval(() => {
            seconds--;
            timeCounter.innerHTML = seconds;
            if (seconds === 0) {
                clearInterval(timer);
                gameOverPopp.classList.remove("hidden");
                let failSound = document.getElementById("lost");
                failSound.play();
            }
        }, 1000);
    }
}

// Game retry
let retry = document.getElementById("retry-btn");
retry.onclick = function() {
    window.location.reload();
};
let successRetry = document.getElementById("play-again-btn");
successRetry.onclick = function() {
    window.location.reload();
};


let time = 1000;
let containerblock = document.getElementById("containerblock");
let blocks = Array.from(containerblock.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click",function(){
        flipblock(block);
    });
});

// Flip function
function flipblock(selectedblock) {
    selectedblock.classList.add("flepped");
    let allfleppedblocks = blocks.filter(fleppedblock => fleppedblock.classList.contains("flepped"));
    if (allfleppedblocks.length === 2) {
        stopclicking();
        checkmatch(allfleppedblocks[0], allfleppedblocks[1]);
    }

};




// Match function
function checkmatch(block1, block2) {
    let triesElement = document.querySelectorAll(".wrong");
    let triesCorrect = document.querySelectorAll(".correct");
    let winsuccess = document.getElementById("congratulations");
    if (block1.dataset.technology === block2.dataset.technology) {
        triesCorrect.forEach(span => {
            span.innerHTML = parseInt(span.innerHTML) + 1;
            if(span.innerHTML == 15){
                winsuccess.classList.remove("hidden");
            };
        });

        block1.classList.remove("flepped");
        block2.classList.remove("flepped");

        block1.classList.add("matched");
        block2.classList.add("matched");

        let successSound = document.getElementById("success");
        successSound.play();
    }else{
        triesElement.forEach(span => {
            span.innerHTML = parseInt(span.innerHTML) + 1;
        });
        setTimeout(() => {
            block1.classList.remove("flepped");
            block2.classList.remove("flepped");
        }, time);
        let errorSound = document.getElementById("error");
        errorSound.play();
    }
};

// Stop clicking function
function stopclicking() {
    containerblock.classList.add("no-clicking");
    setTimeout(() => {
        containerblock.classList.remove("no-clicking");
    }, time);
};

// Shuffle function
function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random()*current);
        current--;
        temp = array[current];
        array[current]= array[random];
        array[random]= temp;
    }
    return array;ه
}
