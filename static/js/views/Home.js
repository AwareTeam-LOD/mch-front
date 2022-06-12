import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Привет!");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/Home.html");
        return pageContent;
    }
}