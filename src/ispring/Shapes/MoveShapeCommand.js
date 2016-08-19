goog.provide("ispring.shapes.MoveShapeCommand");


// goog.require("goog.json");
goog.require("ispring.shapes.Rectangle");
goog.require("goog.array");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.MoveShapeCommand = goog.defineClass(null, {
        constructor:function(shape, x, y)
        {
            /**@private {?ispring.shapes.Rectangle}*/
            this._shape = shape;

            /**@private {number}*/
            this._oldX = shape.getPosition().x;

            /**@private {number}*/
            this._oldY = shape.getPosition().y;

            /**@private {number}*/
            this._newX = x;

            /**@private {number}*/
            this._newY = y;

            /**@private {CustomEvent}*/
            this._changeEventRedraw = new CustomEvent(ispring.shapes.EventType.REDRAW, {
                "detail":{
                    "shape" : this._shape
                }
            });

        },

        /**
         * @public
         */
        execute:function()
        {
            this._shape.setPosition(new goog.math.Coordinate(this._newX, this._newY));
            document.dispatchEvent(this._changeEventRedraw);
        },
        
        /**
         * @public
         */
        unExecute:function()
        {
            this._shape.setPosition(new goog.math.Coordinate(this._oldX, this._oldY));
            document.dispatchEvent(this._changeEventRedraw);
        }
    })
});
