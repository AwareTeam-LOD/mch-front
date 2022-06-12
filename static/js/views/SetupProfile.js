import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Привет!");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/SetupProfile.html");
        return pageContent;
    }
}