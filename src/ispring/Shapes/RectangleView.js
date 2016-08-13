goog.provide("ispring.shapes.RectangleView");

goog.require("ispring.shapes.ShapeView");
// goog.require("goog.math");
// goog.require("goog.style");
goog.scope(function()
{
    var shapeView = ispring.shapes.ShapeView;
    /**
     * @constructor
     */
    ispring.shapes.RectangleView = goog.defineClass(shapeView, {
        constructor:function(key)
        {
            goog.base(this, "rectangle", key);
        },

        /**
         * @public
         * @override
         */
        draw:function()
        {
            // goog.style.setPosition(this._body, this._position);
            // goog.style.setSize(this._body, this._size);
        }
    })
});