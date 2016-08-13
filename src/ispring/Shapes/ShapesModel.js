goog.provide("ispring.shapes.ShapesModel");

goog.require("ispring.shapes.Rectangle");
goog.require("ispring.shapes.EventType");
goog.require("ispring.MyTimer");
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
            this._moveTimer = new ispring.MyTimer(goog.bind(this._moveShape, this), 100);

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
         */
        checkBox:function()
        {
            // var viewPos = document.getElementById("leftView").body.pageXOffset;
            // console.log('document.getElementById("leftView").body.pageXOffset = ' + document.getElementById("leftView").body.pageXOffset);
            var pos = new goog.math.Coordinate(window.event.clientX, window.event.clientY);
            for(var i = 0; i != this._data.length; ++i)
            {
                var shape = this._data[i];
                var position = shape.getPosition();
                var size = shape.getSize();
                if ((position.x <= pos.x && pos.x <= position.x + size.width) &&
                        position.y <= pos.y && pos.y <= position.y + size.height)
                {
                    this._uidMoveShape = i;
                    this._moveTimer.start();
                    break;
                }
            }
        },

        /**
         * @private
         */
        _moveShape:function()
        {
            var pos = new goog.math.Coordinate(window.event.clientX, window.event.clientY);
            // var newPos = new goog.math.Coordinate(window.event.clientX, window.event.clientY);
            this._data[this._uidMoveShape].setPosition(pos);
            
            
        },

        /**
         * @public
         */
        stopMoveTimer:function()
        {
            this._moveTimer.stop();
        }
    })
});