//!CLASSES______________________________________________________________________________________________________________
class Person {
    constructor(dni, name, surname, birthDate, locality) {
        this._dni = dni;
        this._name = name;
        this._surname = surname;
        this._birthDate = birthDate;
        this._locality = locality;
    }

    get dni() { return this._dni; }
    set dni(value) { this._dni = value; }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get surname() { return this._surname; }
    set surname(value) { this._surname = value; }

    get birthDate() { return this._birthDate; }
    set birthDate(value) { this._birthDate = value; }

    get locality() { return this._locality; }
    set locality(value) { this._locality = value; }
}

class Partner extends Person{
    constructor(partnerNumber, dni, name, surname, birthDate, locality) {
        super(dni,name,surname, birthDate,locality);
        this._partnerNumber = partnerNumber;
    }

    get partnerNumber() {  return this._partnerNumber; }
    set partnerNumber(value) { this._partnerNumber = value; }
}

//!FUNCTIONS____________________________________________________________________________________________________________
function loadList(){
    document.getElementById('content').innerHTML = '';
    for(let partner of partners){
        document.getElementById('content').innerHTML += `
            <tr>
                <td>${partner.partnerNumber}</td>
                <td>${partner.dni}</td>
                <td>${partner.name}</td>
                <td>${partner.surname}</td>
                <td>${partner.birthDate}</td>
                <td>${partner.locality}</td>
                <td class="d-flex justify-content-center">
                    <button class="btn btn-warning mr-2" onclick="changeModifyFormVisibility(this.parentNode)"><i class="fa fa-edit text-white"></i></button>
                    <button class="btn btn-danger" onclick="deletePartner(this.parentNode)"><i class="fa fa-trash"></i></button>
                </td>
            </tr>`
    }
}

function changeAddFormVisibility(){
    let addFormStyle = document.getElementById("addForm").style;
    let header = document.getElementById("cardHeader");
    if(addFormStyle.visibility.toLowerCase() == 'hidden' || header.classList.contains('bg-warning')){
        addFormStyle.visibility='visible';
        header.classList.remove('bg-warning');
        header.classList.add('bg-primary');
        header.firstChild.textContent = "Nuevo socio"
        document.getElementById('formButton').textContent = "Añadir"
        document.getElementById('formButton').onclick = function () { addPartner()}
        document.getElementById('partNum').disabled = false;
        document.getElementById('addPartnerForm').reset();
    }else if(addFormStyle.visibility.toLowerCase() == 'visible'){
        addFormStyle.visibility='hidden';
    }
}

function getNextId() {
    let partnerNumber = document.getElementById('partNum').value;
    let partnerNumberAsInteger = parseInt(document.getElementById('partNum').value);

    if(typeof(partnerNumberAsInteger) == "number"){
        if(exists(partnerNumberAsInteger) || partnerNumber == ''){
            return getMaxId();
        }else{
            return partnerNumber;
        }
    }
}

function exists(partnerNumber) {
    for(let partner of partners){
        if(partner.partnerNumber == partnerNumber){
            return true;
        }
    }
    return false;
}

function getMaxId(){
    let max = 0;
    partners.forEach(p => {
        if (p.partnerNumber > max) {
            max = p.partnerNumber;
        }
    });
    return parseInt(max)+1;
}

function convertDateFormat(dateString) {
    if(dateString.split('-').length > 1){
        let date = dateString.split('-').reverse().join('/');
        return date;
    }else{
        let date = dateString.split('/').reverse().join('-');
        return date;
    }

}

function addPartner(){
    let partnerNumber = getNextId();
    let dni = document.getElementById('dni').value;
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let birthDate = convertDateFormat(document.getElementById('date').value);
    let locality = document.getElementById('loc').value;

    if(name == '' || surname == ''){
        document.getElementById('name').style.borderColor = 'red';
        document.getElementById('nameErrorMsg').style.visibility = 'visible';
        document.getElementById('surname').style.borderColor = 'red';
        document.getElementById('surnameErrorMsg').style.visibility = 'visible';
    }else{
        let addedPartner = new Partner(partnerNumber,dni,name,surname,birthDate,locality);
        partners.push(addedPartner);
        loadList();
        document.getElementById('name').style.borderColor = '';
        document.getElementById('nameErrorMsg').style.visibility = 'hidden';
        document.getElementById('surname').style.borderColor = '';
        document.getElementById('surnameErrorMsg').style.visibility = 'hidden';
        document.getElementById('addPartnerForm').reset();
        console.log(partners)
    }
}

