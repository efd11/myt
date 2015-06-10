//Swagger2 API - Decoration

function decorateApi(baucisInstance, options) {
	options = options || {};
	baucisInstance.swagger2Document.info.title = options.title || "api";
	baucisInstance.swagger2Document.info.description = options.description || "Microservice API generated by [AppNow](https://appnow.radarconline.com)";

	if (options.host) {
		baucisInstance.swagger2Document.info.host = options.host;
	}
	if (options.termsOfService){
		baucisInstance.swagger2Document.info.termsOfService = options.termsOfService;
	}
	if (options.contact){
		baucisInstance.swagger2Document.info.contact = options.contact;
	}
	if (options.license){
		baucisInstance.swagger2Document.info.license = options.license;
	}
	if (options.version){
		baucisInstance.swagger2Document.info.version = options.version;
	}
	//extensions
	baucisInstance.swagger2Document.info['x-generated-by'] = 'icinetic-appnow';
	baucisInstance.swagger2Document.info['x-powered-by'] = 'baucis';

	markAdminResources(baucisInstance.swagger2Document.tags);
}

function markAdminResources(tags) {
	if (!tags) {
		return;
	}
	tags.forEach(function(tag) {
		if (tag.name[0] === '_') {
			//it's an admin-resource
			tag['x-admin-resource'] = true;
			tag.description = tag.name +" admin resource.";
		}
	});
}

function addSwagger2Doc(controller, options) {
	//extend your swagger 2.0 here using: 
	//  controller.swagger2.paths.xyz = '123';
	//  controller.swagger2.definitions.xyz = {};

}

function apply(baucisInstance, controllers, options) {
	baucisInstance.generateSwagger2(baucisInstance);

	decorateApi(baucisInstance, options);
    controllers.forEach(function(controller) { 
        addSwagger2Doc(controller, options); 
    });
}

module.exports.apply = apply;