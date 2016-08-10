goog.provide("ispring.Shapes.LeftView");

goog.require("ispring.Shapes.Rectangle");
goog.require("ispring.Shapes.RectangleView");
goog.require("goog.math");
goog.require("goog.dom");
goog.require("goog.array");
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.Shapes.LeftView = goog.defineClass(null, {
        constructor:function()
        {
            this._viewList = [];


            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.id = "leftView";
            this._body.style.position = "absolute";
            goog.style.setPosition(this._body, new goog.math.Coordinate(10, 100));
            goog.style.setSize(this._body, new goog.math.Size((document.documentElement.clientWidth / 2) - 20,
                document.documentElement.clientHeight - 110));
            document.body.appendChild(this._body);
        },

        /**
         * @public
         */
        addView:function(detail)
        {
            var rectView = new ispring.Shapes.RectangleView(detail.position, detail.size, detail.type, detail.key);
            goog.array.insert(this._viewList, rectView);
            console.log("this._viewList.length = " + this._viewList.length);
            this._body.style.background = "#00CC25";

        }
    })
});
