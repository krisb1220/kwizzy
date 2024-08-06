    
  let global = {
    num_elements: 0,
    elements: [],
    saved: true,
    isLoggedIn: false
}


//builder logic

let kitButtons = document.querySelectorAll(".kit-tool");


kitButtons.forEach((item) => {

    item.addEventListener("click", (e) => {
        let inputID = "input-" + global.num_elements;
        let containerID = "input-container" + global.num_elements;


        let inputElement = document.createElement("input");
        inputElement.type = item.dataset.tooltype;
        inputElement.id = inputID;
        inputElement.name = inputID;

        let containerElement = document.createElement("div");
        containerElement.classList.add("inner-input");
        containerElement.id = containerID;

        let labelElement = document.createElement("label");
        labelElement.innerText = `New ${item.dataset.tooltype} Element`.toLocaleUpperCase();
        labelElement.setAttribute("for", inputID); // Associate the label with the input
        labelElement.contentEditable = "true"; // Make the label editable
        labelElement.classList.add("input-label")
        labelElement.classList.add(inputElement.type)

        containerElement.appendChild(labelElement);
        containerElement.appendChild(inputElement);
        global.elements.push(containerElement);
        // containerElement.appendChild(inputElement);

        global.saved = false;
        document.querySelector("#builder").appendChild(containerElement);

    })
})


// SAVE 
document.querySelector("#save-kwizzy").addEventListener("click", (e) => {
    e.preventDefault();
    
    if (!global.saved) {
        const data = document.querySelector("#builder").innerHTML;
        global.saved = true;
        fetch("http://localhost:3000/entries?action=new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postBody: data, title: "A kwizzy made at " + Date.now(), email: global.userData.email })
        })
            .then(response => {
                return response;
            })
            .then(response => response.json())
            .then((body) => {
                console.log("Kwizzy saved!");
            });
    } else {
        alert("Kwizzy already saved!");
    }
});


//     if(!global.isLoggedIn) {
//         // document.querySelector("#result").innerText = body.message;
//         global.isLoggedIn = true;
//         // BUILD KWIZZY SELECTION LIST
//         let kwizzyList = document.createElement("select");



//         kwizzyList.setAttribute("id", "kwizzy-list")
//         global.userData.entries.forEach((entry) => {
//             let entrySelection = document.createElement("option")
//             entrySelection.setAttribute("value", entry._id)
//             entrySelection.innerText = entry.title;
//             kwizzyList.appendChild(entrySelection);
//         });

//         kwizzyList.addEventListener("change", (e) => {
//             console.log(e.target.value);
//             document.querySelector("#builder").innerHTML = global.userData.entries.find(item => item._id == e.target.value).body
//             document.querySelector("#kwizzy-title").innerHTML = global.userData.entries.find(item => item._id == e.target.value).title
//         })

//         document.getElementById("menu").appendChild(kwizzyList);
//     } else {
//         alert("you are already logged in")
//     }
// //     })
// // });


