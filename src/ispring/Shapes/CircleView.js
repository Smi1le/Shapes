goog.provide("ispring.shapes.CircleView");

goog.require("ispring.shapes.ShapeView");
goog.scope(function()
{
    var shapeView = ispring.shapes.ShapeView;
    /**
     * @constructor
     */
    ispring.shapes.CircleView = goog.defineClass(shapeView, {
        constructor:function(key)
        {
            goog.base(this, "circle", key);

            this._radius = this._size.width / 2;
        },

        /**
         * @public
         */
        getRadius:function()
        {
            return this._radius;
        }
    })
});