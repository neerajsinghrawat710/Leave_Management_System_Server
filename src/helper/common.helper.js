exports.mandatoryField = (object, fields) => {
    var fields_na = [];
    fields.forEach(function (field) {
        if (!object.hasOwnProperty(field) || (object[field] == null || object[field] == '')) {
            fields_na.push(field);
        }
    });
    return fields_na;
}

