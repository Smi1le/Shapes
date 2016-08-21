goog.provide("ispring.shapes.History");

goog.require("goog.array");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.History = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._commands = [];

            /**@private {number}*/
            this._current = 0;

            
        },

        /**
         * @public
         * @param command
         */
        addCommand:function(command)
        {
            if (this._current < this._commands.length - 1)
            {
                this._commands.splice(this._current);
            }
            goog.array.insert(this._commands, command);
            command.execute();
            ++this._current;
        },

        /**
         * @public
         */
        undo:function()
        {
            if (this._current > 0)
            {
                this._commands[--this._current].unExecute();
            }
        },

        /**
         * @public
         */
        redo:function()
        {
            if (this._current < this._commands.length)
            {
                this._commands[this._current++].execute();
            }
        }
    })
});


