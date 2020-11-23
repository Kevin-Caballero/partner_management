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

const p1 = new Partner(1,'11111111G','nombre1', 'apellido1', '10/07/1994','Donostia');
const p2 = new Partner(2,'22222222G','nombre2', 'apellido2', '10/07/1994','Errenteria');
const p3 = new Partner(3,'33333333G','nombre3', 'apellido3', '10/07/1994','Bilbo');
const p4 = new Partner(4,'44444444G','nombre4', 'apellido4', '10/07/1994','Orio');
const p5 = new Partner(5,'55555555G','nombre5', 'apellido5', '10/07/1994','Aia');

let partners= [p1,p2,p3,p4,p5]

console.log(partners);

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
                    <button class="btn btn-warning mr-2"><i class="fa fa-edit text-white"></i></button>
                    <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </td>
            </tr>`
}

function showAddForm(){
    let addFormStyle = document.getElementById("addForm").style;
    if(addFormStyle.visibility.toLowerCase() == 'hidden'){
        addFormStyle.visibility='visible';
    }else if(addFormStyle.visibility.toLowerCase() == 'visible'){
        addFormStyle.visibility='hidden';
    }
}