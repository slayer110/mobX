export class Organization {
    list = [];
    isLoading = false;
    error = false;

    constructor(json) {
        const {id, title: organizationsList} = json;
        this.id = id;
        this.organizationsList = organizationsList
    }
}
