const api_server = "http://192.168.1.38:3000";

var SubjectsEncoding = {
    temporary_work: "Временная работа",
    permament_work: "Постоянная работа",
    remote_work: "Удаленная работа",
    internship: "Стажировка"
};

function unificatorModule_getReadableNameOfSubject(encoded){
    let EXIST_Value = SubjectsEncoding[encoded];
    if(EXIST_Value != undefined){
        return EXIST_Value;
    }else{
        return encoded;
    }
}