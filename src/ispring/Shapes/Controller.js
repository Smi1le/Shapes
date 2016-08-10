goog.provide("ispring.Shapes.Controller");

goog.require("ispring.Shapes.Rectangle");
goog.require("ispring.Shapes.RectangleView");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.Shapes.Controller = goog.defineClass(null, {
        constructor:function(model, leftView)
        {
            /**@private {ispring.Shapes.ShapesModel}*/
            this._model = model;

            /**@private {ispring.Shapes.LeftView}*/
            this._leftView = leftView;
            var btn = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn.id = "btn";
            btn.type = "submit";
            btn.value = "Нажми меня";
            goog.style.setPosition(btn, new goog.math.Coordinate(300, 0));
            goog.style.setSize(btn, new goog.math.Size(100, 50));
            document.body.appendChild(btn);
            btn.addEventListener("click", goog.bind(this._createShape, this));

            // var event = new Event('click');
            document.addEventListener('shape added', goog.bind(function (e) {
                this._leftView.addView(e.detail);
            }, this), false);
        },

        /** 
         * @private
         */
        _createShape:function()
        {
            this._model.addShape();
            // this._model.addShape(triangle);
        },
    })
});
