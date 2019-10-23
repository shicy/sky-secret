/**
 * Created by shicy 2019-10-23
 */

const Path = require("path");

global.__basedir = Path.resolve(__dirname, "./");
global.__vrender = "v-render";
global.__vrender_ui = "v-render-ui";


const Application = require("./framework/Application");

Application.startup({
	cwd: __dirname,
	mode: "development",

	server: {
		port: 9801
	}
});
