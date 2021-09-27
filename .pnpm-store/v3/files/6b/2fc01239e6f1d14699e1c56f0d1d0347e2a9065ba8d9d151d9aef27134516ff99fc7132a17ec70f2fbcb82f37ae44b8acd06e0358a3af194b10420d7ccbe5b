function dynamicImportLoader() {
    let importESM;

    try {
        importESM = new Function("id", "return import(id);");
    } catch (e) {
        importESM = null;
    }

    return importESM;
}

module.exports = dynamicImportLoader;
