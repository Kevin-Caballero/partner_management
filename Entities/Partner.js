import Person from './Person'

class Partner extends Person{
    constructor(partnerNumber, dni, name, surname, birthDate, locality) {
        super(dni,name,surname, birthDate,locality);
        this._partnerNumber = partnerNumber;
    }

    get partnerNumber() {  return this._partnerNumber; }
    set partnerNumber(value) { this._partnerNumber = value; }
}

export default Partner;