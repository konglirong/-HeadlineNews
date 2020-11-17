import '../scss/index.scss'
// import './imports;'

// console.log('index')

var city = window.prompt('请输入您所在的城市')

switch (city) {
    case '北京':
        // console.log(20000);
        var aaa = window.prompt('哈哈哈')
        document.write(city + aaa)
        break;
    case '上海':
        var aaa = window.prompt('哈哈哈')
        document.write(city + aaa)
        break
    case '杭州':
        var aaa = window.prompt('哈哈哈')
        document.write(city + aaa)
        break
    default:
        break;
}