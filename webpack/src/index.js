let str = require('./a.js')
const axios = require('axios');
const Qs = require('qs');
// axios.defaults.timeout = 6000;
axios.defaults.baseURL = 'https://ec.51macc.com';
/*单个请求 */
// axios.post('/MattrioEcModel/SelectLongCarIntface/getManufacture',Qs.stringify({brand_id:'luosheng'}))
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
/*发送多个请求 */
    // function getCar(){
    //     return axios.post('/MattrioEcModel/SelectLongCarIntface/getManufacture',Qs.stringify({brand_id:'luosheng'}))
    // }
    // function getNum(){
    //     return axios.post('https://www.51macc.com/api/Mattrio/InterfaceList/getUserFrequency',Qs.stringify({userid:'3be25489-9886-4e36-bd75-f49ce3adb61f'}))
    // }
    // axios.all([getCar(),getNum()]).then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    /*上传文件 */
    document.getElementById('btn').onclick=()=>{
        var formData = new FormData();
        formData.append("file",document.getElementById("fil").files[0]);
        axios.post('https://www.51macc.com/api/Mattrio/OcrInterface/OcrVin',formData)
         .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }