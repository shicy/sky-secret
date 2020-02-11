/**
 * PC端主页面
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);
const CatalogTreeView = require("../../../views/catalog/CatalogTreeView");
const SecretListView = require("../../../views/secret/list/SecretListView");
const SecretDetailView = require("../../../views/secret/detail/SecretDetailView");


const $ = VRender.$;

const MainView = VRender.UIView.extend(module, {
	className: "view-main",

	doInit: function (done) {
		MainView.super(this, () => {
			this.catalogTree = new CatalogTreeView(this, {ref: "catalogTreeView"});
			this.listView = new SecretListView(this, {ref: "secretListView"});
			this.detailView = new SecretDetailView(this, {ref: "secretDetailView"});

			let views = [this.catalogTree, this.listView, this.detailView];
			VRender.View.allReady(views, () => {
				done();
			});
		});
	},

	renderView: function () {
		MainView.super(this);

		this.$el.attr("command-cipher", this.options.command || "");

		this.catalogTree.render(this.$el);
		this.listView.render(this.$el);
		this.detailView.render(this.$el);
	}
});
