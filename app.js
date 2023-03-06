// Problem class : represents a particular problem
let i =1;
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
        const ProblemList=[
         
            
        ];
        const ProblemLists=ProblemList

        ProblemLists.forEach((curr)=>ui.addToLists(curr));


    }

    static addToLists(Ques){
            const list=document.querySelector('#problem-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${Ques.no}</td>
        <td>${Ques.platform}</td>
        <td><a href='${Ques.link}'>${Ques.problem}</a></td>
        <td>${Ques.prio}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete"></a></td>
        `;
        
        list.appendChild(row);
    }

    // static showAlert(message,className){
    //     const div=document.createElement('div');
    //     div.className=`alert alert-${className}`;
    //     div.appendChild(document.createTextNode(message));
    //     const container=document.querySelector('.container');
    //     const form=document.querySelector('#form')
    //     container.insertBefore(div,form);
    //     setTimeout(()=>document.querySelector('.alert').remove(),3000)
    // }

    static delete(ele){
        if(ele.classList.contains('delete')){
            ele.parentElement.parentElement.remove();
        }
    }
     
}
// Store class : handles local Storage
// class store{

// }
// Event 1 : Display Problems
document.addEventListener('DOMContentLoaded',ui.displayProblems)
// Event 2 : Add Problem to list of Problems

document.querySelector('#form').addEventListener('submit',(e)=>{
    //prevent actual default
    e.preventDefault();
    //Get values
    // const no=parseInt(document.querySelector('#no').value,10);
    const no=i++;

    const platform=document.querySelector('#platform').value;
    const link=document.querySelector('#link').value;
    const prio=document.querySelector('#prio').value;
    const problem_n=document.querySelector('#problem').value;
  
    
    if(no==='' || platform==='' || link==='' || problem_n===''){
        ui.showAlert('Some inputs are empty','danger')
    }
    else{
        const problemObj=new Problem(no,platform,problem_n,link,prio);
        console.log(problemObj);
        ui.addToLists(problemObj);
    }
})

// Event 3 : Remove Problem from list of Problems
document.querySelector('#problem-list').addEventListener('click',(e)=>{
      ui.delete(e.target);
      ui.showAlert('Problem Solved','success')
});