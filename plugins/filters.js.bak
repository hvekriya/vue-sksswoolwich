import Vue from 'vue'
import moment from 'moment'


Vue.filter("formatDate", function(value) {
    if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
    }
});

Vue.filter("readMore", function(text, length, suffix) {
    let newText = text
        .map(a => a.text)
        .filter(b => b)
        .join(" ");
    return newText.substring(0, length) + suffix;
});

Vue.filter("moment", function(date) {
    return moment(date).format("Do MMMM YYYY");
})

Vue.filter("truncate", function(value) {

    var newText = ""

    if (value.length > 50) {
        newText = value.substring(0, 200) + " ...";
    } else {
        console.log(value)
        return value;
    }
    return newText;
});

Vue.filter("replace", function(currentText, text, newText) {
    return currentText.replace(text, newText);
});

Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);