function deletePartner(parent){
    let row = parent.parentNode;
    let partnerNumber = row.firstChild.nextSibling.textContent;
    for (let partner of partners){
        if(partner.partnerNumber == partnerNumber){
            partners.pop(partner);
            console.log(partners)
        }
    }
    loadList();
}

function modifyPartner(){
    let partnerNumber = document.getElementById('partNum').value;
    let dni = document.getElementById('dni').value;
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let birthDate = convertDateFormat(document.getElementById('date').value);
    let locality = document.getElementById('loc').value;
    let header = document.getElementById("cardHeader");
    let selectedPartner;
    for (let partner of partners){
        if(partner.partnerNumber == partnerNumber){
            selectedPartner = partner;
        }
    }
    if(name == '' || surname == ''){
        document.getElementById('name').style.borderColor = 'red';
        document.getElementById('nameErrorMsg').style.visibility = 'visible';
        document.getElementById('surname').style.borderColor = 'red';
        document.getElementById('surnameErrorMsg').style.visibility = 'visible';
    }else{
        selectedPartner.dni = dni;
        selectedPartner.name = name;
        selectedPartner.surname = surname;
        selectedPartner.birthDate = birthDate;
        selectedPartner.locality = locality;
        loadList();
        document.getElementById('name').style.borderColor = '';
        document.getElementById('nameErrorMsg').style.visibility = 'hidden';
        document.getElementById('surname').style.borderColor = '';
        document.getElementById('surnameErrorMsg').style.visibility = 'hidden';
        header.classList.remove('bg-warning');
        header.classList.add('bg-primary');
        header.firstChild.textContent = "Nuevo socio"
        document.getElementById('formButton').textContent = "Añadir"
        document.getElementById('formButton').onclick = function () { addPartner()}
        document.getElementById('partNum').disabled = false;
        document.getElementById('addPartnerForm').reset();
        document.getElementById('addForm').style.visibility = "hidden";
        console.log(partners)
    }
}

function changeModifyFormVisibility(parent){
    let header = document.getElementById("cardHeader");
    let row = parent.parentNode;
    let partnerNumber = row.firstChild.nextSibling.textContent;
    let selectedPartner;
    for (let partner of partners){
        if(partner.partnerNumber == partnerNumber){
            selectedPartner = partner;
        }
    }
    document.getElementById('addForm').style.visibility="visible";
    header.classList.remove('bg-primary');
    header.classList.add('bg-warning');
    header.firstChild.textContent = "Modificar socio"
    document.getElementById('formButton').textContent = "Modificar"
    document.getElementById('formButton').onclick = function () { modifyPartner()}
    document.getElementById('partNum').disabled = true;
    loadPartnerData(selectedPartner)
}

function loadPartnerData(selectedPartner){
    document.getElementById('partNum').value = selectedPartner.partnerNumber
    document.getElementById('dni').value = selectedPartner.dni
    document.getElementById('name').value = selectedPartner.name
    document.getElementById('surname').value = selectedPartner.surname
    document.getElementById('date').value = convertDateFormat(selectedPartner.birthDate)
    document.getElementById('loc').value = selectedPartner.locality
}

//!SCRIPT_______________________________________________________________________________________________________________
const p1 = new Partner(1,'11111111G','nombre1', 'apellido1', '11/07/1994','Donostia');
const p2 = new Partner(2,'22222222G','nombre2', 'apellido2', '12/07/1994','Errenteria');
const p3 = new Partner(3,'33333333G','nombre3', 'apellido3', '13/07/1994','Bilbo');
const p4 = new Partner(4,'44444444G','nombre4', 'apellido4', '14/07/1994','Orio');
const p5 = new Partner(5,'55555555G','nombre5', 'apellido5', '15/07/1994','Aia');

var partners= [p1,p2,p3,p4,p5]
console.log(partners);

window.onload=loadList();