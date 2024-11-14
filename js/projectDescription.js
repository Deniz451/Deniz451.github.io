import { projectsGamedev, projectsOther, projectGamedevArticles, projectOtherArticles} from './domElements.js';

export function switchGamedevProjectDescription(element){
    projectsGamedev.forEach(project => {
        project.style.color = "white";
    });
    projectGamedevArticles.forEach(article => {
        article.style.opacity = 0;
    });
    let projectGamedevArticlesID = element.dataset.target;
    
    element.style.color = "rgb(148, 148, 148)";
    document.getElementById(projectGamedevArticlesID).style.opacity = 1;
}

export function switchOtherProjectDescription(element){
    projectsOther.forEach(project => {
        project.style.color = "white";
    });
    projectOtherArticles.forEach(article => {
        article.style.opacity = 0;
    });
    let projectOtherArticlesID = element.dataset.target;
    
    element.style.color = "rgb(148, 148, 148)";
    document.getElementById(projectOtherArticlesID).style.opacity = 1;
}