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

export default Person;