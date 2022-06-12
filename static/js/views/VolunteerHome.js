import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Пункт волонтера");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/VolunteerHome.html");
        return pageContent;
    }
}