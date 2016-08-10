goog.provide("ispring.Shapes.Rectangle");

goog.require("ispring.Shapes.Shape");

goog.scope(function()
{
    var shape = ispring.Shapes.Shape;
    /**
     * @constructor
     */
    ispring.Shapes.Rectangle = goog.defineClass(shape, {
        constructor:function(position, size, type, key)
        {
           goog.base(this, position, size, type, key);
        },

        /**
         * @public
         * @returns {goog.math.Size|*|number}
         */
        getSize:function()
        {
            return this._size;
        }
    })
});