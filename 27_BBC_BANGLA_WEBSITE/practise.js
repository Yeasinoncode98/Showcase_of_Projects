/**
 * 1.api-fetch()
 * 2.forEach
 * 3.map
 * 4.join()
 * 5.filter()
 * 6.find()
 *
 *
 */

// traditional for loop
// for(let i = 0;i < data.length ; i++){
// data[i]}

// for of
/**
 * for( let datas of data){
 * console.log(data)}
 */

// forEach loop(no return  value(undefined))

//  data.forEach(d =>{
// console.log(d)})

//.......................................

// Map
/**
 * data.map(data =>{
 * return data.title})
 */

// const titleArr = data.map(data=>{
// return data.title})
// console.log(titleArr)

// .........................................

// Join
// const arr = ["hello", "hii", "abcde"];
// // arr.join("");
// console.log(arr.join("-"));

// .........................................

// push -> array er sheshe element add kore dei

// push -- adds in the last part of an Array

// filter
// const arr = [1, 2, 3, 3, 3, 4, 56, 7, 88, 6];

// const filtered = arr.filter((num) => num !== 3);
// //filter creates a new array
// console.log(filtered);

// //
// const filteredData = data.filter((data) => data.id !== "c3r4r51n9lno");

// console.log(filteredData);

data.find((data) => data.id === "c3r4r51n9lno");
// just return one element from the array which is the first one
//value na pawa gele undefined ashbe
// if()