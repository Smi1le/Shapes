goog.provide("ispring.shapes.Controller");

goog.require("ispring.shapes.History");
goog.require("ispring.shapes.AddShapeCommand");
goog.require("ispring.shapes.MoveShapeCommand");
goog.require("ispring.shapes.ResizeShapeCommand");
goog.require("ispring.shapes.RemoveShapeCommand");
goog.require("ispring.shapes.EventType");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.Controller = goog.defineClass(null, {
        constructor:function(model, leftView, rightView)
        {
            /**@private {ispring.shapes.ShapesModel}*/
            this._model = model;

            /**@private {ispring.shapes.LeftView}*/
            this._leftView = leftView;

            /**@private {ispring.shapes.RightView}*/
            this._rightView = rightView;

            /**@private {ispring.shapes.History}*/
            this._history = new ispring.shapes.History();

            // this._isFigureSelected = false;

            /**@private {!Element}*/
            var btn = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn.id = "button";
            btn.type = "submit";
            btn.value = "Add rect";
            goog.style.setPosition(btn, new goog.math.Coordinate(300, 0));
            document.body.appendChild(btn);
            btn.addEventListener("click", goog.bind(this._createRectangle, this));

            var btn2 = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn2.id = "button";
            btn2.type = "submit";
            btn2.value = "Add circle";
            goog.style.setPosition(btn2, new goog.math.Coordinate(420, 0));
            document.body.appendChild(btn2);
            btn2.addEventListener("click", goog.bind(this._createCircle, this));

            var btn3 = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn3.id = "button";
            btn3.type = "submit";
            btn3.value = "Delete";
            goog.style.setPosition(btn3, new goog.math.Coordinate(540, 0));
            document.body.appendChild(btn3);
            btn3.addEventListener("click", goog.bind(this.removeShape, this));

            /**@private {!Element}*/
            var undoButton = goog.dom.createElement(goog.dom.TagName.INPUT);
            undoButton.id = "button";
            undoButton.type = "submit";
            undoButton.value = "Undo";
            goog.style.setPosition(undoButton, new goog.math.Coordinate(60, 0));
            document.body.appendChild(undoButton);
            undoButton.addEventListener("click", goog.bind(this._undo, this));

            /**@private {!Element}*/
            var redoButton = goog.dom.createElement(goog.dom.TagName.INPUT);
            redoButton.id = "button";
            redoButton.type = "submit";
            redoButton.value = "Redo";
            goog.style.setPosition(redoButton, new goog.math.Coordinate(180, 0));
            document.body.appendChild(redoButton);
            redoButton.addEventListener("click", goog.bind(this._redo, this));

            document.addEventListener(ispring.shapes.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._leftView.addView(e.detail);
                this._rightView.addView(e.detail);
            }, this), false);

            document.addEventListener(ispring.shapes.EventType.RESIZE, goog.bind(function (e) {
                var view = e.detail.shapeView;
                var shape = this._model.getShapeByIndex(view.getKey());
                var command = new ispring.shapes.ResizeShapeCommand(shape, view.getPosition(), view.getSize());
                this._history.addCommand(command);
            }, this), false);

            document.addEventListener(ispring.shapes.EventType.REDRAW, goog.bind(function (e) {
                this._leftView.redraw(e.detail);
                this._rightView.redraw(e.detail);
            }, this), false);

            document.addEventListener(ispring.shapes.EventType.REMOVE, goog.bind(function (e) {
                this._leftView.removeShape(e.detail.shape);
                this._rightView.removeShape(e.detail.shape);
            }, this), false);

            var lv = this._leftView.getBody();


            lv.onmousedown = goog.bind(function(e){
                var key = this._model.getShapeUId(e);
                var shapeLeftView = this._leftView.getShapeByIndex(key);
                if (shapeLeftView != undefined) {

                    this._leftView.chooseShape(shapeLeftView);
                    this._rightView.chooseShape(shapeLeftView);
                    var shiftX = e.pageX - shapeLeftView.getPosition().x;
                    var shiftY = e.pageY - shapeLeftView.getPosition().y;

                    var oldPos = new goog.math.Coordinate(shapeLeftView.getPosition().x, shapeLeftView.getPosition().y);

                    document.onmousemove = goog.bind(function (e) {
                        var pos = new goog.math.Coordinate(e.pageX - shiftX, e.pageY - shiftY);
                        if (this._leftView.checkOutputAbroad(pos, shapeLeftView.getSize()))
                        {
                            shapeLeftView.setPosition(pos);
                            this._leftView.setPositionContour(pos);
                            this._leftView.setPositionResizePoints(shapeLeftView);
                            this._leftView.draw();
                        }
                    }, this);

                    lv.onmouseup = goog.bind(function (e) {
                        var newPos = shapeLeftView.getPosition();
                        if (oldPos.x != newPos.x || oldPos.y != newPos.y)
                        {
                            oldPos = newPos;
                            var shapeModel = this._model.getShapeByIndex(key);
                            var command = new ispring.shapes.MoveShapeCommand(shapeModel, newPos.x, newPos.y);
                            this._history.addCommand(command);
                        }
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }, this);
                }
                else {
                    this._leftView.deselectedShape();
                }
            }, this);
        },

        removeShape:function()
        {
            var shape = this._model.getShapeByIndex(this._leftView.getNumberVariableShape());
            var command = new ispring.shapes.RemoveShapeCommand(this._model, shape);
            this._history.addCommand(command);
            this._leftView.deselectedShape();
        },



        /**
         * @private
         */
        _createCircle:function()
        {
            this._createShape("circle");
        },

        _createRectangle:function()
        {
            this._createShape("rectangle");
        },

        /**
         * @private
         * @param type
         */
        _createShape:function(type)
        {
            var command = new ispring.shapes.AddShapeCommand(this._model, type);
            this._history.addCommand(command);
        },

        /**
         * @private
         */
        _undo:function()
        {
            this._leftView.deselectedShape();
            this._history.undo();
        },

        /**
         * @private
         */
        _redo:function()
        {
            this._leftView.deselectedShape();
            this._history.redo();
        }
    })
});
