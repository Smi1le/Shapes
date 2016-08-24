goog.provide("ispring.shapes.RemoveShapeCommand");

goog.require("goog.array");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.RemoveShapeCommand = goog.defineClass(null, {
        constructor:function(model, shape)
        {
            /**@private {?ispring.shapes.ShapesModel}*/
            this._model = model;

            /**@private {?ispring.shapes.Rectangle|ispring.shapes.Circle}*/
            this._shape = shape;

            /**@private {CustomEvent}*/
            this._eventRedraw = new CustomEvent(ispring.shapes.EventType.REDRAW, {
                "detail" : {
                    "shape" : this._shape
                }
            });

            /**@private {CustomEvent}*/
            this._eventRemove = new CustomEvent(ispring.shapes.EventType.REMOVE, {
                "detail" : {
                    "shape" : this._shape
                }
            });
            
            /**@private {boolean}*/
            this._dispatcher = document;
        },

        /**
         * @public
         */
        execute:function()
        {
            this._model.removeShape(this._shape);
            this._dispatcher.dispatchEvent(this._eventRemove);
        },



        /**
         * @public
         */
        unExecute:function(){
            this._model.addShape(this._shape);
            this._dispatcher.dispatchEvent(this._eventRedraw);
        }
    })
});
