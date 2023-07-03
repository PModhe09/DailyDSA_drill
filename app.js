// Problem class : represents a particular problem
let i =1;
// let problems;
class Problem{
    constructor(no,platform,problem,link,prio){
         this.no=no;
         this.platform=platform;
         this.problem=problem;
         this.link=link;
         this.prio=prio;
    }
}
// UI class : handles ui tasks
class ui{
    static displayProblems(){
        const ProblemList=Store.getProblem();
        const ProblemLists=ProblemList

        ProblemLists.forEach((curr)=>ui.addToLists(curr));


    }

    static addToLists(Ques){
            const list=document.querySelector('#problem-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td style="color: white;">${Ques.no}</td>
        <td style="color: white;">${Ques.platform}</td>
        <td ><a href='${Ques.link}'>${Ques.problem}</a></td>
        <td style="color: white;">${Ques.prio}</td>
        <td style="color: white;"><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
        `;
        
        list.appendChild(row);
    }

    static clearFields(){
        // document.querySelector('#platform').value='';
        document.querySelector('#link').value='';
        document.querySelector('#prio').value='';
        document.querySelector('#problem').value='';
    }

    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#form')
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),3000)
    }

    static delete(ele){
        if(ele.classList.contains('delete')){
            ele.parentElement.parentElement.remove();
        }
    }
     
}
// Store class : handles local Storage
class Store{
     static getProblem(){
        let problems;
        if(localStorage.getItem('problems')===null){
            problems=[];
        }
        else{
            problems=JSON.parse(localStorage.getItem('problems'));
        }
       // console.log(problems);
        return problems;
     }

     static addProblem(problem){
        const problems=Store.getProblem();
        problems.push(problem);
        localStorage.setItem('problems',JSON.stringify(problems));
     }
     static removeProblem(no){
        const problems=Store.getProblem();
        problems.forEach((problem,ind)=>{
            if(problem.no === no){
                problems.splice(ind,1);
            }
        })
        localStorage.setItem('problems',JSON.stringify(problems));
     }
}
// Event 1 : Display Problems
document.addEventListener('DOMContentLoaded',ui.displayProblems)
// Event 2 : Add Problem to list of Problems

document.querySelector('#form').addEventListener('submit',(e)=>{
    //prevent actual default
    e.preventDefault();
    //Get values
    // const no=parseInt(document.querySelector('#no').value,10);
    const no=i++;


    const link=document.querySelector('#link').value;
    function getPlatform(){
        let tmp=link;
        if(tmp.search("codeforces")!=-1){
            return "codeforces"
        }
        else if(tmp.search("leetcode")!=-1){
            return "leetcode"
        }
        else if(tmp.search("codechef")!=-1){
            return "codechef"
        }
    }
    const platform=getPlatform()
    const prio=document.querySelector('#prio').value;
    const problem_n=document.querySelector('#problem').value;
  
    
    if(no==='' || platform==='' || link==='' || problem_n==='' || prio===''){
        ui.showAlert('Some inputs are empty','danger')
    }
    else{
        // Instantiate Problem
        const problemObj=new Problem(no,platform,problem_n,link,prio);
        // console.log(problemObj);
        // Add to List
        ui.addToLists(problemObj);
        ui.showAlert('Problem Added','success')
        ui.clearFields();
        Store.addProblem(problemObj);
        
    }
})

// Event 3 : Remove Problem from list of Problems
document.querySelector('#problem-list').addEventListener('click',(e)=>{
      ui.delete(e.target);
     // ui.showAlert('Problem Solved','success')
     Store.removeProblem(e.target.parentElement.previousElementSibling.textContent);
      ui.showAlert('Problem Solved','success')
});

let constestList;
function openNav() {
    document.getElementById("mySidenav").style.width = "100vw";
    // Fetch the data from the API
fetch("https://kontests.net/api/v1/codeforces")
.then((response) => response.json())
.then((data) => {
  // Create the table header
  const tableHeader = "<tr><th>Name</th><th>Start Time</th><th>Duration</th></tr>";

  // Create the table body
  let tableBody = "";
  data.forEach((contest) => {
    const name = contest.name;
    const url = contest.url;
    const startTime = contest.start_time || "-";
    const duration = contest.duration || "-";
    const status = contest.status;
    console.log(typeof(startTime))
    const tableRow = `<tr><td style="font-size:2px;"><a href=${url}>${name}</a></td><td>${startTime}</td><td>${duration}</td></tr>`;
    tableBody += tableRow;
  });

  // Create the complete table
  const table = `<table>${tableHeader}${tableBody}</table>`;

  // Append the table to an element in the HTML document
  document.getElementById("table-container-cf").innerHTML = table;
})
.catch((error) => {
  console.error("Error:", error);
});


fetch("https://kontests.net/api/v1/leet_code")
.then((response) => response.json())
.then((data) => {
  // Create the table header
  const tableHeader = "<tr><th>Name</th><th>Start Time</th><th>Duration</th></tr>";

  // Create the table body
  let tableBody = "";
  data.forEach((contest) => {
    const name = contest.name;
    const url = contest.url;
    const startTime = contest.start_time || "-";
    const duration = contest.duration || "-";
    const status = contest.status;
    console.log(typeof(startTime))
    const tableRow = `<tr><td style="font-size:2px;"><a href=${url}>${name}</a></td><td>${startTime}</td><td>${duration}</td></tr>`;
    tableBody += tableRow;
  });

  // Create the complete table
  const table = `<table>${tableHeader}${tableBody}</table>`;

  // Append the table to an element in the HTML document
  document.getElementById("table-container-lc").innerHTML = table;
})
.catch((error) => {
  console.error("Error:", error);
});

fetch("https://kontests.net/api/v1/code_chef")
.then((response) => response.json())
.then((data) => {
  // Create the table header
  const tableHeader = "<tr><th>Name</th><th>Start Time</th><th>Duration</th></tr>";

  // Create the table body
  let tableBody = "";
  data.forEach((contest) => {
    const name = contest.name;
    const url = contest.url;
    const startTime = contest.start_time || "-";
    const duration = contest.duration || "-";
    const status = contest.status;
    console.log(typeof(startTime))
    document.getElementById("tr").style.color = "blue";
    const tableRow = `<tr style="border: 4px; border-color: #4cd137;><td><a href=${url}>${name}</a></td><td>${startTime}</td><td>${duration}</td></tr>`;
    
    tableBody += tableRow;
  });

  // Create the complete table
  const table = `<table>${tableHeader}${tableBody}</table>`;

  // Append the table to an element in the HTML document
  document.getElementById("table-container-cc").innerHTML = table;
})
.catch((error) => {
  console.error("Error:", error);
});

  

  }

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

let dark=false;
function darkMode(){
   if(dark==false){
    document.body.style.backgroundColor="#706fd3";
    dark=true;
   }
   else{
    document.body.style.backgroundColor="#2c2c54";
    dark=false
   }
}

// function openBot(){
//     console.log('bot')
//     document.getElementById("bot").style.width = "100vw";
// }
