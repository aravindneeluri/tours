// const fs = require("fs");
// const superagent = require("superagent")

// const readFilePro = () => {
//     return new Promise ((resolve, reject) =>{
//         fs.readFile(`${__dirname}/dog.txt`, 'utf-8' ,(err, data) => {
//             if (err) reject('Unacceptable')
//             resolve(data)     
//     })
// })
// }
// readFilePro().then(data => {console.log(data)})
// .catch(err => { console.log(err);})



// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//         .get(`https://images.dog.ceo/breeds/${data}/n02099712_7411.jpg`)
//         .end((err, res) => {
//             if(err){console.log({err})}
//             else{
//             console.log(res.body);
//             }
//         });
// })  
const arvind1 = {
    weight :91,
    biceps : 13
}
const arvind2 = {
    height :175,
    weight : 90
}
const arvind = {...arvind2,...arvind1}
console.log(arvind)
