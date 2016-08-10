goog.provide("ispring.Shapes.Shape");

goog.require("goog.math");
goog.require("goog.style");
goog.require("goog.dom");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.Shapes.Shape = goog.defineClass(null, {
        constructor:function(position, size, type, key)
        {
            /**@private {goog.math.Coordinate}*/
            this._position = position;

            /**@private {goog.math.Size}*/
            this._size = size;

            /**@private {string}*/
            this._type = type;

            /**@private {string}*/
            this._key = key;
        },

        /**
         * @public
         * @param position {goog.math.Coordinate}
         */
        setPosition:function(position)
        {
            if(this._position == position)
            {
                return;
            }
            this._position = position;
        },

        /**
         * @public
         * @returns {string}
         */
        getType:function()
        {
            return this._type;
        },

        /**
         * @public
         * @returns {goog.math.Coordinate}
         */
        getPosition:function()
        {
            return this._position;
        },

        /**
         * @public
         * @returns {string}
         */
        getKey:function()
        {
            return this._key;
        }
    })
});