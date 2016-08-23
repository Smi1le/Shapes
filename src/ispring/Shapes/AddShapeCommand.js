goog.provide("ispring.shapes.AddShapeCommand");

goog.require("ispring.shapes.Rectangle");
goog.require("ispring.shapes.Circle");
goog.require("goog.array");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.AddShapeCommand = goog.defineClass(null, {
        constructor:function(model, type)
        {
            /**@private {?ispring.shapes.ShapesModel}*/
            this._model = model;

            /**@private {ispring.shapes.Rectangle}*/
            this._newShape = null;
            if(type == "rectangle") {
                this._newShape = new ispring.shapes.Rectangle(new goog.math.Coordinate(200, 200), new goog.math.Size(150, 150));
            }
            else if(type == "circle") {
                this._newShape = new ispring.shapes.Circle(new goog.math.Coordinate(200, 200), 75);
            }
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
