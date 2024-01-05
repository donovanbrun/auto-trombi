export default class Student {
    id: number = 0;
    name: string = '';
    surname: string = '';
    company: string = '';
    img: string = '';

    constructor(id: number, name: string, surname: string, company: string, img: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.company = company;
        this.img = img;
    }
}