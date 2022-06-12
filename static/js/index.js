import Home from "./views/Home.js";
import SetupProfile from "./views/SetupProfile.js";
import BeneficialHome from "./views/BeneficialHome.js";
import BeneficialNewRequest from "./views/BeneficialNewRequest.js";
import BeneficialViewRequest from "./views/BeneficialViewRequest.js";
import BecameVolunteer_Init from "./views/BecameVolunteer_Init.js";
import BecameVolunteer_QuizHub from "./views/BecameVolunteer_QuizHub.js";
import VolunteerHome from "./views/VolunteerHome.js";
import VolunteerViewRequest from "./views/VolunteerViewRequest.js";
import BonusesForActivity from "./views/BonusesForActivity.js";
import BonusesRating from "./views/BonusesRating.js";

console.log("This is main module. If you see this message, this module has been loaded successfully. \nPlease, do not paste anything into console input, it may be dangerous for your data, - this tool used only by developers. Have a good day! :)")
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {
    const routes = [
        { path: "/", view: SetupProfile },
        { path: "/beneficial", view: BeneficialHome },
        { path: "/beneficialNewRequest", view: BeneficialNewRequest },
        { path: "/beneficialViewRequest", view: BeneficialViewRequest },
        { path: "/setup-profile", view: SetupProfile },
        { path: "/became-volunteer-init", view: BecameVolunteer_Init },
        { path: "/became-volunteer-quizhub", view: BecameVolunteer_QuizHub },
        { path: "/volunteer", view: VolunteerHome },
        { path: "/volunteerViewRequest", view: VolunteerViewRequest },
        { path: "/bonusesForActivity", view: BonusesForActivity },
        { path: "/bonusesRating", view: BonusesRating },
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    await view.getHtml().then((value) => $("#page-content").html(value));
};

function error_handler(level = "warn", message, redir = "no"){
    console.warn("ERROR (level " + level + "): " + message)
    if(redir == "reload"){
        window.location.href = "index.html";
    }
}

window.addEventListener("popstate", router);

function service_auth(){
    return new Promise(resolve => {
        if(localStorage.getItem("access_id") != null && localStorage.getItem("access_token") != null){
            $.get(api_server + '/access/hello', {user_id: localStorage.getItem("access_id"), token: localStorage.getItem("access_token")}, function(data){
                if(data.status == "okay"){
                    //okay
                    localStorage.setItem('tempdata_shortAboutUser', JSON.stringify(data.data));
                    resolve('okay');
                }else{
                    if(location.hash == "#demo"){
                        run_auth();
                    }else{
                        window.location.href = "./auth.html";
                    }
                    
                    //run_auth();
                }
            
            })
            resolve('okay');
        } else {
            if(location.hash == "#demo"){
                run_auth();
            }else{
                window.location.href = "./auth.html";
            }
            //run_auth();
            resolve('okay');
        }
        
        function run_auth(){
            $.get(api_server + '/service/auth_sign', {app_url: 'https://test.deqstudio.com/landmarks/web/iframe.html?vk_access_token_settings=&vk_app_id=8034418&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1647851294&vk_user_id=253918170&sign=5uzIJdHEFKcQQLp5VG9LIbaAyH5YmkiBQFkj823BMhc'}, function(data){
                if(data.status == "okay"){
                    localStorage.setItem('access_id', data.userid);
                    localStorage.setItem('access_token', data.token);
                    window.location.href = "index.html";
                }else{
                    error_handler("danger", "Не могу войти, но это обязательно :(", "reload")
                }
                resolve('okay');
            
            });
        }
      });
}

document.addEventListener("DOMContentLoaded", async function (){
    await service_auth();
    document.body.addEventListener("click", e => {
        if (e.target.closest('a[data-link]')) {
            e.preventDefault();
            const link = e.target.closest('a[data-link]');
            if (link) {
                navigateTo(link.href);
            }
        }
    });

    router();
});

window.addEventListener("message", function(event) {
    if (event.data.type == "call_indexjs") {
        if (event.source.location.origin == event.origin) {
            if (event.data.action == "navigateto") {
                console.info("Received message sent by the same domain script [type == 'call_indexjs'].\nRequest completed, redirected to URL: " + event.data.url)
                navigateTo(event.data.url);
            }
        } else {
            console.error("Can't process event I've got, because my politics allow messages only from same domain I work on.")
        }
    }
}, false);