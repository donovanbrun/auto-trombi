export default class Student {
    id: number = 0;
    name: string = '';
    surname: string = '';
    company: string = '';
    img: string = '';
    companyLogo: string = '';

    constructor(id: number, name: string, surname: string, company: string, img: string, companyLogo: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.company = company;
        this.img = img;
        this.companyLogo = companyLogo;
    }
}