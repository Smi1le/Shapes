goog.provide("ispring.shapes.ResizeShapeCommand");


goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.ResizeShapeCommand = goog.defineClass(null, {
        constructor:function(shape, pos, size)
        {
            /**@private {?ispring.shapes.Rectangle}*/
            this._shape = shape;

            /**@private {number}*/
            this._oldWidth = shape.getSize().width;

            /**@private {number}*/
            this._oldHeight = shape.getSize().height;

            /**@private {number}*/
            this._oldX = shape.getPosition().x;

            /**@private {number}*/
            this._oldY = shape.getPosition().y;

            /**@private {number}*/
            this._newWidth = size.width;

            /**@private {number}*/
            this._newHeight = size.height;

            /**@private {number}*/
            this._newX = pos.x;

            /**@private {number}*/
            this._newY = pos.y;

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
            this._shape.setSize(new goog.math.Size(this._newWidth, this._newHeight));
            document.dispatchEvent(this._changeEventRedraw);
        },



        /**
         * @public
         */
        unExecute:function(){
            this._shape.setPosition(new goog.math.Coordinate(this._oldX, this._oldY));
            this._shape.setSize(new goog.math.Size(this._oldWidth, this._oldHeight));
            document.dispatchEvent(this._changeEventRedraw);
        }
    })
});
