import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

function loadView(view) {
    return () =>
        import ( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "Home",
            component: loadView("Home")
        },
        // Our-temple routes
        {
            path: "/our-temple/weekly-schedule",
            name: "Schedule",
            component: loadView("our-temple/Schedule")
        },
        {
            path: "/our-temple/calendar",
            name: "Calendar",
            component: loadView("our-temple/CalendarFull")
        },
        {
            path: "/our-temple/swaminarayan-education",
            name: "Education",
            component: loadView("our-temple/Education")
        },
        {
            // Pages from Prismic
            path: "/our-temple/:uid",
            name: "OurTemple",
            component: loadView("our-temple/OurTemple")
        },
        // Our Sampraday
        {
            path: "/our-sampraday/:tag",
            name: "Articles",
            component: loadView("our-sampraday/Articles")
        },
        {
            path: "/our-sampraday/articles/:uid",
            name: "Article",
            component: loadView("our-sampraday/Article")
        },
        // Media
        {
            path: "/media/daily-darshan",
            name: "DailyDarshan",
            component: loadView("DailyDarshan")
        },
        {
            path: "/media/gallery",
            name: "Gallery",
            component: loadView("PhotoGallery")
        },
        {
            path: "/media/gallery/album/:id",
            name: "Album",
            component: loadView("Album")
        },
        // Blog
        {
            path: "/blog",
            name: "Blog",
            component: loadView("Blog")
        },
        {
            path: "/post/:uid",
            name: "Post",
            component: loadView("Post")
        },
        // Wedding Hall
        {
            path: "/wedding-hall",
            name: "WeddingHall",
            component: loadView("WeddingHall")
        },
        // Donation
        {
            path: "/donate",
            name: "Donation",
            component: loadView("Donation")
        },
        // Contact us
        {
            path: "/contact-us",
            name: "ContactUs",
            component: loadView("ContactUs")
        },
        // Other pages
        {
            path: "/admin",
            beforeEnter(to, from, next) {
                // Put the full page url including the protocol http(s) below
                window.location = "https://sksswoolwich.prismic.io";
            }
        },
        {
            path: "/not-found",
            name: "not-found",
            component: loadView("NotFound")
        },
        {
            path: "*",
            redirect: {
                name: "not-found"
            }
        }
    ]
});