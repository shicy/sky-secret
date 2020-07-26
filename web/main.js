/**
 * Created by shicy 2020-02-13
 */

const Path = require("path");

global.__basedir = Path.resolve(__dirname, "./");
global.__vrender = "v-render";
global.__vrender_ui = "v-render-ui";


const Application = require("./framework/Application");

Application.startup({
	cwd: __dirname,
	// mode: "development",

	server: {
		port: 9001
	},
	
	dataServer: {
		server: "127.0.0.1:12360"
	}
});
