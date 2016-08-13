goog.provide("ispring.shapes.RightView");

goog.require("ispring.shapes.Rectangle");
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.RightView = goog.defineClass(null, {
        constructor:function(model)
        {
            this._model = model;
        },

        /**
         * @public
         */
        createShape:function()
        {
            var triangle = new ispring.shapes.Rectangle(new goog.math.Coordinate(document.documentElement.clientWidth / 2 + 200, 200),
                new goog.math.Size(200, 200), "type");
            this._model.addShape(triangle);
        },

        statics:{

        }
    })
});
