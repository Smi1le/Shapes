goog.provide("ispring.Shapes.RectangleView");

goog.require("ispring.Shapes.ShapeView");
goog.require("goog.math");
goog.require("goog.style");
goog.scope(function()
{
    var shapeView = ispring.Shapes.ShapeView;
    /**
     * @constructor
     */
    ispring.Shapes.RectangleView = goog.defineClass(shapeView, {
        constructor:function(pos, size)
        {
            goog.base(this, pos, size, "rectangle");
        },

        /**
         * @public
         * @override
         */
        draw:function()
        {
            goog.style.setPosition(this._body, this._position);
            goog.style.setSize(this._body, this._size);
        }
    })
});