goog.provide("Sample");

// goog.require("ispring.Shapes.Rectangle");
goog.require("ispring.Shapes.ShapesModel");
goog.require("ispring.Shapes.LeftView");
goog.require("ispring.Shapes.RightView");
goog.require("ispring.Shapes.Controller");
// goog.require("goog.math");

/**
 * @export
 */
Sample.start = function()
{
	var model = new ispring.Shapes.ShapesModel();
	var leftView = new ispring.Shapes.LeftView();
	var controller = new ispring.Shapes.Controller(model, leftView);

};

