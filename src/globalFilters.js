import Vue from 'vue';


Vue.filter('capitalize', function(value) {
    if (!value) return '';
    return value.toLowerCase().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});

Vue.filter('globalFixed', function(value) {
    if (!value || value === 0) return 0;
    return Number(value).toFixed(2);
});