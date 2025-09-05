const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // response promise
    .then((res) => res.json()) // promise json
    .then((json) => displayLesson(json.data));
};

// Reuse -Synonyms -function
const creatElements = (arr) => {
  //   console.log(arr);
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

// Voice system section
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Spinner Function starts from here
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// function active
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

// loadLevelword
const loadLevelWord = (id) => {
  //   console.log(id);
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      //   console.log(clickedBtn);
      removeActive(); //remove all active class
      clickedBtn.classList.add("active"); //add active only
      displayLevelWord(data.data);
    });
};

// Display LevelWord
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  //...........................
  if (words.length == 0) {
    // alert("No word Detected");
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
         <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${
              word.word ? word.word : "word is not avaiilable"
            }</h2>
            <p class="font-semi-bold ">Meaning / pronunciation</p>
            <div class="text-2xl font-medium font-bangla">"${
              word.meaning ? word.meaning : "Meaning is not Available "
            } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation is not available"
    }"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${
                  word.id
                })" class="btn mt-3 bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i
                        class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${
                  word.word
                }')" class="btn mt-3 bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i
                        class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    
    `;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
};

// Display lessons
const displayLesson = (lessons) => {
  // 1.get the container and make it  empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2.get into every lessons
  for (let lesson of lessons) {
    console.log(lesson);
    // 3.Create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
       <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"><i class="fa-brands fa-leanpub"></i>Lesson ${lesson.level_no}</button>

      `;
    // 4.Append into container
    levelContainer.appendChild(btnDiv);
  }
};

//loadWordDetail
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  //   console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// Display wordDetails
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="">
                    <h2 class="text-2xl font-bold">${
                      word.word
                    } (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })</h2>
                </div>
                <div class="">
                    <h2 class=" font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Synonyms</h2>
                 <div class ="mt-5">${creatElements(word.synonyms)}</div>
      
                </div>
  `;

  document.getElementById("word_modal").showModal();
};

//Button search section
document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevelWord(filterWords);
    });
});

loadLessons();
// for needed objects info
// {
//     "id": 79,
//     "level": 1,
//     "word": "Jump",
//     "meaning": "লাফানো",
//     "pronunciation": "জাম্প"
// }

// ................................
// {
//     "word": "Diligent",
//     "meaning": "পরিশ্রমী",
//     "pronunciation": "ডিলিজেন্ট",
//     "level": 5,
//     "sentence": "He is a diligent student who studies every day.",
//     "points": 5,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "hardworking",
//         "industrious",
//         "persistent"
//     ],
//     "id": 4
// }
