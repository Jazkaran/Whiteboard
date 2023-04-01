const firebaseConfig = {
  apiKey: "AIzaSyDgfWU0FXdbYib3AmscL3dwDSZYPa6OALI",
  authDomain: "board-97d4d.firebaseapp.com",
  projectId: "board-97d4d",
  storageBucket: "board-97d4d.appspot.com",
  messagingSenderId: "684885994796",
  appId: "1:684885994796:web:b155e50e7b02ddc69a1089"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


const whiteboard = document.getElementById("whiteboard");
const userInput = document.getElementById("user-input");
const counter = document.getElementById("counter");
const maxLength = 60;
const enterButton = document.getElementById('enter-button');
let containerCount = 0;

async function addTextToWhiteboard(likes = 0, id = null, text = null) {
  console.log('addTextToWhiteboard called with', { likes, id, text });
  if (!text) {
    text = userInput.value;
  
    // check if the text field is empty
    if (text.trim().length === 0) {
      // if the text field is empty, do nothing
      return;
    }
    
    // create a new document in Firestore
    // const docRef = await db.collection("texts").add({ text, likes: 0 });
    // id = docRef.id;
  }
  
  const textWrapper = document.createElement("div");
  textWrapper.classList.add("text-wrapper");

  // Add the id from Firestore as a data attribute to the textWrapper element
  if (id) {
    textWrapper.setAttribute('data-id', id);
} else {
    // create a new document in Firestore
    const docRef = await db.collection("texts").add({ text, likes: 0 });
    id = docRef.id;
    textWrapper.setAttribute('data-id', id);
}


  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  textWrapper.appendChild(contentContainer);

  const textContent = document.createElement("div");
  textContent.classList.add("text-content");
  contentContainer.appendChild(textContent);

    // const backgroundVideo = document.getElementById("background-video");
    // const videoContainer = document.getElementById("video-container");
    
    // // remove the video container when the video ends
    // backgroundVideo.addEventListener("ended", () => {
    //   videoContainer.remove();
    // });

    // Append textWrapper to the top of the text-container
  const textContainer = document.getElementById("text-container");
  textContainer.appendChild(textWrapper);

    

    
  
    if (containerCount < 3) {
        const imageNode = document.createElement("img");
        imageNode.src = `medal${containerCount + 1}.png`;
        textContent.appendChild(imageNode);
      } else {
        const numberContainer = document.createElement("span");
        numberContainer.classList.add("number-container");
        textContent.appendChild(numberContainer);
      
        const numberNode = document.createTextNode(containerCount + 1 + ". ");
        numberContainer.appendChild(numberNode);
      
        const numberStyles = {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "white",
          paddingLeft: "10px",
          paddingRight: "25px",
        };
        Object.assign(numberContainer.style, numberStyles);
      }
      
      
      

    
    // New container for text 
    const textNumberContainer = document.createElement("div");
    textNumberContainer.classList.add("text-number-container");
    textContent.appendChild(textNumberContainer);
  
    const textNode = document.createTextNode(text);
    const textElement = document.createElement("div");
    textElement.appendChild(textNode);
    textNumberContainer.appendChild(textElement);

    
  
    const heartContainer = document.createElement("div");
    heartContainer.dataset.docId = id;
heartContainer.classList.add("heart-container");
contentContainer.appendChild(heartContainer);


  
    const heartButton = document.createElement("div");
    heartButton.classList.add("heart-button");
    heartButton.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
    </svg>`;
    heartContainer.appendChild(heartButton);
  
    const likesSpan = document.createElement("span");
    likesSpan.classList.add("likes");
    likesSpan.textContent = likes;
    heartContainer.appendChild(likesSpan);
  
    // increment the container count
    containerCount++;
  
    userInput.value = "";
  
    // reset the counter to 0
    counter.textContent = `0/${maxLength}`;

    // add a click event listener to the heart button to update the number of likes
// Add a click event listener to the heart button to update the number of likes
heartButton.addEventListener("click", async function () {
  console.log("Heart button clicked");
  heartButton.classList.toggle("clicked");
  const likesSpan = heartContainer.querySelector(".likes");
  console.log(likesSpan);
  let likesCount = parseInt(likesSpan.textContent);
  if (heartButton.classList.contains("clicked")) {
    likesCount++;
  } else {
    likesCount--;
  }
  likesSpan.textContent = likesCount;
  sortTextNodes();

  

  // Play the click sound
  const clickSound = document.getElementById("click-sound");
  clickSound.currentTime = 0;
  clickSound.play();
});


}

const introVideo = document.getElementById("intro-video");
const videoContainer = document.getElementById("video-container");
const playButton = document.getElementById("play-button");
      
      // introVideo.addEventListener("play", () => {
      //   introVideo.muted = false;
      // });

      playButton.addEventListener("click", () => {
        introVideo.play();
        playButton.style.display = "none";
      });

      // Remove the video container when the video ends
      introVideo.addEventListener("ended", () => {
        videoContainer.remove();
      });


      function sortTextNodes() {
        const textContainer = document.getElementById("text-container");
        const textWrappers = Array.from(textContainer.getElementsByClassName("text-wrapper"));
      
        textWrappers.sort((a, b) => {
          const likesElementA = a.querySelector(".likes");
          const likesElementB = b.querySelector(".likes");
          if (!likesElementA || !likesElementB) {
            return 0;
          }
          const likesA = parseInt(likesElementA.textContent);
          const likesB = parseInt(likesElementB.textContent);
          return likesB - likesA;
        });
    
      textWrappers.forEach((wrapper, index) => {
        const textContent = wrapper.querySelector(".text-content");
        let numberContainer = textContent.querySelector(".number-container");
        const imageNode = textContent.querySelector("img");
    
        if (index < 3) {
          if (!imageNode) {
            const newImageNode = document.createElement("img");
            newImageNode.src = `medal${index + 1}.png`;
            textContent.insertBefore(newImageNode, textContent.firstChild);
    
            if (numberContainer) {
              numberContainer.remove();
            }
          } else {
            imageNode.src = `medal${index + 1}.png`;
          }
        } else {
          if (!numberContainer) {
            numberContainer = document.createElement("span");
            numberContainer.classList.add("number-container");
            textContent.insertBefore(numberContainer, textContent.firstChild);
    
            const numberStyles = {
              fontFamily: "Arial",
              fontSize: "20px",
              color: "white",
              paddingLeft: "10px",
              paddingRight: "25px",
            };
            Object.assign(numberContainer.style, numberStyles);
    
            if (imageNode) {
              imageNode.remove();
            }
          }
          numberContainer.textContent = `${index + 1}. `;
        }
    
        textContainer.appendChild(wrapper);
      });
    }
    
    async function fetchData() {
      // remove any existing text nodes
const existingTextWrappers = document.querySelectorAll('.text-wrapper');
existingTextWrappers.forEach(wrapper => wrapper.remove());
      const querySnapshot = await firebase.firestore().collection("texts").orderBy('likes', 'desc').get();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        const existingTextWrapper = document.querySelector(`[data-id='${id}']`);
        if (!existingTextWrapper) {
          addTextToWhiteboard(data.likes, id, data.text);
        }
      });
    }
    
    
    
    
    // event listener for click event on enter button
enterButton.addEventListener('click', function() {
  console.log('enterButton clicked');
  const text = userInput.value;
  addTextToWhiteboard(0, null, text);
});

// event listener for keydown event on text field
userInput.addEventListener('keydown', function(event) {
  console.log('keydown clicked');
  if (event.key === 'Enter') {
    const text = userInput.value;
    addTextToWhiteboard(0, null, text);
  }
});
    
   // event listener for input event on text field
    userInput.addEventListener("input", function() {
    const textLength = userInput.value.length;
    counter.textContent = `${textLength}/${maxLength}`;
});

document.addEventListener('DOMContentLoaded', async function() {
  await fetchData();
  sortTextNodes(true); // update the numbering of the text nodes
});
