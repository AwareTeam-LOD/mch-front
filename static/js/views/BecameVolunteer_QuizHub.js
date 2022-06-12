import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Тестирование");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/BecameVolunteer_QuizHub.html");
        return pageContent;
    }
}