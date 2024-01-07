export default class Student {
    id: number = 0;
    lastname: string = '';
    firstname: string = '';
    company: string = '';
    picture: string = '';
    companyLogo: string = '';

    constructor(id: number, lastname: string, firstname: string, company: string, picture: string, companyLogo: string) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.company = company;
        this.picture = picture;
        this.companyLogo = companyLogo;
    }
}