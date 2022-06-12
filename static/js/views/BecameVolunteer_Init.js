import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Стать волонтером");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/BecameVolunteer_Init.html");
        return pageContent;
    }
}