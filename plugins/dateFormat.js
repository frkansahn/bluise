import Vue from 'vue'

Vue.filter('dateFormat', function (value) {
    if (!value) return ''

    return new Date(value).toLocaleDateString();
})

Vue.filter('dateTimeFormat', function (value) {
    if (!value) return ''

    return new Date(value).toLocaleString();
})