goog.provide("ispring.shapes.Rectangle");

goog.require("ispring.shapes.Shape");

goog.scope(function()
{
    var shape = ispring.shapes.Shape;
    /**
     * @constructor
     */
    ispring.shapes.Rectangle = goog.defineClass(shape, {
        constructor:function(position, size)
        {
           goog.base(this, position, size, "rectangle");
        }
    })
});