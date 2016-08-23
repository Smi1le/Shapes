goog.provide("ispring.shapes.ShapesModel");

goog.require("ispring.shapes.EventType");
goog.require("goog.array");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.ShapesModel = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._data = [];
        },

        /**
         * @public
         * @param shape
         */
        addShape:function(shape)
        {
            goog.array.insert(this._data, shape);
            var event = new CustomEvent(ispring.shapes.EventType.SHAPE_ADDED, {
                "detail" :{
                    "type" : shape.getType(),
                    "key" : shape.getKey()
                }});
            document.dispatchEvent(event);
        },

        removeShape:function(shape)
        {
            for (var i = 0; i != this._data.length; ++i)
            {
                if (shape == this._data[i])
                {
                    this._data.splice(i--, 1);
                    break;
                }
            }
        },
        /**
         * @public
         * @param e
         * @returns {*}
         */
        getShapeUId:function(e)
        {
            for(var i = 0; i != this._data.length; ++i)
            {
                var shape = this._data[i];
                var position = shape.getPosition();
                var size = shape.getSize();
                if ((position.x <= e.pageX && e.pageX <= position.x + size.width) &&
                        position.y <= e.pageY && e.pageY <= position.y + size.height)
                {
                    return shape.getKey();
                }
            }
        },

        /**
         * @public
         * @param key
         * @returns {*}
         */
        getShapeByIndex:function(key) {
            for (var i = 0; i != this._data.length; ++i)
            {
                if (key == this._data[i].getKey())
                {
                    return this._data[i];
                }
            }
        },

        /**
         * @public
         * @param amount
         */
        removeShapesAtIndex:function(amount)
        {
            this._data.splice(amount);
        }
    })
});