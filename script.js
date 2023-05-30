// validation form inputs before submiting data

function validateForm() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;

    if (name.trim() === "" || age.trim() === "" || address.trim() === "" || email.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}



function showData() {
    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    let html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button>';
        html += '<button onclick="updateData(' + index + ')" class="btn btn-warning">Update</button></td>';
        html += "</tr>";
    });

    document.querySelector('#crudTable tbody').innerHTML = html;
}

// Load all data when the document or page is loaded
window.onload = showData;

function deleteData(index) {
    let peopleList = JSON.parse(localStorage.getItem('peopleList'));
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

   

const AddData = () => {
    if (validateForm() == true) {
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let address = document.getElementById('address').value;
        let email = document.getElementById('email').value;

        let peopleList;
        if (localStorage.getItem('peopleList') == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById('name').value = "";
        document.getElementById('age').value = "";
        document.getElementById('address').value = "";
        document.getElementById('email').value = "";
    }
}


    function updateData(index) {
        document.getElementById('Submit').style.display = "none";
        document.getElementById('Update').style.display = "block";

        let peopleList;
        if (localStorage.getItem('peopleList') == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }
        document.getElementById('name').value = peopleList[index].name;
        document.getElementById('age').value = peopleList[index].age;
        document.getElementById('address').value = peopleList[index].address;
        document.getElementById('email').value = peopleList[index].email;

        document.getElementById('Update').onclick = function () {
            if (validateForm() == true) {
                peopleList[index].name = document.getElementById('name').value;
                peopleList[index].age = document.getElementById('age').value;
                peopleList[index].address = document.getElementById('address').value;
                peopleList[index].email = document.getElementById('email').value;

                localStorage.setItem('peopleList', JSON.stringify(peopleList));

                showData();

                document.getElementById('name').value = "";
                document.getElementById('age').value = "";
                document.getElementById('address').value = "";
                document.getElementById('email').value = "";

                // Update button will hide and Submit button will show
                // for updating in localStorage
                document.getElementById('Submit').style.display = "block";
                document.getElementById('Update').style.display = "none";
            }
        }
    }



