goog.provide("ispring.shapes.AddShapeCommand");

goog.require("ispring.shapes.Rectangle");
goog.require("goog.array");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.AddShapeCommand = goog.defineClass(null, {
        constructor:function(model)
        {
            /**@private {?ispring.shapes.ShapesModel}*/
            this._model = model;

            /**@private {ispring.shapes.Rectangle}*/
            this._newShape = new ispring.shapes.Rectangle(new goog.math.Coordinate(200, 200), new goog.math.Size(150, 150));
        },

        /**
         * @public
         */
        execute:function()
        {
            this._model.addShape(this._newShape);
        },



        /**
         * @public
         */
        unExecute:function(){
            this._model.removeShape(this._newShape);
            
            var event = new Event(ispring.shapes.EventType.REMOVE);
            document.dispatchEvent(event);
        }
    })
});
