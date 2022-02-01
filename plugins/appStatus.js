import Vue from 'vue'

export default () => {
    Vue.filter('appStatus', function (value) {
        if (!value) return ''

        var status = "";
        switch(value)
        {
            case '1':
                status = "Başvuru Yapıldı.";
                break;
            case '2':
                status = "Başvuru onaylandı.";
                break;
            case '3':
                status = "Başvuru değerlendiriliyor.";
                break;
            case '4':
                status = "Teklif iletildi.";
                break;
        }
        return status
    })
}