goog.provide("ispring.shapes.ShapesModel");

goog.require("ispring.shapes.Rectangle");
goog.require("ispring.shapes.EventType");
// goog.require("ispring.MyTimer");
goog.require("goog.array");
goog.require("goog.math");

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

            /**@private {ispring.MyTimer}*/
            // this._moveTimer = new ispring.MyTimer(goog.bind(this._moveShape, this), 100);

            /**@private {number}*/
            this._uidMoveShape = 0;
        },

        /**
         * @public
         */
        addShape:function()
        {
            var shape = new ispring.shapes.Rectangle(new goog.math.Coordinate(200, 200), new goog.math.Size(150, 150));
            goog.array.insert(this._data, shape);
            var event = new CustomEvent(ispring.shapes.EventType.SHAPE_ADDED, {
                "detail" :{
                    "type" : shape.getType(),
                    "key" : shape.getKey()
                }});
            console.log("this._data.length = " + this._data.length);
            document.dispatchEvent(event);
        },

        /**
         * @public
         * @param e
         * @returns {*}
         */
        getShapeUId:function(e)
        {
            // var viewPos = document.getElementById("leftView").body.pageXOffset;
            // console.log('document.getElementById("leftView").body.pageXOffset = ' + document.getElementById("leftView").body.pageXOffset);
            // var pos = new goog.math.Coordinate(window.event.clientX, window.event.clientY);

            for(var i = 0; i != this._data.length; ++i)
            {
                var shape = this._data[i];
                var position = shape.getPosition();
                var size = shape.getSize();
                console.log("position.x = " + position.x);
                console.log("position.x + size.width = " + (position.x + size.width));
                console.log("e.pageX = " + e.pageX)
                console.log("position.y = " + position.y)
                console.log("position.y + size.height = " + position.y + size.height)
                console.log("e.pageY = " + e.pageY)
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
        getShape:function(key) {
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
         */
        stopMoveTimer:function()
        {
            // this._moveTimer.stop();
        }
    })
});