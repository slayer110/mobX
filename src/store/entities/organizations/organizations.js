export class Organizations {
    list = [];
    isLoading = true;
    isError = false;

    saveOrganizations(json) {
        const {title: organizationsList} = json;
        this.list = organizationsList
    }
}
