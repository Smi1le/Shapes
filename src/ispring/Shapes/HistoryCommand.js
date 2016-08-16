goog.provide("ispring.shapes.HistoryCommand");


// goog.require("goog.json");
goog.require("goog.array");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.HistoryCommand = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {?ispring.shapes.ShapesModel}*/
            this._model = null;

            /**@private {Array}*/
            this._modelData = [];
        },

        /**
         * @public
         * @param model
         */
        execute:function(model)
        {
            this._model = model;

            var data = model.getData();

            for(var i = 0; i != data.length; ++i)
            {
                var pos = data[i].getPosition();
                var size = data[i].getSize();
                goog.array.insert(this._modelData, {
                    "type" : data[i].getType().slice(),
                    "key" : data[i].getKey(),
                    "positionX" : pos.x,
                    "positionY" : pos.y,
                    "width" : size.width,
                    "height" : size.height
                });
            }
        },

        /**
         * @public
         */
        unExecute:function()
        {
            // this._model.setData(this._modelData);
            var data = this._model.getData();
            if (this._modelData.length < data.length)
            {
                data.splice(this._modelData.length);
                var event = new CustomEvent(ispring.shapes.EventType.REMOVE, {
                    "detail" : {
                        "amount" : this._modelData.length
                    }
                });
                document.dispatchEvent(event);
            }
            for(var i = 0; i != this._modelData.length; ++i)
            {
                if ((i  > data.length - 1) && (this._modelData.length  > data.length))
                {
                    this._model.addShape();
                }
                else
                {
                    data[i].setSize(new goog.math.Size(this._modelData[i].width, this._modelData[i].height));
                    data[i].setPosition(new goog.math.Coordinate(this._modelData[i].positionX, this._modelData[i].positionY));
                    data[i].setKey(this._modelData[i].key);
                }
            }

            var redraw = new CustomEvent(ispring.shapes.EventType.REDRAW, {
                "detail":{
                    "data" : this._modelData
                }
            });
            document.dispatchEvent(redraw);

        },

        /**
         */
        getData:function()
        {
            console.log("this._modelData[].length = " + this._modelData.length);
            console.log("pos = " + this._modelData[0].positionX + " " + this._modelData[0].positionY);
        }
    })
});
