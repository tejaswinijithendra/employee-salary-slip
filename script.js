(function(){
   const form = document.getElementById("download-form");
    var db = null;
   form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        analyse(object);
   })

   function analyse(input){
    let name = input.name;
    let id = input.employeCode;
    let month = input.month;
    console.log(name, id, month)
    for(let i=0; i < db.length; i++){
        if(db[i].name === name && db[i].id === id && db[i].month === month){
            formHtml(db[i]);
            break;
        }
    }
   }
   window.addEventListener("load", () => {
       loadData()
   });

   function loadData(){
    fetch("./data.json")
    .then(response => {
       return response.json();
    })
    .then(data => {
        console.log('data', data)
        db = data;
    });
   }
   function formHtml(empObj){
       const div = document.createElement("div");
       let html = `
            <div style="max-width: 500px;margin: auto;text-align: center;font-family: Arial, Helvetica, sans-serif;color:"black">
            <h1>The Best Company</h1>
            <p>Bangalore, Karnataka, India</p>
            <br>
            <br>
            <style>
                h1, p {
                    color:black
                }
                table, th, td {
                    border:1px solid black;
                    color:black
                }
            </style>
            <table style="width:100%">
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Month</th>
                    <th>Salary</th>
                </tr>
                <tr>
                    <td>${empObj.name}</td>
                    <td>${empObj.id}</td>
                    <td>${empObj.month}</td>
                    <td>${empObj.salary}</td>
                </tr>
                </table>
                <br><br><br>
                <p>This is a computer generated copy. There is no need for physical signature.</p>
            </div>
       `;
       div.innerHTML = html;
       generatePdf(div)
   }


    function generatePdf(el){
        var worker = html2pdf().from(el).save();
    }
})();