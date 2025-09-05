const creatElements = (arr) => {
  //   console.log(arr);
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  console.log(htmlElements.join(" "));
};

const synonyms = ["hello", "ho", "konnichiwa"];
creatElements(synonyms);
