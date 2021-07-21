export class Post {
    private id = '';

    private name: string = '';

    public saveName(name: string): void {
        this.name = name;
    }

    public saveId(id: string): void {
        this.id = id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getId(): string {
        return this.id;
    }
}
