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
			this.catalogTree = new CatalogTreeView(this);
			this.listView = new SecretListView(this);
			this.detailView = new SecretDetailView(this);

			let views = [this.catalogTree, this.listView, this.detailView];
			VRender.View.allReady(views, () => {
				done();
			});
		});
	},

	renderView: function () {
		MainView.super(this);

		this.catalogTree.render(this.$el);
		this.listView.render(this.$el);
		this.detailView.render(this.$el);
	}
});
