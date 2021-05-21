export class Question {
    id = null;
    text = '';
    isLoading = false;
    error = false;

    constructor(json) {
        const {id, title: text} = json;
        this.id = id;
        this.text = text
    }
}
