import AbstractView from "./AbstractView.js";
import { readTextFile } from "../utils.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Рейтинг");
    }

    async getHtml() {
        //return readTextFile();
        var pageContent = readTextFile("./components/BonusesRating.html");
        return pageContent;
    }
}