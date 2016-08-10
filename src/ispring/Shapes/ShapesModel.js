goog.provide("ispring.Shapes.ShapesModel");

goog.require("ispring.Shapes.Rectangle");
goog.require("goog.array");
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.Shapes.ShapesModel = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._data = [];
        },

        /**
         * @public
         */
        addShape:function()
        {
            var shape = new ispring.Shapes.Rectangle(new goog.math.Coordinate(200, 200), new goog.math.Size(150, 150), "rectangle", this._getNewKey());
            goog.array.insert(this._data, shape);
            var event = new CustomEvent("shape added", {
                "detail" :{
                    "type" : shape.getType(),
                    "position" : shape.getPosition(),
                    "size" : shape.getSize(),
                    "key" : shape.getKey()
                }});
            console.log("this._data.length = " + this._data.length);
            document.dispatchEvent(event);
        },

        _getNewKey:function()
        {
            var newKey = '';
            for(var i = 0; i != 12; ++i)
            {
                newKey += this._getRandomNumber(0, 9);
            }
        },

        _getRandomNumber:function(min, max)
        {
            var rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        },
    })
});