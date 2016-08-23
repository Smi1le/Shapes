goog.provide("Sample");

// goog.require("ispring.Shapes.Rectangle");
goog.require("ispring.shapes.ShapesModel");
goog.require("ispring.shapes.LeftView");
goog.require("ispring.shapes.RightView");
goog.require("ispring.shapes.Controller");
// goog.require("goog.math");

/**
 * @export
 */
Sample.start = function()
{
	var model = new ispring.shapes.ShapesModel();
	var leftView = new ispring.shapes.LeftView();
	var rightView = new ispring.shapes.RightView();
	var controller = new ispring.shapes.Controller(model, leftView, rightView);

};

