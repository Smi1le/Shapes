goog.provide("ispring.shapes.Circle");

goog.require("ispring.shapes.Shape");
goog.require("goog.math");
goog.scope(function()
{
    var shape = ispring.shapes.Shape;
    /**
     * @constructor
     */
    ispring.shapes.Circle = goog.defineClass(shape, {
        constructor:function(position, radius)
        {
            goog.base(this, position, new goog.math.Size(radius * 2, radius * 2), "circle");
        }
    })
});