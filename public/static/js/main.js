import { init } from "./functions/views/init.js";

export function router() {

    const path = location.pathname
    const sectionApp = document.querySelector('.main')
    sectionApp.innerHTML = ''

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    console.log(path)

}