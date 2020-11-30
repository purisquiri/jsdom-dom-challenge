let timer;
let isActive = true
const counter = document.querySelector("#counter");
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const heart = document.querySelector('#heart');
const pause = document.querySelector("#pause")
const likes = document.querySelector('.likes')
const comments = document.querySelector("#list");
const commentForm = document.querySelector("#comment-form");
// const commentInput = document.querySelector("#comment-input")


document.addEventListener("DOMContentLoaded", startTimer);
minus.addEventListener("click", decrementCounter);
plus.addEventListener("click", incrementCounter);
heart.addEventListener('click', addLike);
pause.addEventListener("click", pauseOrResumeActivities);
commentForm.addEventListener("submit", displayComment);
// commentInput.addEventListener("input", handleInput)  
//for input you can use 4 different addEventListener ("input" and "change" are more used, "keyup" and "keydown" are more specific)
// we don't need it right now but this can help for autocomplete a search or something like that

function startTimer() {
    timer = setInterval(incrementCounter, 1000)
}

function decrementCounter() {
    const currentCount = parseInt(counter.textContent, 10) //by defaulf parsInt has base 10, we are adding just for fun
    if (currentCount > 0) {
    counter.textContent = `${currentCount - 1}`;
    }   
}

function incrementCounter() {
    const currentCount = parseInt(counter.textContent, 10) //by defaulf parsInt has base 10, we are adding just for fun
    counter.textContent = `${currentCount + 1}`;
}

function addLike() {
    const currentCount = parseInt(counter.textContent, 10)
    
    //const previusLikes = currentCount already exists
    // const previusLikes = document.querySelectorAll(".likes > li");
    const previousLikes = Array.from(likes.children) //all the children of the ul are li, so is safe to use this, but in order to use built functions on it we need to add Array.from 
    const previousLike = previousLikes.find(previousLike => {
        const previousLikeCount = +previousLike.textContent.split(" ")[0]
        return previousLikeCount === currentCount
        
    })
    // console.log(previousLike);

    if (previousLike){
        // const numberOfHearts = +previousLike.textContent.slice(-6,-5) // this is hard coding cause when two digits or times in plural will be not the same slice
        
        const previousHeartText = +previousLike.textContent.split(" ").slice(-2)[0]
        const numberOfHearts = +previousHeartText
        previousLike.textContent = `${currentCount} has been liked ${numberOfHearts +1} times`
    } else {
        const newLike = document.createElement("li");
        newLike.textContent = `${currentCount} has been liked 1 time`
        likes.appendChild(newLike)

    }

}

function pauseOrResumeActivities() {
    const buttons = Array.from(document.querySelectorAll('button'));
    const notPauseButton = buttons.filter(button => button.id !== "pause")
    

    if (isActive) {
        clearInterval(timer);
        pause.textContent = "resume"
        notPauseButton.forEach(button => button.disabled = true);
        isActive = false;
    } else {
        startTimer();
        pause.textContent = "pause"
        notPauseButton.forEach(button => button.disabled = false);
        isActive = true;
    }
}

function displayComment(event) {
    event.preventDefault();

    const commentFormData = new FormData(event.target);
    const commentText = commentFormData.get("comment")
   
    const comment = document.createElement("p")
    comment.textContent = commentText;
    comments.appendChild(comment);
    
    // commentForm.reset()
    event.target.reset()
}