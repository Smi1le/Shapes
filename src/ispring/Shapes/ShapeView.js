goog.provide("ispring.Shapes.ShapeView");

// goog.require("ispring.Shapes.Rectangle");
// goog.require("goog.math");
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.Shapes.ShapeView = goog.defineClass(null, {
        constructor:function(pos, size, type)
        {
            this._position = pos;
            this._size = size;
            this._type = type;
            // document.body.appendChild(this._body);
        },

        /**
         * @public
         * @virtual
         */
        draw:function() {}
    })
});
